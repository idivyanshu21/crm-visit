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
import Loader from "../../Components/Loader";
import IOSPicker from "../../Components/IOSPicker";
// import axios from "axios";
const SalesOrderScreen = () => {
    const [selectedOption, setSelectedOption] = useState("School");
    const [schoolData, setSchoolData] = useState('');
    const [selectedDropdownValue, setSelectedDropdownValue] = useState("");
    const [orderType, setOrderType] = useState("New Order");
    const [shipsTo, setShipsTo] = useState("")
    const [billsTo, setBillsTo] = useState("")
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
    const [loading, setLoading] = useState(false)
    const [billTo, setBillTo] = useState()
    const [billingAddress, setBillingAddress] = useState()
    const [shipTo, setShipTo] = useState()
    const [shippingAddress, setShippingAddress] = useState()
    const [mappedData, setMappedData] = useState([]);
    const [tradeToSchoolData, setTradeToSchoolData] = useState()
    const [ts, setTs] = useState()
    const [tradeSchoolId, setTradeSchoolId] = useState()
    const [tradeSchoolData, setTradeSchoolData] = useState()
    const [initialData, setInitialData] = useState([])
    const [dropdownOptions, setDropdownOptions] = useState()
    const [show, setShow] = useState(true)
    const [tabId, setTabId] = useState('')
    const [formData, setFormData] = useState({
        executive: "",
        academicSession: 14,
        selectedSubject: "",
        quantity: "",
        discount: "",
        sapCode: "",
        state: "",
        poNumber: "",
        deliveryDate: "",
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
    const [tableDataRepeat, setTableDataRepeat] = useState([]);

    const fetchData = async () => {
        setLoading(true)
        setShow(false)
        try {
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetAllTypeCustomerWithSearch",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: selectedOption === "Govt. Dept." ? "Government" : selectedOption,
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: sessionDetails.UserID,
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
            setShow(true)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchDataTradetoSchool = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetAllTypeCustomerWithSearch",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "School",
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: sessionDetails.UserID,
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
            setTradeToSchoolData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchExecutivesAndSubordinates = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
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
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
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
            setAcademicSession(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchCustomerDetails = async (billTo) => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "GetCustomerData",
                iBranchID: 1,
                FinancialPeriod: "2024-2024",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "",
                Col2: Number(formData?.sapCode),
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
            console.log("Received data:", data);
            setCustomer(data)
            billTo && setBillTo(data[0].sapCode)
            billTo && setBillingAddress(data[0].Customer.replace(/<\/br>/g, "").trim())
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const fetchSchoolDetails = async () => {
        setLoading(true)
        try {
            setLoading(true)
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_FindCommonDataForEdit";
            const params = {
                ActionType: selectedOption === 'School' ? "GetSchoolDetails" : selectedOption === 'Trade' ? "GetTradeDetails" : "",
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
        setLoading(true)
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
            console.log("Received data:", data);
            setCustomerOT(data)
            billTo && setShipTo(data[0].sapCode)
            billTo && setShippingAddress(data[0].Customer.replace(/<\/br>/g, "").trim())
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    function generateRandom10DigitNumber() {
        return (Math.floor(1000000000 + Math.random() * 9000000000)).toString();
    }
    const OnSubmit = async () => {
        if (!schoolId) {
            alert("Please select a School/Trade/Govt. Dept.")
            return
        }
        if (!formData.academicSession) {
            alert("Please select Academic Year")
            return
        }
        if (!billsTo) {
            alert("Please select Billing Option")
            return
        }
        if (!billTo && !billingAddress) {
            alert("No Billing Customer")
            return
        }
        if (!shipsTo) {
            alert("Please select Shipping Option")
            return
        }
        if (!shipTo && !shippingAddress) {
            alert("No Shipping Customer")
            return
        }
        if (!mappedData || mappedData.length === 0) {
            alert("Titles are missing.")
            return
        }
        if (!formData.poNumber) {
            alert("Please provide PO Number.")
            return
        }
        setLoading(true)
        try {
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_InsertOrderEntry";
            const body = {
                "headerData": [
                    {
                        "TrnsType": "O",
                        "CustomerID": schoolId,
                        "SchoolID": 0,
                        "ExecutiveID": sessionDetails.ExecutiveID,
                        "Source": "OrderEntry",
                        "ItemsDicAmt": 0,
                        "Remark": formData.orderRemarks,
                        "DownLoadStatus": "0",
                        "ShipTo": shipTo + "",
                        "ShippingAddress": shippingAddress,
                        "ShippingMode": formData.transporterName,
                        "ShippingInstructions": formData.shippingInstructions[0] + formData.shippingInstructions[1] + formData.shippingInstructions[2],
                        "BillTo": billTo,
                        "BillingAddress": billingAddress,
                        "PONumber": Number(formData.poNumber),
                        "ReqDeliveryDate": formData.deliveryDate ? formData.deliveryDate.toISOString() : null,
                        "OrderReason": formData.orderReason,
                        "BundleRemark": formData.bundleRemarks,
                        "AcademicYear": formData.academicSession,
                        "BillingToType": selectedOption === 'Govt. Dept.' ? 'Govt. Dept.' : 'Trade',
                        "ShippingToType": shipsTo
                    }
                ],
                "itemData": mappedData,
                "TransactionID": 0,
                "TabID": tabId,
                "OrderType": orderType === "New Order" ? "New" : "Repeat",
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
            console.log("++=+==+===+++++>>>>>>>", data)
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
            setTabId(generateRandom10DigitNumber())

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchRepeatOrderDetails = async () => {
        try {
            setLoading(true)
            console.log("+++++++++++++")
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataForGrid";
            const params = {
                ActionType: "RepeatOrderInEntry",
                Col1: schoolId,
                Col2: "School",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
                iCompanyID: sessionDetails.iCompanyID,
                UserID: 988,
            };
            const url = `${baseUrl}`;
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });
            const data = response.data;
            console.log(data)
            setInitialData(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (orderType === "Repeat Order") {
            fetchRepeatOrderDetails()
        }
    }, [schoolId, orderType])

    useEffect(() => {
        const abc = generateRandom10DigitNumber()
        setTabId(abc)
    }, [])

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

    useEffect(() => {
        if (tableDataRepeat && Array.isArray(tableDataRepeat)) {
            const newMappedData = tableDataRepeat.filter((row) => row.selected).map((row) => ({
                "DocIR": "I", // Static value for all rows
                "BookCode": row.BookCode || "", // Map from tableData row's BookCode
                "SeriesID": row.SeriesID || null, // Map from SeriesID
                "Qty": row.quantity || 0, // Map from Quantity
                "Disc": Number(row.StandardDisc) || 0, // Map from StandardDisc
                "AdditionalDisc": Number(row.additionalDiscount) || 0, // Map from Discount
            }));

            // Update the state with the mapped data
            setMappedData(newMappedData);
        }
    }, [tableDataRepeat]);

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
    }, [selectedOption, sessionDetails]);
    useEffect(() => {
        if (shipsTo === "School" && selectedOption === "Trade") {
            fetchDataTradetoSchool()
        }
    }, [shipsTo]);
    useEffect(() => {
        //console.log(formData)
    }, [formData])
    useEffect(() => {
        //console.log("========", customer)
    }, [customer])

    useEffect(() => {
        if (selectedOption === "School" && shipsTo === "Trade" && customer) {
            setShippingAddress(customer[0]?.Customer);
            setShipTo(customer[0]?.sapCode);
        }
        if (selectedOption === "School" && shipsTo === "School" && schoolData) {
            setShippingAddress(schoolData?.schooladdress);
            setShipTo(schoolData?.sapcode);
        }
        if (selectedOption === "Trade" && shipsTo === "School") {
            setShippingAddress(schoolData?.schooladdress);
            setShipTo(schoolData?.sapcode);
        }
        if (selectedOption === "Trade" && shipsTo === "Trade" && schoolData) {
            setShippingAddress(schoolData?.schooladdress);
            setShipTo(schoolData?.sapcode);
        }
    }, [shipsTo]);

    useEffect(() => {
        if (selectedOption === "Trade" && schoolData) {
            setBillingAddress(schoolData?.schooladdress);
            setBillTo(schoolData?.sapcode);
        }
    }, [selectedOption, schoolData, billsTo]);

    useEffect(() => {

        const fetchCustomerSchoolDetails = async () => {
            try {
                console.log("executed")
                // Construct the URL with query parameters
                const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
                const params = {
                    ActionType: "GetCustomerData",
                    iBranchID: 1,
                    FinancialPeriod: "2024-2024",
                    iCompanyID: sessionDetails.iCompanyID,
                    Col1: "",
                    Col2: tradeSchoolId,
                    Col3: "school",
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
                console.log("Received data:", data);
                setCustomer(data)
                setShipTo(data[0]?.sapCode)
                setShippingAddress(data[0]?.Customer.replace(/<\/br>/g, "").trim())
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomerSchoolDetails()
    }, [tradeSchoolId])

    const repeatCardsMap = () => {
        const cardData = initialData?.map((item) => ({
            ...item,
            selected: false,
            quantity: item.Qty24_25,
            additionalDiscount: item.AddDisc24_25,
        }))
        setTableDataRepeat(cardData)
    }

    useEffect(() => {
        repeatCardsMap()
    }, [initialData])
    useEffect(() => {
        const options = orderData.map((item) => ({ id: item.Value_v, name: item.Text_t }))
        setDropdownOptions(options)
    }, [orderData])
    const dropdownOptionsTradeSchool = tradeToSchoolData?.map((item) => ({ id: item.Value_v, name: item.Text_t }))
    const ShippingOptions = ['School', 'Trade', 'Other Trade', 'Other Address']

    const tabOptions = [
        {
            title: "Billing/Shipping",
            content:
                <>
                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Billing Details</Text>
                    {/* <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
                        <Picker
                            selectedValue={sTo}
                            onValueChange={(itemValue) => setBillsTo(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Bill To" color="#00000070" value="" />
                            {(selectedOption === 'School' || selectedOption === 'Trade') &&
                                <Picker.Item label="Trade" color="#000000" value="Trade" />}
                            {selectedOption === "Govt. Dept." &&
                                <Picker.Item label="Govt. Dept." color="#000000" value="Govt. Dept." />}
                        </Picker>
                    </View> */}
                    <IOSPicker
                        selectedValue={billsTo}
                        onValueChange={(itemValue) => setBillsTo(itemValue)}
                        data={[
                            { label: "Select Bill To", value: "", color: "#00000070" },
                            ...(selectedOption === "School" || selectedOption === "Trade"
                                ? [{ label: "Trade", value: "Trade", color: "#000000" }]
                                : []),
                            ...(selectedOption === "Govt. Dept."
                                ? [{ label: "Govt. Dept.", value: "Govt. Dept.", color: "#000000" }]
                                : []),
                        ]}
                        placeholder="Select Bill To"
                        itemStyle={{ color: "#000000" }} // Default color
                    />

                    {selectedOption === 'Govt. Dept.' ? <Details /> : selectedOption === 'School' ? <>{billsTo && <Trade formData={formData} setFormData={setFormData} stateId={stateId} setStateId={setStateId} fetchCustomerDetails={searchBillto} />}</> : <></>}
                    {customer && selectedOption === 'School' && billsTo && <Details data={customer[0]} />}
                    {schoolData && selectedOption === 'Trade' && billsTo && <Details data={schoolData} />}

                    <Text style={{ paddingBottom: 5, color: '#00000095' }}>Shipping Details</Text>
                    {/* <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}>
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
                    </View> */}
                    <IOSPicker
                        selectedValue={shipsTo}
                        onValueChange={(itemValue) => setShipsTo(itemValue)}
                        data={[
                            { label: "Select Ship To", value: "", color: "#aaa" }, // Placeholder
                            ...ShippingOptions.map((option) => ({
                                label: String(option),
                                value: option,
                                color: "#000", // Default color for options
                            })),
                        ]}
                        placeholder="Select Ship To"
                        placeholderColor="#aaa" // Placeholder color
                        defaultColor="#000" // Default color for options
                    />

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
                        (shipsTo === 'Other Address' ? <AddressForm /> : shipsTo === 'Other Trade' ?
                            <><Trade formData={formDataOT} setFormData={setFormDataOT} stateId={stateIdOT} setStateId={setStateIdOT} fetchCustomerDetails={fetchOtherTradeDetails} />
                                <Details data={customerOT[0]} />
                            </>
                            : shipsTo === 'School' ?
                                <View>
                                    <Text style={{ paddingBottom: 2, color: '#00000095' }}>Select School</Text>

                                    <Dropdown
                                        dropdownOptions={dropdownOptionsTradeSchool} // Pass all options
                                        selectedOption={'School'} // Determine which dropdown's options to use
                                        selectedValue={ts} // Bind selected value
                                        id={(value) => {
                                            setTradeSchoolId(value);
                                        }}
                                        onValueChange={(value) => {
                                            setTs(value); // Update selected value
                                        }}
                                    />
                                    <View style={{ marginTop: 10 }}>
                                        <Details data={customer[0]} />
                                    </View>

                                </View> : <Details data={schoolData} />)}
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
                setTableData={setTableData}
                orderType={orderType}
                tableDataRepeat={tableDataRepeat}
                setTableDataRepeat={setTableDataRepeat} />
        },
        {
            title: "Other Details",
            content: <View style={{ height: "fit-content" }}><OrderDetailsForm formData={formData} setFormData={setFormData} tabID={tabId} /></View>,
        },
    ];


    return (<>
        {loading && <Loader />}
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
                                        setCustomer("")
                                        setCustomerOT("")
                                        setBillingAddress("")
                                        setBillTo("")
                                        setShippingAddress("")
                                        setShipTo("")
                                        setSchoolData('')
                                    }}
                                >
                                    <Text style={[styles.radioText, selectedOption === option && styles.active]}>{option}</Text>
                                </TouchableOpacity>

                            ))}
                        </View>
                    </View>
                    <View style={[styles.dropdownContainer, { top: 225, marginHorizontal: 15 }]}>
                        {show && <Dropdown
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
                        />}
                    </View>
                    <View style={styles.container}>

                        {/* Radio Buttons */}
                        <View style={{ backgroundColor: "white", width: "100%", borderRadius: 15 }}>
                            {/* <Text style={[globalStyles.heading, globalStyles.primaryText, { textAlign: 'center' }]}>Order Type</Text> */}
                            <View style={styles.radioContainer}>
                                {/* ["New Order", "Repeat Order"] */}
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
                            {/* <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}> */}
                            <IOSPicker
                                selectedValue={formData.executive}
                                onValueChange={(value) => setFormData({ ...formData, executive: value })}
                                data={executiveData} // No mapping required
                                placeholder="Select an Executive"
                            />
                            {/* </View> */}
                            {/* <View style={[globalStyles.pickerContainer, { marginBottom: 20 }]}> */}
                            <IOSPicker
                                selectedValue={formData.academicSession}
                                onValueChange={(value) =>
                                    setFormData({ ...formData, academicSession: value })
                                }
                                data={academicSession} // No mapping required
                                placeholder="Select Academic Year"
                            />
                            {/* </View> */}
                        </View>
                        <TabComponent tabs={tabOptions} defaultTab="Billing/Shipping" />
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
