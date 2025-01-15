import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { States } from "../../pages/Stateinfo";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useState } from "react";
import globalStyles from "../../globalCSS";

const Trade = ({ formData, setFormData, stateId, setStateId, fetchCustomerDetails }) => {
    const [state, setState] = useState("")
    const StateData = States.map((item) => ({ id: item.Value_v, name: item.Text_t }))
    return (
        <>
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