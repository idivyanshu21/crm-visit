import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { States } from "../../pages/Stateinfo";
import SearchableDropDown from "react-native-searchable-dropdown";
import { useState } from "react";
import globalStyles from "../../globalCSS";

const Trade = () => {
    const [state, setState] = useState("")
    const StateData = States.map((item) => ({ id: item.Value_v, name: item.Text_t }))
    return (
        <>
            <Text style={{ paddingBottom: 5, color: '#00000095' }}>State*</Text>
            <View style={[globalStyles.dropdownContainer, { minWidth: '95%', marginBottom: 10 }]}>
                <SearchableDropDown
                    items={StateData} // Dropdown options
                    onItemSelect={(item) => setState(item.name)} // Update input field
                    textInputProps={{
                        value: state, // Bind value to input
                        placeholder: "Search and select",
                        onChangeText: (text) => setState(text), // Update value on typing
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
                    <TextInput style={[globalStyles.dropdownContainer, { height: 40, width: '65%', paddingLeft: 5, marginBottom: 10 }]} value="" placeholder="Enter SAP Code" />
                    <TouchableOpacity style={globalStyles.button}>
                        <Text style={globalStyles.buttonText}>Search</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}
export default Trade