import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, TextInput, Image } from "react-native";
import { Picker } from '@react-native-picker/picker'
import globalStyles, { PrimaryColor, PrimaryColorLight, PrimaryColorLight3 } from "../../globalCSS";
import TabComponent from "../../Components/Tabs/Tabs";
import schoolsData from "../schoolsData";
import { ScrollView } from "react-native-gesture-handler";
import Trade from "../../Components/Trade/trade";
import AddressForm from "../../Components/Address Form/AddressForm";
import Details from "../../Components/Details Table/Details";
import Dropdown from "../../Components/Dropdown/Dropdown";
import Enrollment from "../../Components/Details Table/Enrollment";
import Titles from "../../Components/Titles/Titles";
import OrderDetailsForm from "../../Components/OtherDetails/OtherDetailsForm";
import AnimatedHeader from "../AnimatedHeader";
import BG from '../../assets/Images/orderentrybg.jpg'
import axios from "axios";
// import axios from "axios";
const SalesOrderScreen = () => {
    const [selectedOption, setSelectedOption] = useState("School");
    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [orderType, setOrderType] = useState("New Order");
    const [shipsTo, setShipsTo] = useState("")
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [orderData, setOrderData]=useState([])

const fetchData = async () => {
    try {
        // Construct the URL with query parameters
        const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
        const params = {
            ActionType: "GetAllTypeCustomerWithSearch",
            iCompanyID: 1,
            Col1: selectedOption==="Govt. Dept."?"Government":selectedOption,
            Col2: "",
            Col3: "",
            Col4: "",
            Col5: "",
            Col6: "",
            UserID: 785,
        };
        
        const url = `${baseUrl}`;
        //console.log('Request URL:', url);

        // Make the POST request using axios
        const response = await axios.post(url, null, {
            params: params, // Send the params as query parameters
            headers: {
                "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
            },
        });

        const data = response.data;
       // console.log("Received data:", data);

        // Set the state with the fetched data
        setOrderData(data);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
    }
};

      
      useEffect(() => {
        fetchData();
      }, [selectedOption]);
    

    const dropdownOptions = orderData.map((item) => ({ id: item.Value_v, name: item.Text_t }))
    const ShippingOptions = ['School', 'Trade', 'Other Trade', 'Other Address']

    const tabOptions = [
        {
            title: "Billing/Shipping",
            content:
                <>
                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Billing Details</Text>
                    <View style={[globalStyles.pickerContainer, { marginBottom: 20, alignItems: 'center', minWidth: '100%', paddingLeft: 10 }]}>
                        <Text>{selectedOption === 'Govt. Dept.' ? 'Govt. Dept.' : 'Trade'}</Text>
                    </View>
                    {selectedOption === 'Govt. Dept.' ? <Details /> : <Trade />}
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
                    {selectedOption === 'School' && shipsTo !== "" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> : <Details />)}

                    {selectedOption === 'Trade' && shipsTo !== "" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> : shipsTo === 'School' ?
                            <View>
                                <Text style={{ paddingBottom: 2, color: '#00000095' }}>Select School</Text>

                                <Dropdown
                                    dropdownOptions={dropdownOptions} // Pass all options
                                    selectedOption={'School'} // Determine which dropdown's options to use
                                    selectedValue={selectedDropdownValue} // Bind selected value
                                    onValueChange={(value) => {
                                        setSelectedDropdownValue(value); // Update selected value
                                    }}
                                /></View> : <Details />)}
                    {selectedOption === 'Govt. Dept.' && shipsTo !== "" &&
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ? <Trade /> : shipsTo === 'School' ?
                            <View>
                                <Text style={{ paddingBottom: 2, color: '#00000095' }}>Select School</Text>

                                <Dropdown
                                    dropdownOptions={dropdownOptions} // Pass all options
                                    selectedOption={'School'} // Determine which dropdown's options to use
                                    selectedValue={selectedDropdownValue} // Bind selected value
                                    onValueChange={(value) => {
                                        setSelectedDropdownValue(value); // Update selected value
                                    }}
                                /></View> : <Trade />)}
                    <View>
                        <Text style={{ paddingBottom: 10 }}>{selectedOption} Details</Text>
                        <Details Customer={selectedOption} full={true} />
                        {selectedOption === 'School' && <Text style={{ paddingBottom: 10 }}>Enrollment</Text>}
                        {selectedOption === 'School' && <Enrollment />}
                    </View>
                </>
        },
        {
            title: "Titles",
            content: <Titles upload={true} />
        },
        {
            title: "Other Details",
            content: <OrderDetailsForm/>,
        },
    ];


    return (<>
        <AnimatedHeader title='Order Entry'>
            <TouchableWithoutFeedback
                onPress={() => {
                    setDropdownVisible(false); // Close dropdown when clicking outside
                    Keyboard.dismiss(); // Dismiss keyboard if open
                }}
            >
                <>
                <Image
                source={BG}
                style={styles.backgroundImage}
            />
            <View style={styles.dropdownContainer}>
                        {/* <Text style={[globalStyles.heading, globalStyles.primaryText]}>Order</Text> */}
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
                                    <Text style={[styles.radioText,  selectedOption === option && styles.active]}>{option}</Text>
                                </TouchableOpacity>
                                
                            ))}
                        </View>
                    </View>
                    <View style={[styles.dropdownContainer, {top:240, marginHorizontal:15}]}>
                        <Dropdown
                            rounded
                            dropdownOptions={dropdownOptions} // Pass all options
                            selectedOption={selectedOption} // Determine which dropdown's options to use
                            selectedValue={selectedDropdownValue} // Bind selected value
                            onValueChange={(value) => {
                                setSelectedDropdownValue(value); // Update selected value
                            }}
                        />
                        </View>
                <View style={styles.container}>
                    {/* Dropdown */}
                    {/* <View style={globalStyles.step}>
                        <Text style={[globalStyles.heading, globalStyles.primaryText]}>Select {selectedOption}</Text>
                        
                    </View> */}
                    {/* Radio Buttons */}
                    <View style={globalStyles.step}>
                        <Text style={[globalStyles.heading, globalStyles.primaryText, {textAlign:'center'}]}>Order Type</Text>
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
                </>
            </TouchableWithoutFeedback>
        </AnimatedHeader>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        paddingHorizontal: 8,
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
        // width: '100%',
        gap: 20,
        paddingVertical:10,
        paddingHorizontal:10,
        marginHorizontal:15,
        backgroundColor:'#ffffff95',
        borderRadius:11

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
        paddingHorizontal:10,
        paddingVertical:5
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
    backgroundImage: {
        width: "100%",
        height: 250,
        position: "relative",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    dropdownContainer: {
        position: "absolute",
        top: 180,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 20,
        zIndex: 10,
    },
    active:{
        backgroundColor:PrimaryColorLight3,
        borderWidth:1,
        borderColor:PrimaryColorLight,
        color:PrimaryColor,
        borderRadius:10
    }
});

export default SalesOrderScreen;
