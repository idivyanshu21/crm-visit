import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, Image } from 'react-native';
import globalStyles, { PrimaryColor, PrimaryColorLight, PrimaryColorLight2 } from '../../globalCSS';
import * as DocumentPicker from 'expo-document-picker';
import OrderProcess from '../OrdersProcess/OrderProcess';
import uploadIcon from "../../assets/cloud.png"
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-gesture-handler';
import axios from 'axios';
import useSessionDetails from '../../Contexts/sessionDetails';
import Loader from '../Loader';

const Titles = ({ upload = false, salesPlan, samplingRequest = false, schoolCode, schoolData,
    formData,
    setFormData,
    tableData,
    setTableData,
    orderList,
    setOrderList,
    selectedLevels,
    setSelectedLevels,
    sampleMonth,
    sampleYear,
    setSampleYear,
    setSampleMonth,
    invoiceYear,
    setInvoiceYear,
    invoiceMonth,
    setInvoiceMonth,
    handleCheckboxChange,
    classValue,
    setClassValue,
    classType,
    setClassType,
    showTable,
    setShowTable,
    totalNetAmount,
    OnSubmit
    }) => {
    const sessionDetails = useSessionDetails()
    const [title, setTitle] = useState("Title in Series");
    const titleOptions = ['Title in Series', 'Title not in Series'];
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [shipmentMode, setShipmentMode] = useState('')
    const [feedback, setFeedback] = useState('')
    const [subject, setsubject] = useState('')
    const [loading,setLoading]=useState(false)
    const months = [
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
    ]
    const classValues = {
        "All": [],
        "Pre Primary": [-3, -2, -1],
        "Primary": [1, 2, 3, 4, 5],
        "Middle": [6, 7, 8],
        "Secondary": [9, 10],
        "Sr. Secondary": [11, 12],
        "Nry": [-3],
        "LKG": [-2],
        "UKG": [-1],
        "1": [1],
        "2": [2],
        "3": [3],
        "4": [4],
        "5": [5],
        "6": [6],
        "7": [7],
        "8": [8],
        "9": [9],
        "10": [10],
        "11": [11],
        "12": [12],
    };
    const classLevels = ['All', 'Pre Primary', 'Primary', 'Middle', 'Secondary', 'Sr. Secondary'];
    const classNum = ['All', 'Nry', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    const fetchsubjectData = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
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
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
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
        fetchmonths()
    }, [title, sessionDetails]);

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            });
            if (result.type === 'success') {
                setSelectedFile(result.name);
                //  console.log('File selected:', result.uri);
            }
        } catch (err) {
            console.error('Error picking file:', err);
        }
    };

    // Handle Checkbox Change
    useEffect(() => {
        //  console.log("classValue updated:", classValue);
    }, [classValue]);

    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    return (
        <View style={{ width: '95%' }}>
            {loading && <Loader/>}
            {salesPlan && <>
                <View style={styles.formGroup}>
                    <Picker
                        selectedValue={invoiceYear}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setInvoiceYear(itemValue)}>
                        <Picker.Item label="Invoice Year" value="" />
                        <Picker.Item label={currentYear} value={currentYear} />
                        <Picker.Item label={nextYear} value={nextYear} />
                    </Picker>
                </View>
                <View style={styles.formGroup}>
                    <Picker
                        selectedValue={invoiceMonth}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setInvoiceMonth(itemValue)}>
                        <Picker.Item label="Invoice Month" value="" />
                        {months.map((month, index) => (
                            <Picker.Item key={index} label={month} value={index + 1} />
                        ))}
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Picker
                        selectedValue={sampleYear}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setSampleYear(itemValue)}>
                        <Picker.Item label="Sample Year" value="" />
                        <Picker.Item label={currentYear} value={currentYear} />
                        <Picker.Item label={nextYear} value={nextYear} />
                    </Picker>
                </View>

                <View style={styles.formGroup}>
                    <Picker
                        selectedValue={sampleMonth}
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setSampleMonth(itemValue)}>
                        <Picker.Item label="Sample Month" value="" />
                        {months.map((month, index) => (
                            <Picker.Item key={index} label={month} value={index + 1} />
                        ))}
                    </Picker>
                </View>
            </>}
            {samplingRequest && <>
                <View style={styles.formGroup}>
                    <Picker
                        style={styles.dropdown}
                        onValueChange={(itemValue) => setInvoiceYear(itemValue)}>
                        <Picker.Item label="Shipment Mode" value="" />
                        <Picker.Item label="option 1" value="2022" />
                        <Picker.Item label="option 2" value="2023" />
                        <Picker.Item label="option 3" value="2024" />
                    </Picker>
                </View>
                <View style={styles.formGroup}>
                    <TextInput placeholder='Feedback' onChangeText={(text) => setFeedback(text)} />
                </View>
            </>}
            {!salesPlan && <Text style={styles.header}>Orders Process</Text>}
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
            {upload && <Text style={{ textAlign: 'center', fontSize: 14, color: '#00000095', marginTop: 6 }}>OR</Text>}
            {upload && <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }}>

                <TouchableOpacity
                    style={[styles.uploadButton, { flexDirection: 'row', alignItems: 'center', gap: 10, justifyContent: 'center' }]}
                    onPress={() => setModalVisible(true)}
                >
                    <Image source={uploadIcon} style={{ width: 28, height: 20 }} />
                    <Text style={styles.uploadButtonText}>Upload Titles</Text>
                </TouchableOpacity>
            </View>}
            {title === 'Title in Series' && (
                <View style={[styles.seriesContainer, classType === 'Class Number' ? { height: 180 } : { height: 140 }]}>
                    <View style={[globalStyles.radioContainer, { justifyContent: 'center' }]}>
                        {['Class Level', 'Class Number'].map((option) => (
                            <TouchableOpacity
                                key={option}
                                style={globalStyles.radioButton}
                                onPress={() => {
                                    setClassType(option)
                                    setSelectedLevels([])
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
                                            .every(level => selectedLevels.includes(level))
                                            ? styles.selectedPill
                                            : styles.unselectedPill)
                                        : (selectedLevels.includes(item) ? styles.selectedPill : styles.unselectedPill),
                                ]}
                                onPress={() => handleCheckboxChange(item)}
                            >
                                <Text
                                    style={[
                                        styles.pillText,
                                        item === 'All'
                                            ? ((classType === 'Class Level' ? classLevels : classNum)
                                                .slice(1)
                                                .every(level => selectedLevels.includes(level))
                                                ? styles.selectedPillText
                                                : styles.unselectedPillText)
                                            : (selectedLevels.includes(item)
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
                <>{subject &&
                    <OrderProcess
                        samplingRequest={samplingRequest}
                        boardSubject={subject}
                        title={title}
                        classValue={classValue}
                        classType={classType}
                        schoolDetails={schoolData}
                        invoiceMonth={invoiceMonth}
                        invoiceYear={invoiceYear}
                        sampleMonth={sampleMonth}
                        sampleYear={sampleYear}
                        formData={formData}
                        setFormData={setFormData}
                        tableData={tableData}
                        setTableData={setTableData}
                        orderList={orderList}
                        setOrderList={setOrderList}
                        showTable={showTable}
                        setShowTable={setShowTable}
                        months={months}
                        totalNetAmount={totalNetAmount}
                    />}
                </>

            <TouchableOpacity onPress={OnSubmit} style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Upload Excel File</Text>
                        <TouchableOpacity style={styles.fileButton} onPress={pickFile}>
                            <Text style={styles.fileButtonText}>
                                {selectedFile || 'Choose File'}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.noteText}>
                            Note: *BookCode*, *Quantity*, *AddDisc* are required columns in the Excel file.
                        </Text>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default Titles;

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
    }
});
