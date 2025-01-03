import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Image } from 'react-native';
import globalStyles, { PrimaryColor, PrimaryColorLight, PrimaryColorLight2, PrimaryColorLight3 } from '../../globalCSS';
import * as DocumentPicker from 'expo-document-picker';
import OrderProcess from '../OrdersProcess/OrderProcess';
import uploadIcon from "../../assets/cloud.png"
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import useSessionDetails from '../../Contexts/sessionDetails';
import Loader from '../Loader';

const SamplingRequest = ({ samplingRequest = true, schoolCode, schoolData,
    formData,
    setFormData,
    tableDataSR,
    setTableDataSR,
    orderListSR,
    setOrderListSR,
    selectedLevelsSR,  //
    setSelectedLevelsSR, //
    handleCheckboxChangeSR, //
    classValueSR,
    setClassValueSR,
    classType, //
    setClassType, //
    showTableSR,
    setShowTableSR,
    OnSubmit,
    cards, setCards }) => {
    const sessionDetails = useSessionDetails()
    const [title, setTitle] = useState("Title in Series");
    const titleOptions = ['Title in Series', 'Title not in Series'];
    const [modalVisible, setModalVisible] = useState(false);

    const [selectedFile, setSelectedFile] = useState(null);
    const [shipmentMode, setShipmentMode] = useState([])
    const [allBookData, setAllBookData] = useState([]);
    const [teacher, setteacher] = useState()
    const [Instructions, setInstructions] = useState('')
    const [subject, setsubject] = useState('')
    const [series, setseries] = useState()
    const [months, setMonths] = useState([
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ])
    const [bookQuantities, setBookQuantities] = useState({
        CB: "",
        WB: "",
        LR: "",
        TB: "",
        CD: "",
    });

    const findBookTypeName = (bookCode) => {
        for (const book of allBookData) {
            if (book.BookCodes.split(",").includes(bookCode)) {
                return book.booktypename;
            }
        }
        return null;
    };
    const [loading, setLoading] = useState(false)
    const classLevels = ['All', 'Pre Primary', 'Primary', 'Middle', 'Secondary', 'Sr. Secondary'];
    const classNum = ['All', 'Nry', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleBookQuantityChange = (bookType, value) => {
        setBookQuantities((prev) => ({
            ...prev,
            [bookType]: value,
        }));
    };

    const getConcatenatedBookCodes = () => {
        let concatenatedCodes = "";
        Object.entries(bookQuantities).forEach(([bookType, quantity]) => {
            if (quantity && parseInt(quantity, 10) > 0) {
                const matchingBook = allBookData.find(
                    (book) => book.booktypename === bookType
                );
                if (matchingBook) {
                    const bookCodes = matchingBook.BookCodes.split(",");
                    concatenatedCodes += bookCodes.join(",") + ",";
                }
            }
        });
        return concatenatedCodes.replace(/,$/, "");
    };

    const handleAddToList = async () => {
        if (!formData.shipmentMode) {
            alert("Please select the shipment mode.");
            return;
        }
    
        if (!schoolCode) {
            alert("Please select the school code.");
            return;
        }
    
        if (!formData.selectedSubjectSR) {
            alert("Please select the subject.");
            return;
        }
    
        if (!formData.selectedSeriesSR) {
            alert("Please select the series.");
            return;
        }
    
        if (!bookQuantities || Object.values(bookQuantities).every((quantity) => !quantity || parseInt(quantity, 10) === 0)) {
            alert("Please enter at least one non-zero book quantity.");
            return;
        }
    
        // Check for non-zero quantities specifically
        const nonZeroQuantities = Object.values(bookQuantities).some(
            (value) => value && parseInt(value, 10) > 0
        );
    
        if (!nonZeroQuantities) {
            alert("Please enter at least one valid book quantity greater than zero.");
            return;
        }
        setLoading(true)
        const concatenatedBookCodes = getConcatenatedBookCodes();

        try {
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "LoadTitleStockExeDis",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: "2024-2024",
                Col1: title === "Title in Series" ? concatenatedBookCodes : formData.selectedSeriesSR,
                Col2: "",
                Col3: "",
                Col4: sessionDetails.ExecutiveID,
                Col5: "",
                Col6: "",
                Col7: "",
                Col8: "",
                Col9: "",
                Col10: "",
                UserID:sessionDetails.UserID,
            };

            const response = await axios.post(baseUrl, null, {
                params: params,
                headers: {
                    Authorization: "Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC",
                },
            });

            const data = response?.data;
            console.log('++++++++++++++++++===============>>>>>',data)
            if (!data || data.length === 0) {
                alert("No data found.");
                return;
            }
            if(formData.samplingType !== "ToBeDispatched"){
            const minStock = Math.min(...data.map((book) => book.ExecutiveStock));
            const exceedingQuantities = Object.entries(bookQuantities).filter(
                ([key, value]) => value && parseInt(value, 10) > minStock
            );

            if (exceedingQuantities.length > 0 && formData.samplingType !== "ToBeDispatched") {
                alert(
                    `The selected quantities exceed the minimum available stock (${minStock}). Please adjust your selection.`
                );
                return;
            }
        }

            const cardId = Date.now(); // Unique identifier for the card
            const Plant_SAPCode= title==='Title in Series'? null: data[0].BookCode
            console.log(Plant_SAPCode)
            console.log(allBookData)
            const newTableRows = data?.map((book) => {
                    const bookTypeName = title==='Title in Series'? findBookTypeName(book.BookCode):allBookData[0].booktypename;
                    if (!bookTypeName) return null;

                    return {
                        cardId, // Associate this row with the card
                        BookName: book.BookName,
                        Qty: bookQuantities[bookTypeName] || 0,
                        "AddoptionChances": 0,
                        "BookCode": book.BookCode,
                        "CompPublisher": 0,
                        "OppValue": 0,
                        "PlanYear": null,
                        "Series": null,
                        "Title": null,
                        "TitleRemark": null,
                        "TrnsSamplePlanDetailID": 1,
                        "iCompanyID": 0

                    };
                })
                .filter(Boolean); // Remove null rows
                console.log(newTableRows)

            setTableDataSR((prevTableData) => [...prevTableData, ...newTableRows]);

            const cardData = {
                cardId, // Add cardId to the card
                shipment_Mode: shipmentMode?.find(sm => sm.Value_v === formData.shipmentMode)?.Text_t || "Not Selected",
                subject: subject?.find(s => s.Value_v === formData.selectedSubjectSR)?.Text_t || 'Unknown Subject',
                teacher: teacher?.find(t => t.Value_v === formData.teacher)?.Text_t || 'Unknown Teacher',
                ship_To: formData.shipTo === "official" ? "Official Address" : "Residence Address",
                series: series?.find(s => s.Value_v === formData.selectedSeriesSR)?.Text_t || 'Unknown Series',
                sampling_Copy_Type: formData.samplingCopyType === "P" ? "Promotion Copy" : "Teacher's Copy",
                sampling_Type: formData.samplingType === "AlreadyGiven" ? "Already Given" :
                    formData.samplingType === "NoSampling" ? "No Sampling" : "To Be Dispatched",
                sampling_Instructions: formData.samplingInstructions || "Not Provided",
                bookQuantities: { ...bookQuantities },
                "Action": null,
                "Approved": 0,
                "ApprovedBy": 0,
                "ApprovedOn": null,
                "BillToAddress": null,
                "BookNum_ConCat": null,
                "CB_Qty": bookQuantities.CB ? bookQuantities.CB : 0,
                "CCGiven": false,
                "CD_Qty": bookQuantities.CD ? bookQuantities.CD : 0,
                "ClassLevel_ConCat": (classType === 'Class Level' ? classValueSR : '' )|| null,
                "ClassNum_ConCat": (classType === 'Class Level' ? '' : classValueSR)||null,
                "ContactPersonID": 184027,
                "CustomerCode": null,
                "Deleted": false,
                "ExecutiveConfirmRemarks": null,
                "ExecutiveConfirmation": null,
                "FinancialPeriod": null,
                "LR_Qty": bookQuantities.LR ? bookQuantities.LR : 0,
                "NextVisit": null,
                "NextVisitDate": null,
                "Plant_SAPCode": Plant_SAPCode,
                "Remarks": null,
                "Response": null,
                "SAPOrderNo": null,
                "SalesManID": null,
                "SalesOffice_SAPCode": null,
                "SamplingCopyType": formData.samplingCopyType,
                "SamplingType": formData.samplingType,
                "SamplingWOVisitId": null,
                "SeriesID": formData.selectedSeriesSR,
                "ShipTo": formData.shipTo,
                "ShipToAddressType": null,
                "ShipmentMode": formData.shipmentMode,
                "ShipmentStatus": null,
                "ShippingAddress": null,
                "Status": null,
                "SubjectID": formData.selectedSubjectSR,
                "TB_Qty": bookQuantities.TB ? bookQuantities.TB : 0,
                "TR_TransactionID": null,
                "TVDAppId": null,
                "TVDUniqueId": 1,
                "TVUniqueID": null,
                "UpdateTime": null,
                "UserID": null,
                "Verified": false,
                "VerifiedBy": 0,
                "VerifiedDate": null,
                "VerifiedRemarks": null,
                "WB_Qty": bookQuantities.WB ? bookQuantities.WB : 0,
                "iBranchID": 0,
                "iCompanyID": 0,
                "isTemp": false,
                "shipingInstruction": formData.samplingInstructions

            };

            setCards((prevCards) => [...prevCards, cardData]);

            setBookQuantities({
                CB: "",
                WB: "",
                LR: "",
                TB: "",
                CD: "",
            });
            setFormData({
                shipmentMode: "",
                selectedSubjectSR: "",
                teacher: "",
                shipTo: "",
                selectedSeriesSR: "",
                samplingCopyType: "",
                samplingType: "",
                samplingInstructions: "",
            });
        } catch (error) {
            console.error("Error fetching data:", error);
            alert("An error occurred while fetching data.");
        }finally{
            setLoading(false)
        }
    };

    // useEffect(() => {
    //     console.log('-------------->', cards)
    //     console.log('++++++++++++++>', tableDataSR)
    // }, [cards, tableDataSR])

    const syncTableRowsWithCard = (cardId, updatedQuantities) => {
        setTableDataSR((prevTableData) =>
            prevTableData.map((row) => {
                if (row.cardId === cardId) {
                    const bookTypeName = findBookTypeName(row.BookName);
                    return {
                        ...row,
                        Qty: updatedQuantities[bookTypeName] || row.Qty, // Update quantity based on card
                    };
                }
                return row;
            })
        );
    };


    const fetchTeacherData = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetMasterTeacherProfessor",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: schoolCode,
                Col2: "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
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

            // Access the data from the response
            const data = response.data;
            console.log(response)
            setteacher(data)
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchsubjectData = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetBroadSubjectInExecutiveWithSeriesAndTitle",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: sessionDetails.UserID,
                Col2: title === "Title in Series" ? "InSeries" : "",
                Col3: "",
                Col4: "",
                Col5: "",
                Col6: "",
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

            // Access the data from the response
            const data = response.data;
            setsubject(data)
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchmonths = async () => {
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "GetSchoolSamplingMonth",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: "2024-2024",
                Col1: schoolCode,
                Col2: "",
                Col3: "",
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
            // console.log('Request URL:', params);

            // Make the POST request using axios
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            // Access the data from the response
            const data = response.data;
            //  console.log("Received data:", data);
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchsubjectData();
        fetchTeacherData();
        // fetchmonths()
    }, [title, sessionDetails]);

    const handleDeleteCard = (index) => {
        const cardIdToDelete = cards[index].cardId;

        // Remove the card
        setCards((prevCards) => prevCards.filter((_, i) => i !== index));

        // Remove rows from the table associated with this card
        setTableDataSR((prevTableData) =>
            prevTableData.filter((row) => row.cardId !== cardIdToDelete)
        );
    };

    const fetchSeriesData = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: title === "Title in Series" ? "GetMasterSeries" : "GetMasterTitle",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: sessionDetails.ExecutiveID,
                Col2: formData.selectedSubjectSR,
                Col3: title === "Title in Series" ?classValueSR:"",
                Col4: "",
                Col5: "",
                Col6: "",
                UserID: sessionDetails.UserID,
            };

            const url = `${baseUrl}`;
            // console.log('Request URL:', url);

            // Make the POST request using axios
            const response = await axios.post(url, null, {
                params: params, // Send the params as query parameters
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            // Access the data from the response
            const data = response.data;
            // console.log("Received data:", data);
            setseries(data)
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formData.selectedSubjectSR !== '') {
            fetchSeriesData();
        }
    }, [formData.selectedSubjectSR, classValueSR]);
    const handleQuantityChange = (index, value) => {
        setTableDataSR((prevTableData) => {
            const updatedTableData = [...prevTableData];
            updatedTableData[index].Qty = value; // Update the quantity
            return updatedTableData;
        });
    };
    const loadBookType = async () => {
        setLoading(true)
        try {
            // console.log(classValue, formData.selectedSeries);
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "LoadBookTypeInSeriesAndBook",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: '2024-2024',
                Col1: sessionDetails.ExecutiveID,
                Col2: title === "Title in Series" ? formData.selectedSeriesSR : "",
                Col3: title === "Title in Series" ? "" : formData.selectedSeriesSR,
                Col4: title === "Title in Series" ? "existingbooknumforseries" : "existingbooknumfortitle",
                Col5: classValueSR,
                Col6: "",
                Col7: "",
                Col8: "",
                Col9: "",
                Col10: "",
                UserID: sessionDetails.UserID,
            };

            const url = `${baseUrl}`;
            // console.log('Request URL:', url);

            const response = await axios.post(url, null, {
                params: params,
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            const data = response.data;
            // console.log("Received data:", data);
            setAllBookData(data);
            const initialQuantities = data.reduce((acc, book) => {
                acc[book.booktypename] = '';
                return acc;
            }, {});
            setBookQuantities(initialQuantities);


        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (formData.selectedSubjectSR !== '') {
            loadBookType();
        }
    }, [formData.selectedSeriesSR]);

    const fetchShipmentMode = async () => {
        setLoading(true)
        try {
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetShipmentMode",
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
            setShipmentMode(data)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchShipmentMode()
    }, [sessionDetails])
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return (
        <View style={{ width: '95%' }}>
            {loading && <Loader />}
            {samplingRequest && <>
                <View style={styles.formGroup}>
                    <Picker
                        selectedValue={formData.shipmentMode}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => {
                            handleInputChange('shipmentMode', itemValue);
                        }}>
                        <Picker.Item label="Shipment Mode" value="" />
                        {shipmentMode && shipmentMode?.map((mode) => (
                            <Picker.Item key={mode} label={mode.Text_t} value={mode.Value_v} />
                        ))}
                    </Picker>
                </View>
                <View style={styles.dropdownContainer}>
                            <Text style={styles.label}>Ship To</Text>
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={formData.shipTo}
                                    onValueChange={(itemValue) => handleInputChange('shipTo', itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Select Ship Location" value="" />
                                    <Picker.Item label="Official Address" value="official" />
                                    <Picker.Item label="Residence Address" value="residence" />
                                </Picker>
                            </View>
                        </View>
                <View style={[styles.formGroup,{padding:5, height: 100 }]}>
                    <TextInput placeholder='Sampling Instructions' value={formData.samplingInstructions} onChangeText={(text) => setFormData({ ...formData, samplingInstructions: text })} />
                </View>
            </>}

            <View style={[globalStyles.radioContainer, { justifyContent: 'center' }]}>
                {titleOptions.map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={globalStyles.radioButton}
                        onPress={() => setTitle(option)}
                    >
                        <View style={[title === option && globalStyles.radioBorder]}>
                            <View
                                style={[
                                    title === option
                                        ? globalStyles.radioSelected
                                        : globalStyles.radioCircle,
                                ]}
                            />
                        </View>
                        <Text style={globalStyles.radioText}>{option}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {title === 'Title in Series' && (
                <View style={[styles.seriesContainer, classType === 'Class Number' ? { height: 180 } : { height: 140 }]}>
                    <View style={[globalStyles.radioContainer, { justifyContent: 'center' }]}>
                        {['Class Level', 'Class Number'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={globalStyles.radioButton}
                                onPress={() => {
                                    setClassType(option)
                                    setSelectedLevelsSR([])
                                }}
                            >
                                <View style={[classType === option && globalStyles.radioBorder]}>
                                    <View
                                        style={[
                                            classType === option
                                                ? globalStyles.radioSelected
                                                : globalStyles.radioCircle,
                                        ]}
                                    />
                                </View>
                                <Text style={globalStyles.radioText}>{option}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.pillContainer}>
                        {(classType === 'Class Level' ? classLevels : classNum).map((item) => (
                            <TouchableOpacity
                                key={item}
                                style={[
                                    styles.pillButton,
                                    item === 'All'
                                        ? ((classType === 'Class Level' ? classLevels : classNum)
                                            .slice(1)
                                            .every(level => selectedLevelsSR.includes(level))
                                            ? styles.selectedPill
                                            : styles.unselectedPill)
                                        : (selectedLevelsSR.includes(item) ? styles.selectedPill : styles.unselectedPill),
                                ]}
                                onPress={() => handleCheckboxChangeSR(item)}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        item === 'All'
                                            ? ((classType === 'Class Level' ? classLevels : classNum)
                                                .slice(1)
                                                .every(level => selectedLevelsSR.includes(level))
                                                ? styles.selectedPillText
                                                : styles.unselectedPillText)
                                            : (selectedLevelsSR.includes(item)
                                                ? styles.selectedPillText
                                                : styles.unselectedPillText),
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}
            {<>
                <View style={styles.dropdownContainer}>
                    <Text style={[styles.label, { marginTop: 10 }]}>Broad Subject</Text>
                    <View style={[styles.pickerContainer,]}>
                        <Picker
                            selectedValue={formData.selectedSubjectSR}
                            onValueChange={(itemValue) => {
                                handleInputChange('selectedSubjectSR', itemValue);
                            }}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select a subject" value="" />
                            {subject[0]?.Text_t && subject?.map((sub) => (
                                <Picker.Item key={sub} label={sub.Text_t} value={sub.Value_v} />
                            ))}
                        </Picker>
                    </View>
                </View>
                {samplingRequest && (
                    <>
                        {teacher &&
                            <View style={styles.dropdownContainer}>
                                <Text style={styles.label}>Teacher</Text>
                                <View style={styles.pickerContainer}>
                                    <Picker
                                        selectedValue={formData.teacher}
                                        onValueChange={(itemValue) => handleInputChange('teacher', itemValue)}
                                        style={styles.picker}
                                    >
                                        {teacher[0]?.Text_t && teacher?.map((sub) => (
                                            <Picker.Item key={sub} label={sub.Text_t} value={sub.Value_v} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        }
                    </>
                )}
                {formData.selectedSubjectSR !== '' && (
                    <View style={styles.dropdownContainer}>
                        <Text style={styles.label}>{title === "Title in Series" ? "Series" : "Title"}</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                selectedValue={formData.selectedSeries}
                                onValueChange={(itemValue) => handleInputChange('selectedSeriesSR', itemValue)}
                                style={styles.picker}
                            >
                                <Picker.Item label={title === "Title in Series" ? "Select a series" : "Select a Title"} value="" />
                                {/* {series && console.log(series)} */}
                                {series && series.map((series) => (
                                    <Picker.Item key={series} label={series.Text_t} value={series.Value_v} />
                                ))}
                            </Picker>
                        </View>
                    </View>
                )}

                {Object.keys(bookQuantities).length > 0 && (
                    <View>
                        <Text style={styles.sectionHeader}>Enter Quantities</Text>
                        <View style={styles.inputContainer}>
                            {Object.keys(bookQuantities).map((bookType) => (
                                <View key={bookType}>
                                    <TextInput
                                        style={styles.input}
                                        value={bookQuantities[bookType]}
                                        onChangeText={(value) => handleBookQuantityChange(bookType, value)}
                                        keyboardType="numeric"
                                        placeholder={bookType}
                                    />
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Sampling Copy Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.samplingCopyType}
                            onValueChange={(itemValue) => handleInputChange('samplingCopyType', itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Sampling Copy" value="" />
                            <Picker.Item label="Promotion Copy" value="P" />
                            <Picker.Item label="Teachers Copy" value="T" />
                        </Picker>
                    </View>
                </View>

                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>Sampling Type</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={formData.samplingType}
                            onValueChange={(itemValue) => handleInputChange('samplingType', itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Select Sampling Type" value="" />
                            <Picker.Item label="Already Given" value="AlreadyGiven" />
                            <Picker.Item label="No Sampling" value="NoSampling" />
                            <Picker.Item label="To Be Dispatched" value="ToBeDispatched" />
                        </Picker>
                    </View>
                </View>

                <TouchableOpacity style={styles.addButton} onPress={() => {
                    handleAddToList()
                }}>
                    <Text style={styles.addButtonText}>Add to List</Text>
                </TouchableOpacity>

                {cards && cards.map((card, index) => (
                    <View key={index} style={styles.card}>
                        <Text>Shipment Mode: {card.shipment_Mode}</Text>
                        <Text>Board Subject: {card.subject}</Text>
                        <Text>Teacher: {card.teacher}</Text>
                        <Text>Ship To: {card.ship_To}</Text>
                        <Text>Series: {card.series}</Text>
                        <Text>Sampling Copy Type: {card.sampling_Copy_Type}</Text>
                        <Text>Sampling Type: {card.sampling_Type}</Text>
                        <Text>Sampling Instructions: {card.sampling_Instructions}</Text>

                        <View style={styles.inputContainer}>
                            {Object.entries(card.bookQuantities).map(([bookType, quantity]) => (
                                <TextInput
                                    key={bookType}
                                    style={styles.input}
                                    value={quantity}
                                    onChangeText={(value) => {
                                        setCards((prevCards) => {
                                            const newCards = [...prevCards];
                                            newCards[index].bookQuantities[bookType] = value;
                                            syncTableRowsWithCard(card.cardId, newCards[index].bookQuantities);
                                            return newCards;
                                        });
                                    }}
                                    keyboardType="numeric"
                                    editable={parseInt(quantity, 10) > 0} // Editable only if non-zero
                                    placeholder={bookType}
                                />
                            ))}
                        </View>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteCard(index)}
                        >
                            <Text style={styles.deleteButtonText}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {tableDataSR.length > 0 && (
                    <View style={styles.tableContainer}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableHeader, { flex: 1 / 3 }]}>S.No.</Text>
                            <Text style={styles.tableHeader}>Title</Text>
                            <Text style={styles.tableHeader}>Qty</Text>
                        </View>
                        {tableDataSR.map((row, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={[styles.tableCell, { flex: 1 / 3 }]}>{index + 1}</Text>
                                <Text style={styles.tableCell}>{row.BookName}</Text>
                                <TextInput
                                    style={styles.tableInput}
                                    value={row.Qty.toString()}
                                    onChangeText={(value) => handleQuantityChange(index, value)}
                                    keyboardType="numeric"
                                />
                            </View>
                        ))}
                    </View>
                )}

                <TouchableOpacity onPress={OnSubmit} style={styles.submitButton}>
                    <Text style={styles.submitText}>Submit</Text>
                </TouchableOpacity>
            </>}
        </View>
    );
};

export default SamplingRequest;

const styles = StyleSheet.create({
    header: {
        fontSize: 14,
        color: '#00000095',
        // fontWeight: '500',
        marginBottom: 20,
    },
    seriesContainer: {
        height: 280,
        boxShadow: "0px 1px 3px #00000020",
        backgroundColor: PrimaryColorLight2,
        padding: 10,
        paddingVertical: 15,
        marginVertical: 20,
        borderRadius: 6,
    },
    pillContainer: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap', // Enable wrapping for rows
        gap: 0,
    },
    pillButton: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 25, // High corner radius for pill shape
        margin: 5,
    },
    selectedPill: {
        backgroundColor: PrimaryColorLight,
        // borderWidth: 1,
        // borderColor: '#0a61c990',
    },
    unselectedPill: {
        backgroundColor: '#00000015',
    },
    pillText: {
        fontSize: 12,
    },
    selectedPillText: {
        color: PrimaryColor,
        fontWeight: 500
    },
    unselectedPillText: {
        color: '#00000090',
        fontWeight: 500
    },
    submitButton: {
        marginTop: 20,
        backgroundColor: '#007bff',
        paddingVertical: 12,
        alignItems: 'center',
        borderRadius: 5,
    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadButton: {
        backgroundColor: PrimaryColorLight2,
        width: "100%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
        marginTop: 10,
    },
    uploadButtonText: {
        color: PrimaryColor,
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    fileButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginBottom: 20,
    },
    fileButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    noteText: {
        fontSize: 12,
        color: '#555',
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    formGroup: {
        borderWidth: 1,
        borderColor: "#00000020",
        borderRadius: 11,
        overflow: "hidden",
        marginBottom: 20,
        height: 45,
        backgroundColor: "white",
    },
    dropdown: {
        marginTop: -6
    },
    input: {
        margin: 4,
        borderWidth: 1,
        borderColor: PrimaryColor,
        width: 50,
        height:45,
        borderRadius: 12
    },
    inputContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginVertical: 10
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        overflow: 'hidden',
        height: 45,
        marginBottom: 20,
        marginTop: 8
    },
    addButton: { backgroundColor: PrimaryColor, padding: 10, borderRadius: 5, marginBottom: 20 },
    addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
    card: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },
    picker: {
        marginTop: -6,
        color: '#00000090',
    },
    card: {
        marginTop: 10,
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        elevation: 3,
    },
    addButton: {
        backgroundColor: PrimaryColor,
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    addButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: "#fff",
        textAlign: "center",
        fontWeight: "bold",
    },
    tableContainer: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    tableRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    tableHeader: {
        fontWeight: "bold",
        flex: 1,
        textAlign: "center",
    },
    tableCell: {
        flex: 1,
        textAlign: "center",
    },
    tableInput: {
        flex: 1 / 2,
        textAlign: "center",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 5,
        padding: 5,
        marginHorizontal: 5
    },
});
