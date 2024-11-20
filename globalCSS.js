import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    primaryText:{
        color:'#0b57d0'
    },
    heading:{
        fontSize:18,
        paddingBottom:20,
        textAlign:'center',
        fontWeight:'500'
    },
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:10,
        paddingHorizontal: 15,
    },
    step:{
        backgroundColor:'white',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        padding:10,
        paddingBottom:20,
        margin:10,
        borderRadius:10,
        boxShadow:'0px 2px 5px #00000020'
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
        backgroundColor: "blue",
        
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
});
export default globalStyles;