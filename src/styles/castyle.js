import { StyleSheet, Dimensions } from 'react-native';

var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#B721FF',
    background2: '#21D4FD'
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background1
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1,
        paddingTop: 250
    },
    scrollviewContentContainer: {
        paddingBottom: 0
    },
    exampleContainer: {
        flex :1,
        marginBottom: 10
    },
    title: {
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: 25
    },
    sliderContentContainer: {
    },
    paginationContainer: {
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },
    header_Left:{
      width:W,
      alignItems:'center',
      marginTop : 25,
      flexDirection:'row',
      marginLeft : 0
    },
    imgMenu: {width: W * 0.08, height: W * 0.08},
    header:{
      height:H*0.1,
    },
    center:{
      flex:1,
      height:H*0.9,
    },
    card:{
      flex:1,
      overflow: 'hidden',
      backgroundColor: 'white',
      margin: 10,
      marginTop: 5,
      marginBottom: 5,
      borderWidth: 1,
      borderColor: 'lightgrey',
      borderRadius: 8,

    },
    tourImage: {
        flex :1,
        width: W,
        height: H/3
    },
    actionButtonIcon: {
      fontSize: 20,
      height: 22,
      color: 'white',
    },
});
