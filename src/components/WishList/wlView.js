import React, { Component } from 'react';
import {
    View, Text, TouchableOpacity, ListView,
    Dimensions, StyleSheet, Image
} from 'react-native';
import global from '../../global';
import sendOrder from '../../api/sendOrder';
import getToken from '../../api/getToken';
import checkLogin from '../../api/checkLogin';
import saveCart from '../../api/saveCart';
import getCart from '../../api/getCart';

function toTitleCase(str) {
    return str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

const url = 'http://192.168.56.1:8080/DACN/images/img_tour/';

class wlView extends Component {
    constructor(props) {
          super(props);
          this.state = {
              cartArray: [],
          };
          global.addTourToCart = this.addTourToCart.bind(this);
    }
    componentDidMount() {
        getToken()
        .then(token => checkLogin(token))
        .then(res => {
          getCart()
          .then(cartArray => this.setState({ cartArray }));
        })
        .catch(err => console.log('LOI CHECK LOGIN', err));
    }
    addTourToCart(tour) {
        const isExist = this.state.cartArray.some(e => e.tour.id === tour.id);
        if (isExist) return false;
        this.setState(
            { cartArray: this.state.cartArray({ tour }) },
            () => saveCart(this.state.cartArray)
        );
    }
    removeTour(tourId) {
        const newCart = this.state.cartArray.filter(e => e.tour.id !== tourId);
        this.setState({ cartArray: newCart },
            () => saveCart(this.state.cartArray)
        );
    }
    gotoDetail(tour) {
        const { navigate } = this.props.navigation;
        navigate('_tourDetail', {tour} );
    }

    async onSendOrder() {
        try {
            const token = await getToken();
            const arrayDetail = this.state.cartArray.map(e => ({
                id: e.tour.id,
            }));
            const kq = await sendOrder(token, arrayDetail);
            if (kq === 'THEM_THANH_CONG') {
                console.log('THEM THANH CONG');
            } else {
                console.log('THEM THAT BAI', kq);
            }
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        const { main, checkoutButton, checkoutTitle, wrapper,
            productStyle, mainRight, productController,
            txtName, txtPrice, productImage, numberOfProduct,
            txtShowDetail, showDetailContainer } = styles;
        const { cartArray } = this.state;
        const loginJSX = (
          <View style={wrapper}>
              <ListView
                  contentContainerStyle={main}
                  enableEmptySections
                  dataSource={new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(cartArray)}
                  renderRow={cartItem => (
                      <View style={productStyle}>
                          <Image source={{ uri: `${url}${cartItem.tour.images[0]}` }} style={productImage} />
                          <View style={[mainRight]}>
                              <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                                  <Text style={txtName}>{toTitleCase(cartItem.tour.name)}</Text>
                                  <TouchableOpacity onPress={() => this.removeProduct(cartItem.tour.id)} style={{marginRight:10}}>
                                      <Text style={{ fontFamily: 'Avenir', color: '#969696' }}>X</Text>
                                  </TouchableOpacity>
                              </View>
                              <View>
                                  <Text style={txtPrice}>{cartItem.tour.cost} VNĐ</Text>
                              </View>
                              <View style={productController}>
                                  <TouchableOpacity style={showDetailContainer} onPress={() => this.gotoDetail(cartItem.tour)}>
                                      <Text style={txtShowDetail}>Xem chi tiết</Text>
                                  </TouchableOpacity>
                              </View>
                          </View>
                      </View>
                  )}
              />
              <TouchableOpacity style={checkoutButton} onPress={this.onSendOrder.bind(this)}>
                  <Text style={checkoutTitle}> Tổng tiền : {tour.cost} VNĐ ( Thanh toán ngay )</Text>
              </TouchableOpacity>
          </View>
        );
        return (
            <View style={{flex:1}}>{loginJSX}</View>
        );
    }
}

const { width } = Dimensions.get('window');
const imageWidth = width / 4;
const imageHeight = (imageWidth * 452) / 361;

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#DFDFDF'
    },
    checkoutButton: {
        height: 50,
        margin: 10,
        marginTop: 0,
        backgroundColor: 'rgba(231, 76, 60,1.0)',
        borderRadius: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    main: {
        width, backgroundColor: '#DFDFDF'
    },
    checkoutTitle: {
        color: '#FFF',
        fontSize: 15,
        fontWeight: '200',
        fontFamily: 'Avenir'
    },
    productStyle: {
        flexDirection: 'row',
        margin: 5,
        padding: 10,
        backgroundColor: 'whitesmoke',
        borderRadius: 2,
        shadowColor: '#3B5458',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2
    },
    productImage: {
        width: imageWidth,
        height: imageHeight,
        flex: 1,
        resizeMode: 'center'
    },
    mainRight: {
        flex: 3,
        justifyContent: 'space-between'
    },
    productController: {
        flexDirection: 'row'
    },
    numberOfProduct: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    txtName: {
        paddingLeft: 20,
        color: '#A7A7A7',
        fontSize: 18,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtPrice: {
        paddingLeft: 20,
        color: 'rgba(231, 76, 60,1.0)',
        fontSize: 16,
        fontWeight: '400',
        fontFamily: 'Avenir'
    },
    txtShowDetail: {
        fontFamily: 'Avenir',
        color: '#B10D65',
        fontSize: 12,
        textAlign: 'right',
    },
    showDetailContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
});

export default wlView;
