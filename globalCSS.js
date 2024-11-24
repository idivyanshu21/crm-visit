import { StyleSheet } from "react-native";
export const PrimaryColor='#0A61c9'
export const PrimaryColorLight='#0A61c930'
const globalStyles = StyleSheet.create({
    primaryText:{
        color:PrimaryColor
    },
    heading:{
        width:'100%',
        fontSize:16,
        paddingBottom:8,
        // paddingLeft:'5',
        textAlign:'left',
        fontWeight:'500'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:10,
        paddingHorizontal: 8,
        backgroundColor:'#749dc825'
    },
    step:{
        backgroundColor:'#ffffff',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        padding:10,
        paddingBottom:20,
        margin:5,
        marginBottom:10,
        borderRadius:10,
        boxShadow:'0px 2px 3px #00000020'
    },
    radioContainer: {
        flexDirection: "row",
        width:'100%',
        gap:20
        
    },
    radioButton: {
        flexDirection: "row",
        alignItems: "center",
    },
    radioCircle: {
        width: 16,
        height: 16,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#00000060",
        marginRight: 8,
    },
    radioBorder: {
        padding:2,
        width: 16,
        height: 16,
        borderRadius:10,
        borderRadius: 10,
        borderColor: "#00000060",
        borderWidth: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
        marginRight: 8,
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: PrimaryColor,
        
    },
    radioText: {
        fontSize: 16,
    },
    pickerContainer: {
        height:40,
        width: "95%",
        borderWidth: 1,
        borderColor: "#00000040",
        backgroundColor:'#00000008',
        borderRadius: 5,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        overflow: "hidden",
    },
    picker: {
        width: "100%",
        marginTop:-8,
    },
    button:{
        height:40, 
        backgroundColor:PrimaryColor,
        width:100, 
        paddingLeft:5, 
        marginBottom:10, 
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:5
    },
    buttonText:{
        textAlign:'center',
        color:'white',
    },
    dropdownContainer: {
        width: '100%',
        maxHeight: 200,
        borderWidth: 1,
        borderColor: "#00000040",
        borderRadius: 5,
        padding: 0,
        backgroundColor: "white",
        overflow: 'hidden'
        // paddingBottom:50
    },
    searchInput: {
        height: 40,
        borderColor: "black",
        backgroundColor: '#f1f1f1',
        // borderRadius:7,
        // margin:2
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: "#cccccc40",
    },
    itemContainer: {
        maxHeight: '86%',
    },
    checkbox:{
        width:20,
        height:20
    }
});
export default globalStyles;