import { Text, View } from "react-native"

const Details=({full, Customer, data})=>{
    // console.log("+++++",data)
    return(
        <>
        {full? <View style={[{flexDirection:'column',borderWidth:1, borderRadius:6,borderColor:'#00000030', justifyContent:'center', alignItems:'center',marginBottom:20}]}>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>{Customer} : {data?.schooladdress}</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>SapCode : {data?.sapcode}</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>Category : {data?.category}</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>Previous Recent Sponsorship :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>Previous Recent Workshop :</Text>
            <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>Recent Sales Executive Visits :	</Text>
            <Text style={{width:'90%', paddingVertical:6}}>Recent Manager Visits :</Text>
        </View>:
        <View style={[{flexDirection:'column',borderWidth:1, borderRadius:6,borderColor:'#00000030', justifyContent:'center', alignItems:'center',marginBottom:20}]}>
        <Text style={{width:'90%', borderBottomWidth:1, borderColor:'#00000020',paddingVertical:6,maxWidth:"100%"}}>Customer : {data?.Customer || data?.schooladdress}</Text>
        <Text style={{width:'90%', paddingVertical:6}}>SAP Code : {data?.sapCode || data?.sapcode}</Text>
        </View>}
        </>
    )
}
export default Details