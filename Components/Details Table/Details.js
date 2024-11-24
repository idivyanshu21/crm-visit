import { Text, View } from "react-native"

const Details=({full, Customer})=>{
    return(
        <>
        {full? <View style={[{flexDirection:'column',borderWidth:1, borderRadius:6,borderColor:'#00000030', justifyContent:'center', alignItems:'center',marginBottom:20}]}>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>{Customer} :	</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>SapCode :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>Category :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>Previous Recent Sponsorship :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>Previous Recent Workshop :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>Recent Sales Executive Visits :	</Text>
            <Text style={{width:'90%', paddingVertical:6}}>Recent Manager Visits :</Text>
        </View>:
        <View style={[{flexDirection:'column',borderWidth:1, borderRadius:6,borderColor:'#00000030', justifyContent:'center', alignItems:'center',marginBottom:20}]}>
        <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6}}>Customer :</Text>
        <Text style={{width:'90%', paddingVertical:6}}>SAP Code :</Text>
        </View>}
        </>
    )
}
export default Details