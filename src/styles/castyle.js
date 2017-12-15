import { StyleSheet, Dimensions } from 'react-native';

var W = Dimensions.get('window').width;
var H = Dimensions.get('window').height;
const RADIUS = 10;
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
        paddingTop: 200
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
    imgMenu: {
      width: W * 0.08,
      height: W * 0.08
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
      position: 'absolute'
    },
    wrapper: {flex:1,backgroundColor:'white'},
    header:{marginLeft:15,marginTop:50, flexDirection:'row'},
    containerr:{height: H*0.9},
    borderStyle:{height: H*0.05},
    icon:{width: W*0.05, height: W*0.05},
    txtMenu:{width:W*0.9,justifyContent:'center'},
    btnFB: {width: W*0.4, height:H*0.05, backgroundColor:'black', marginLeft: W*0.07},
    HLeft: {width: W * 0.1, height: H*0.1},
    cas:{
      height: H*0.4,
      width: W*0.9,
      borderRadius: RADIUS,
      marginBottom: H*0.05,
      justifyContent: 'flex-end'
    },
    cac:{
      height: (H*0.4) *0.8,
      backgroundColor:'rgba(255,255,255,0.9)',
      borderTopLeftRadius: RADIUS,
      borderTopRightRadius: RADIUS,
      alignItems:'center',
      paddingVertical:H*0.02
    },
    caa:{
      height:(H*0.4)*0.2,
      backgroundColor:'rgba(0,0,0,0.5)',
      borderBottomLeftRadius: RADIUS,
      borderBottomRightRadius: RADIUS,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-around'
    },
    actionButton:{
      paddingHorizontal:30,
      alignItems:'center',
      justifyContent:'center'
    },
    actionIcon:{
      height:40,
      width: 40
    },
    separator:{
      width: StyleSheet.hairlineWidth *2
    },
    iwrt:{
      width:'90%',
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:20
    },
    ipc:{
      flex:1,
      borderBottomWidth:1,
      borderBottomColor:'#BDBDBD',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },
    TextInput:{
      height:60,
      flex:1,
      fontSize:25,
      color:'black'
    },
    dvb:{
      height:25,
      width:25,
    },
    cib:{
      marginLeft:10
    },
    bc:{
      alignSelf:'center',
      alignItems:'center',
      justifyContent:'center',
      height:100,
      width:'60%',
    },
    btn:{
      height:50,
      alignItems:'center',
      justifyContent:'center',
      borderRadius:10,
      width:'100%'
    },
    cc:{
      flex: 1,
      backgroundColor: 'red',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    bi:{
      position: 'absolute',
      top: 0,
      left: 0,
      height: H,
      width: W
    },
    sc:{
      justifyContent: 'center',
      flex: 1,
      alignItems: 'center',
      width: W,
      marginTop: 30,
    },
    fc:{
      backgroundColor: 'rgba(255,255,255,0.5)',
      height: 10,
      width: '85%',
      zIndex: 9000,
      borderTopLeftRadius: 5 * 2,
      borderTopRightRadius: 5 * 2
    },
    scac:{
      backgroundColor: 'white',
      borderRadius: 10,
      width: W * 0.9,
      height: H * 0.5,
      marginBottom: H * 0.1,
      marginHorizontal: 20,
      alignItems: 'center'
    },
    cat:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
    cct:{
      width:'90%',
      height:40,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
      marginBottom:20,
    },
    sipc:{
      flex:1,
      borderBottomWidth:1,
      borderBottomColor:'#BDBDBD',
      alignItems:'center',
      justifyContent:'center',
      flexDirection:'row'
    },
    input:{
      flex: 1,
      height: 40,
      fontSize: 25,
      fontWeight: '400',
      color: 'black',
      paddingBottom: -5,
    },
});
