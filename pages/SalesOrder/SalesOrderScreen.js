import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput } from "react-native";
import { Picker } from '@react-native-picker/picker'
import globalStyles from "../../globalCSS";
import TabComponent from "../../Components/Tabs/Tabs";
import schoolsData from "../schoolsData";
import { ScrollView } from "react-native-gesture-handler";
import Trade from "../../Components/Trade/trade";
import AddressForm from "../../Components/Address Form/AddressForm";
import Details from "../../Components/Details Table/Details";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Enrollment from "../../Components/Details Table/Enrollment";
import Titles from "../../Components/Titles/Titles";

const SalesOrderScreen = () => {
    const [selectedOption, setSelectedOption] = useState("School");
    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [orderType, setOrderType] = useState("New Order");
    const [shipsTo, setShipsTo] = useState("")
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const dropdownOptions = {
        School: schoolsData.Data.map((item) => ({ id: item.Value_v, name: item.Text_t })),
        Trade: ["Trade Option 1", "Trade Option 2", "Trade Option 3"].map((item, index) => ({
            id: index.toString(),
            name: item,
        })),
        "Govt. Dept.": ["Govt. Dept. Option 1", "Govt. Dept. Option 2", "Govt. Dept. Option 3"].map(
            (item, index) => ({
                id: index.toString(),
                name: item,
            })
        ),
    };
    const ShippingOptions = ['School', 'Trade', 'Other Trade', 'Other Address']

    const tabOptions = [
        {
            title: "Billing/Shipping",
            content:
                <>
                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Billing Details</Text>
                    <View style={[globalStyles.pickerContainer, { marginBottom: 20, alignItems: 'center', minWidth: '95%', paddingLeft: 10 }]}>
                        <Text>{selectedOption === 'Govt. Dept.' ? 'Govt. Dept.' : 'Trade'}</Text>
                    </View>
                    {selectedOption === 'Govt. Dept.'?<Details/>:<Trade />}
                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Shipping Details</Text>
                    <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
                        <Picker
                            selectedValue={shipsTo}
                            onValueChange={(itemValue) => setShipsTo(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Ship To" color="#00000070" value="" />
                            {ShippingOptions.map((option, index) => (
                                // {console.log(option)}
                                <Picker.Item key={index} label={String(option)} value={option} />
                            ))}
                        </Picker>
                    </View>
                    {selectedOption === 'School' && shipsTo !=="" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> : <Details />)}

                    {selectedOption === 'Trade' && shipsTo !=="" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> : shipsTo === 'School' ?
                        <View>
                        <Text style={{ paddingBottom:2, color: '#00000095' }}>Select School</Text>

                        <Dropdown
                            dropdownOptions={dropdownOptions} // Pass all options
                            selectedOption={'School'} // Determine which dropdown's options to use
                            selectedValue={selectedDropdownValue} // Bind selected value
                            onValueChange={(value) => {
                                setSelectedDropdownValue(value); // Update selected value
                            }}
                        /></View>: <Details />)}
                    {selectedOption === 'Govt. Dept.' && shipsTo !=="" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> :shipsTo === 'School' ?
                            <View>
                            <Text style={{ paddingBottom:2, color: '#00000095' }}>Select School</Text>
    
                            <Dropdown
                                dropdownOptions={dropdownOptions} // Pass all options
                                selectedOption={'School'} // Determine which dropdown's options to use
                                selectedValue={selectedDropdownValue} // Bind selected value
                                onValueChange={(value) => {
                                    setSelectedDropdownValue(value); // Update selected value
                                }}
                            /></View>: <Trade/>)}
                    <View>
                        <Text style={{paddingBottom:10}}>{selectedOption} Details</Text>
                        <Details Customer={selectedOption} full={true}/>
                        {selectedOption==='School'&& <Text style={{paddingBottom:10}}>Enrollment</Text>}
                        {selectedOption==='School'&& <Enrollment/>}
                    </View>
                </>
        },
        {
            title: "Titles",
            content: <Titles/>
        },
        {
            title: "Other Details",
            content: <Text style={styles.contentText}>Other Details</Text>,
        },
    ];


    return (<>
        <ScrollView>
            <TouchableWithoutFeedback
                onPress={() => {
                    setDropdownVisible(false); // Close dropdown when clicking outside
                    Keyboard.dismiss(); // Dismiss keyboard if open
                }}
            >
                <View style={globalStyles.container}>
                    <View style={globalStyles.step}>
                        <Text style={[globalStyles.heading, globalStyles.primaryText]}>Order</Text>
                        {/* Radio Buttons */}
                        <View style={styles.radioContainer}>
                            {["School", "Trade", "Govt. Dept."].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={globalStyles.radioButton}
                                    onPress={() => {
                                        setSelectedOption(option)
                                        setSelectedDropdownValue("");
                                        setShipsTo("")
                                    }}
                                >
                                    <View style={[
                                        selectedOption === option && globalStyles.radioBorder,
                                    ]}>
                                        <View
                                            style={[
                                                selectedOption === option ? globalStyles.radioSelected : styles.radioCircle, ,
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    {/* Dropdown */}
                    <View style={globalStyles.step}>
                        <Text style={[globalStyles.heading, globalStyles.primaryText]}>Select {selectedOption}</Text>
                            <Dropdown
                                dropdownOptions={dropdownOptions} // Pass all options
                                selectedOption={selectedOption} // Determine which dropdown's options to use
                                selectedValue={selectedDropdownValue} // Bind selected value
                                onValueChange={(value) => {
                                    setSelectedDropdownValue(value); // Update selected value
                                }}
                            />
                    </View>
                    {/* Radio Buttons */}
                    <View style={globalStyles.step}>
                        <Text style={[globalStyles.heading, globalStyles.primaryText]}>Order Type</Text>
                        <View style={styles.radioContainer}>
                            {["New Order", "Repeat Order"].map((option) => (
                                <TouchableOpacity
                                    key={option}
                                    style={globalStyles.radioButton}
                                    onPress={() => setOrderType(option)}
                                >
                                    <View style={[
                                        orderType === option && globalStyles.radioBorder,
                                    ]}>
                                        <View
                                            style={[
                                                orderType === option ? globalStyles.radioSelected : globalStyles.radioCircle,
                                            ]}
                                        />
                                    </View>
                                    <Text style={styles.radioText}>{option}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <TabComponent tabs={tabOptions} defaultTab="Titles" />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 15,
    },
    step: {
        backgroundColor: 'white',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        padding: 10,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 10,
        boxShadow: '0px 2px 5px #00000020'
    },
    radioContainer: {
        flexDirection: "row",
        width: '95%',
        gap: 20

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
        padding: 2,
        width: 16,
        height: 16,
        borderRadius: 10,
        borderRadius: 10,
        borderColor: "#00000060",
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginRight: 8,
    },
    radioSelected: {
        width: 10,
        height: 10,
        borderRadius: 10,
        backgroundColor: "#0b57d0",

    },
    radioText: {
        fontSize: 16,
    },
    pickerContainer: {
        height: 40,
        width: "95%",
        borderWidth: 1,
        borderColor: "#00000040",
        backgroundColor: 'white',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        overflow: "hidden",
    },
    picker: {
        width: "100%",
        marginTop: -8,
    },
    dropdownContainer: {
        width: '95%',
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
    }
});

export default SalesOrderScreen;
