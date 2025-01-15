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
import TitlesSales from "../../Components/Titles/TitlesSales";
import useSessionDetails from "../../Contexts/sessionDetails";
// import axios from "axios";
const SalesOrderScreen = () => {
    const [selectedOption, setSelectedOption] = useState("School");
    const [schoolData, setSchoolData] = useState('');
    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [orderType, setOrderType] = useState("New Order");
    const [shipsTo, setShipsTo] = useState("")
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [customer, setCustomer] = useState([])
    const [customerOT, setCustomerOT] = useState([])
    const [orderData, setOrderData] = useState([])
    const [schoolId, setSchoolId] = useState('');
    const [stateId, setStateId] = useState('');
    const [stateIdOT, setStateIdOT] = useState('');
    const [series, setSeries] = useState()
    const sessionDetails = useSessionDetails()
    const [executiveData, setExecutiveData] = useState();
    const [academicSession, setAcademicSession] = useState();
    const [classValue, setClassValue] = useState()
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [loading, setLoading] = useState()
    const [billTo, setBillTo] = useState()
    const [billingAddress, setBillingAddress] = useState()
    const [shipTo, setShipTo] = useState()
    const [shippingAddress, setShippingAddress] = useState()
    const [mappedData, setMappedData] = useState([]);
    const [formData, setFormData] = useState({
        executive: "",
        academicSession: "",
        selectedSubject: "",
        quantity: "",
        discount: "",
        sapCode: "",
        state: "",
        poNumber: "",
        deliveryDate: new Date(),
        orderReason: "",
        transporterName: "",
        shippingInstructions: ["", "", ""],
        bundleRemarks: "",
        orderRemarks: "",
        file: null,
    });
    const [formDataOT, setFormDataOT] = useState({
        sapCode: "",
        state: "",
    });
    const [tableData, setTableData] = useState([]);
    const fetchData = async () => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetAllTypeCustomerWithSearch",
                iCompanyID: 1,
                Col1: selectedOption === "Govt. Dept." ? "Government" : selectedOption,
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: 785,
            };

            const url = `${baseUrl}`;
            ////console.log('Request URL:', url);

            // Make the POST request using axios
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            const data = response.data;
            //console.log("Received data:", data);

            // Set the state with the fetched data
            setOrderData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchExecutivesAndSubordinates = async () => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetExecutiveAndSubordinates",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "",
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: sessionDetails.UserID,
            };

            const url = `${baseUrl}`;
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            const data = response.data;
            setExecutiveData(data);
            if (data.length === 1) {
                setFormData({ ...formData, executive: data[0].Value_v })
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchAcademicSession = async () => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetAcademicSession",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "",
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: sessionDetails.UserID,
            };
            const url = `${baseUrl}`;
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });
            const data = response.data;
            //console.log("Received data:", data);
            setAcademicSession(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchCustomerDetails = async (billTo) => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "GetCustomerData",
                iBranchID: 1,
                FinancialPeriod: "2024-2024",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "",
                Col2: Number(formData.sapCode),
                Col3: "trade",
                Col4: "",
                Col5: "",
                Col6: "",
                Col7: "",
                Col8: "",
                Col9: "",
                Col10: "",
                UserID: sessionDetails.UserID,
            };
            const url = `${baseUrl}`;
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });
            const data = response.data;
            //console.log("Received data:", data);
            setCustomer(data)
            billTo && setBillTo(data[0].sapCode)
            billTo && setBillingAddress(data[0].Customer)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchSchoolDetails = async () => {
        try {
            setLoading(true)
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_FindCommonDataForEdit";
            const params = {
                ActionType: "GetSchoolDetails",
                iCompanyID: sessionDetails.iCompanyID,
                LoadId: schoolId,
                UserID: sessionDetails.UserID,
            };

            const url = `${baseUrl}`;

            // Make the POST request using axios
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });
            const data = response.data[0];
            //console.log(data)
            setSchoolData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchOtherTradeDetails = async () => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "GetCustomerData",
                iBranchID: 1,
                FinancialPeriod: "2024-2024",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "",
                Col2: Number(formDataOT.sapCode), //10794
                Col3: "trade",
                Col4: "",
                Col5: "",
                Col6: "",
                Col7: "",
                Col8: "",
                Col9: "",
                Col10: "",
                UserID: sessionDetails.UserID,
            };
            const url = `${baseUrl}`;
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });
            const data = response.data;
            //console.log("Received data:", data);
            setCustomerOT(data)
            billTo && setShipTo(data[0].sapCode)
            billTo && setShippingAddress(data[0].Customer)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const OnSubmit = async () => {
            setLoading(true)
            try {
                const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_InsertOrderEntry";
                const body = {
                    "headerData": [
                        {
                            "TrnsType": "O",
                            "CustomerID": 59777,
                            "SchoolID": 0,
                            "ExecutiveID": sessionDetails.ExecutiveID,
                            "Source": "OrderEntry",
                            "ItemsDicAmt": 0,
                            "Remark": formData.orderRemarks,
                            "DownLoadStatus": "0",
                            "ShipTo": shipTo+"",
                            "ShippingAddress": shippingAddress,
                            "ShippingMode": formData.transporterName,
                            "ShippingInstructions": formData.shippingInstructions[0]+formData.shippingInstructions[1]+formData.shippingInstructions[2],
                            "BillTo": billTo,
                            "BillingAddress": billingAddress,
                            "PONumber": Number(formData.poNumber),
                            "ReqDeliveryDate": formData.deliveryDate.toISOString(),
                            "OrderReason": formData.orderReason,
                            "BundleRemark": "Bundle Remarks",
                            "AcademicYear": formData.academicSession,
                            "BillingToType": selectedOption === 'Govt. Dept.' ? 'Govt. Dept.' : 'Trade',
                            "ShippingToType": shipsTo
                        }
                    ],
                    "itemData": mappedData,
                    "TransactionID": 0,
                    "TabID": "5889758394368713",
                    "OrderType": orderType==="New Order"?"New":"Repeat",
                    "iCompanyID": sessionDetails.iCompanyID,
                    "UserID": sessionDetails.UserID
                }
                
                const url = `${baseUrl}`;
                console.log(body)
                const response = await axios.post(url, body, {
                    headers: {
                        "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                    },
                });
    
                // Access the data from the response
                const data = response.data;
                console.log("++=+==+===+++++>>>>>>>",data)
                alert(`${data[0].statusRemark}`)
                setFormData({
                    executive: "",
                    academicSession: "",
                    selectedSubject: "",
                    quantity: "",
                    discount: "",
                    sapCode: "",
                    state: "",
                    poNumber: "",
                    deliveryDate: new Date(),
                    orderReason: "",
                    transporterName: "",
                    shippingInstructions: ["", "", ""],
                    bundleRemarks: "",
                    orderRemarks: "",
                    file: null,
                })
                setTableData([])
                setMappedData([])
                
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
    };
    useEffect(() => {
        if (tableData && Array.isArray(tableData)) {
            const newMappedData = tableData.map((row) => ({
                "DocIR": "I", // Static value for all rows
                "BookCode": row.BookCode || "", // Map from tableData row's BookCode
                "SeriesID": row.SeriesID || null, // Map from SeriesID
                "Qty": row.Quantity || 0, // Map from Quantity
                "Disc": Number(row.StandardDisc) || 0, // Map from StandardDisc
                "AdditionalDisc": Number(row.Discount) || 0, // Map from Discount
            }));

            // Update the state with the mapped data
            setMappedData(newMappedData);
        }
    }, [tableData]);

    const searchBillto = () => {
        fetchCustomerDetails(true)
    }

    useEffect(() => {
        fetchExecutivesAndSubordinates()
        fetchAcademicSession()
    }, [sessionDetails.UserID])
    useEffect(() => {
        if (schoolId) {
            fetchSchoolDetails();
        }
    }, [schoolId])
    useEffect(() => {
        fetchData();
    }, [selectedOption]);

    useEffect(() => {
        //console.log(formData)
    }, [formData])
    useEffect(() => {
        //console.log("========", customer)
    }, [customer])

    useEffect(() => {
        if (shipsTo === "Trade" && customer) {
            setShippingAddress(customer[0]?.Customer);
            setShipTo(customer[0]?.sapCode);
        } 
        if (shipsTo === "School" && schoolData) {
            setShippingAddress(schoolData?.schooladdress);
            setShipTo(schoolData?.sapcode);
        }
    }, [shipsTo]);

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
                    {selectedOption === 'Govt. Dept.' ? <Details /> : <Trade formData={formData} setFormData={setFormData} stateId={stateId} setStateId={setStateId} fetchCustomerDetails={searchBillto} />}
                    {customer && <Details data={customer[0]} />}
                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Shipping Details</Text>
                    <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
                        <Picker
                            selectedValue={shipsTo}
                            onValueChange={(itemValue) => setShipsTo(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Ship To" color="#00000070" value="" />
                            {ShippingOptions.map((option, index) => (
                                // {//console.log(option)}
                                <Picker.Item key={index} label={String(option)} value={option} />
                            ))}
                        </Picker>
                    </View>
                    {selectedOption === 'School' && shipsTo !== "" &&
                        (
                            shipsTo === 'Other Address' ? <AddressForm /> :
                                shipsTo === 'Other Trade' ?
                                    <>
                                        <Trade formData={formDataOT} setFormData={setFormDataOT} stateId={stateIdOT} setStateId={setStateIdOT} fetchCustomerDetails={fetchOtherTradeDetails} />
                                        <Details data={customerOT[0]} />
                                    </> :
                                    shipsTo === 'Trade' ?
                                        customer && <>
                                            <Details data={customer[0]} />
                                        </> :
                                        <>
                                            <Details data={schoolData} />
                                        </>

                        )}

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
                                /></View> : '')}
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
                        {schoolData && <Details Customer={selectedOption} data={schoolData} full={true} />}
                        {selectedOption === 'School' && <Text style={{ paddingBottom: 10 }}>Enrollment</Text>}
                        {selectedOption === 'School' && <Enrollment data={schoolData} />}
                    </View>
                </>
        },
        {
            title: "Titles",
            content: <TitlesSales
                formData={formData}
                setFormData={setFormData}
                classValue={classValue}
                setClassValue={setClassValue}
                selectedLevels={selectedLevels}
                setSelectedLevels={setSelectedLevels}
                series={series}
                setSeries={setSeries}
                upload={true}
                schoolId={schoolId}
                tableData={tableData}
                setTableData={setTableData} />
        },
        {
            title: "Other Details",
            content: <View style={{ height: "fit-content" }}><OrderDetailsForm formData={formData} setFormData={setFormData}/></View>,
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
                                    <Text style={[styles.radioText, selectedOption === option && styles.active]}>{option}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                    <View style={[styles.dropdownContainer, { top: 225, marginHorizontal: 15 }]}>
                        <Dropdown
                            rounded
                            id={(value) => {
                                setSchoolId(value);
                            }}
                            dropdownOptions={dropdownOptions} // Pass all options
                            selectedOption={selectedOption} // Determine which dropdown's options to use
                            selectedValue={selectedDropdownValue} // Bind selected value
                            onValueChange={(value) => {
                                setSelectedDropdownValue(value); // Update selected value
                            }}
                        />
                    </View>
                    <View style={styles.container}>

                        {/* Radio Buttons */}
                        <View style={globalStyles.step}>
                            <Text style={[globalStyles.heading, globalStyles.primaryText, { textAlign: 'center' }]}>Order Type</Text>
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
                        <View style={globalStyles.step}>
                            <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
                                <Picker
                                    selectedValue={formData.executive}
                                    onValueChange={(value) => setFormData({ ...formData, executive: value })}
                                    style={styles.picker}
                                >
                                    {executiveData && executiveData.map((executive) => (
                                        <Picker.Item key={executive.Value_v} label={executive.Text_t} value={executive.Value_v} />
                                    ))}

                                </Picker>
                            </View>
                            <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
                                <Picker
                                    selectedValue={formData.academicSession}
                                    onValueChange={(value) => setFormData({ ...formData, academicSession: value })}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select Session" value="" />
                                    {academicSession && academicSession.map((session) => (
                                        <Picker.Item key={session.Value_v} label={session.Text_t} value={session.Value_v} />
                                    ))}
                                </Picker></View>
                        </View>
                        <TabComponent tabs={tabOptions} defaultTab="Titles" />
                        <TouchableOpacity style={styles.submitButton} onPress={OnSubmit} >
                            <Text style={styles.submitText}>Submit</Text>
                        </TouchableOpacity>
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
        justifyContent: "center",
        gap: 20,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff95',
        borderRadius: 11

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
        paddingHorizontal: 10,
        paddingVertical: 5
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
        height: 235,
        position: "relative",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    dropdownContainer: {
        position: "absolute",
        top: 165,
        flexDirection: "row",
        justifyContent: "center",
        // paddingHorizontal: 10,
        marginHorizontal: 15,
        zIndex: 10,
    },
    active: {
        backgroundColor: PrimaryColorLight3,
        borderWidth: 1,
        borderColor: PrimaryColorLight,
        color: PrimaryColor,
        borderRadius: 10
    },
    submitButton: {
        marginVertical: 10,
        marginBottom: 20,
        width: "90%",
        backgroundColor: '#007bff',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 10,

    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SalesOrderScreen;
