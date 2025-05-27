import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { States } from "../../pages/Stateinfo";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useEffect, useState } from "react";
import globalStyles from "../../globalCSS";
import axios from "axios";
import Loader from "../Loader";
import { GetStateData, GetTradeNameList } from "../../API/APIConfig";

const Trade = ({ formData, setFormData, stateId, setStateId, fetchCustomerDetails,tradeId,setTradeId }) => {
    const [state, setState] = useState("")
    const [tradelist,setTradeList]=useState([])
    const [loading,setLoading]=useState(false)
    const StateData = state && state?.map((item) => ({ id: item.StateID, name: item.StateName }))
    const tradeData = tradelist && tradelist?.map((item) => ({ id: item.Value_v, name: item.Text_t }))
        const fetchState = async () => {
            setLoading(true)
            try {
                await GetStateData().then((response)=>{
                    setState(response)
                }).catch((error)=>{
                    console.log("Error fetching state data:", error);
                })
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }

        useEffect(()=>{
            fetchState()
        },[])

        const fetchTradeList = async (stateId) => {
            setLoading(true);
            try {
                await GetTradeNameList("GetBillingShippingTrade","Trade",stateId, "", "", "","").then((response) => {
                    // console.log(`Trade List:`, response.Data);
                    setTradeList(response.Data);
                }).catch((error) => {
                    console.log("Error fetching trade list:", error);
                })
            } catch (error) {
                console.error("Error fetching trade list:", error);
            } finally {
                setLoading(false);
            }
        }

        useEffect(()=>{
            if (stateId) {
               fetchTradeList(stateId)
            }
        },[formData.state])

    return (
        <>
        {loading && <Loader />}
            <Text style={{ paddingBottom: 5, color: '#00000095' }}>State*</Text>
            <View style={[globalStyles.dropdownContainer, { minWidth: '100%', marginBottom: 10 }]}>
                <SearchableDropDown
                    items={StateData} // Dropdown options
                    onItemSelect={(item) => {
                        setFormData((prev) => ({
                            ...prev,
                            state: item.name,
                        }))
                        setStateId(item.id)
                    }
                    } // Update input field
                    textInputProps={{
                        value: formData.state, // Bind value to input
                        placeholder: "Search and select",
                        onChangeText: (text) => setFormData((prev) => ({
                            ...prev,
                            state: text,
                        })), // Update value on typing
                    }}
                    placeholder="Search and select"
                    itemStyle={globalStyles.dropdownItem} // Style for dropdown items
                    itemTextStyle={{ color: "#000" }}
                    textInputStyle={globalStyles.searchInput}
                    itemsContainerStyle={globalStyles.itemContainer}
                    listProps={{
                        nestedScrollEnabled: true,
                    }}
                    resetValue={false} // Prevent resetting to placeholder
                />
            </View>
            <Text style={{ paddingBottom: 5, color: '#00000095' }}>Trade Name*</Text>
            <View style={[globalStyles.dropdownContainer, { minWidth: '100%', marginBottom: 10 }]}>
                <SearchableDropDown
                    items={tradeData} // Dropdown options
                    onItemSelect={(item) => {
                        setFormData((prev) => ({
                            ...prev,
                            trade: item.name,
                        }))
                        setTradeId(item.id)
                    }
                    } // Update input field
                    textInputProps={{
                        value: formData.trade, // Bind value to input
                        placeholder: "Select Trade Name",
                        onChangeText: (text) => setFormData((prev) => ({
                            ...prev,
                            trade: text,
                        })), // Update value on typing
                    }}
                    placeholder="Select Trade Name"
                    itemStyle={globalStyles.dropdownItem} // Style for dropdown items
                    itemTextStyle={{ color: "#000" }}
                    textInputStyle={globalStyles.searchInput}
                    itemsContainerStyle={globalStyles.itemContainer}
                    listProps={{
                        nestedScrollEnabled: true,
                    }}
                    resetValue={false} // Prevent resetting to placeholder
                />
            </View>
            <View>
                <Text style={{ paddingBottom: 5, color: '#00000095' }}>Sap Code*</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                    <TextInput
                        keyboardType="numeric"
                        style={[globalStyles.dropdownContainer, { height: 40, width: '65%', paddingLeft: 5, marginBottom: 10 }]}
                        value={formData.sapCode}
                        placeholder="Enter SAP Code"
                        onChangeText={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                "sapCode": value,
                            }));
                        }} />
                    <TouchableOpacity onPress={()=>fetchCustomerDetails()} style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default Trade