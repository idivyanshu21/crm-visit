import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal, TextInput, ActivityIndicator, Button, Alert } from 'react-native';
import globalStyles, { PrimaryColor, PrimaryColorLight } from '../../globalCSS';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import useSessionDetails from '../../Contexts/sessionDetails';
import axios from 'axios';
import { Checkbox } from 'react-native-paper';
import Loader from '../Loader';
import IOSPicker from '../IOSPicker';

const TitlesSales = ({ orderType, tableDataRepeat, setTableDataRepeat, formData, setFormData, classValue, setClassValue, selectedLevels, setSelectedLevels, series, setSeries, schoolId, tableData, setTableData }) => {
    const [title, setTitle] = useState("Title in Series");
    const titleOptions = ['Title in Series', 'Title not in Series'];
    const [classType, setClassType] = useState("Class Level");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [subject, setsubject] = useState('')
    const [allBookData, setAllBookData] = useState([]);
    const [loading, setLoading] = useState()
    const sessionDetails = useSessionDetails()
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

    const pickFile = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            });
            if (result.type === 'success') {
                setSelectedFile(result.name);
                console.log('File selected:', result.uri);
            }
        } catch (err) {
            console.error('Error picking file:', err);
        }
    };
    const handleCheckboxChange = (level) => {
        const currentArray = classType === 'Class Level' ? classLevels : classNum;

        if (level === 'All') {
            const allSelected = selectedLevels.length === currentArray.length - 1;
            const newSelectedLevels = allSelected ? [] : [...currentArray.slice(1)];
            setSelectedLevels(newSelectedLevels);
            setClassValue(newSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        } else {
            const newSelectedLevels = selectedLevels.includes(level)
                ? selectedLevels.filter(option => option !== level)
                : [...selectedLevels, level];

            const areAllSelected = currentArray.slice(1).every(option => newSelectedLevels.includes(option));
            const finalSelectedLevels = areAllSelected ? [...currentArray.slice(1)] : newSelectedLevels;

            setSelectedLevels(finalSelectedLevels);
            setClassValue(finalSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        }
    };
    const handleInputChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };
    const handleQuantityChange = (index, newQuantity) => {
        const updatedData = [...tableData];
        updatedData[index].Quantity = parseInt(newQuantity, 10) || 0;
        updatedData[index].TotalAmount =
            updatedData[index].Quantity * updatedData[index].Price;
        updatedData[index].TotalNetAmount =
            updatedData[index].TotalAmount * (1 - updatedData[index].StandardDisc / 100);
        setTableData(updatedData);
    };
    const handleDiscountChange = (index, newDiscount) => {
        const updatedData = [...tableData];
        updatedData[index].Discount = parseFloat(newDiscount) || 0;
        updatedData[index].TotalNetAmount =
            updatedData[index].TotalAmount *
            (1 - (Number(updatedData[index].Discount) + Number(updatedData[index].StandardDisc)) / 100);
        setTableData(updatedData);
    };
    const handleDelete = (index) => {
        Alert.alert("Delete", "Are you sure you want to delete this item?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                onPress: () => {
                    const updatedData = [...tableData];
                    updatedData.splice(index, 1);
                    setTableData(updatedData);
                },
            },
        ]);
    };


    useEffect(() => {
        fetchsubjectData()
    }, [sessionDetails, title])

    useEffect(() => {
        fetchSeriesData()
    }, [formData.selectedSubject,classValue])

    useEffect(() => {
        loadBookType()
    }, [formData.selectedSeries])

    const fetchsubjectData = async () => {
        console.log("executed")
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
            console.log(response)
            setsubject(data)
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const fetchSeriesData = async () => {
        console.log(classValue)
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: title === "Title in Series" ? "GetMasterSeries" : "GetMasterTitle",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: sessionDetails.ExecutiveID,
                Col2: formData.selectedSubject,
                Col3: title === "Title in Series" ? classValue : "",
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
            setSeries(data)
            // Set the state with the fetched data

        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const loadBookType = async () => {
        setLoading(true)
        try {
            // console.log(classValue, formData.selectedSeries);
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "LoadBookTypeInSeriesAndBook",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: '2024-2024',
                Col1: sessionDetails.ExecutiveID,
                Col2: title === "Title in Series" ? formData.selectedSeries : "",
                Col3: title === "Title in Series" ? "" : formData.selectedSeries,
                Col4: title === "Title in Series" ? "booknumfororderseries" : "booknumforordertitle",
                Col5: classValue,
                Col6: "",
                Col7: "",
                Col8: "",
                Col9: "",
                Col10: "",
                UserID: sessionDetails.UserID,
            };

            const url = `${baseUrl}`;
            setAllBookData(data);
            const response = await axios.post(url, null, {
                params: params,
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            const data = response.data;
            const bookCodes = data.map(item => item.BookCodes).join(",");
            setAllBookData(bookCodes)
            console.log("Received data+++++++++++++:", data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const addtolist = async () => {
        if (!formData.selectedSeries) {
            alert('Please Select Series')
            return
        }
        if (!formData.quantity) {
            alert('Please fill quantity')
            return
        }
        if (formData.quantity && formData.quantity <= 0) {
            alert('Quantity cannot be zero or smaller.')
            return
        }
        if (formData.discount && formData.discount < 0) {
            alert('Discount cannot be smaller than zero.')
            return
        }
        setLoading(true)
        try {
            // const concatenatedBookCodes = getConcatenatedBookCodes(allBookData);
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "LoadTitleAndSeriesDisc",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: '2024-2024',
                Col1: title === "Title in Series" ? allBookData : formData.selectedSeries,
                Col2: title === "Title in Series" ? formData.selectedSeries : "0",
                Col3: formData.quantity,
                Col4: formData.discount,
                Col5: title === "Title in Series" ? "Series" : "Title",
                Col6: schoolId,
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
            console.log("Received data+++++++++++++:", data);
            if (data && Array.isArray(data)) {
                const formattedData = data.map((item) => ({
                    ADAllowed: item.ADAllowed || "Y",
                    AdditionalDisc23_24: item.AdditionalDisc23_24 || "0",
                    AdditionalDisc24_25: item.AdditionalDisc24_25 || "0",
                    BookCode: item.BookCode || "",
                    BookName: item.BookName || "",
                    BookSeriesDesc: item.BookSeriesDesc || "",
                    Price: item.Price || 0,
                    StandardDisc: item.StandardDisc || "0",
                    TotalAmount: formData.quantity * (item.Price || 0),
                    TotalNetAmount:
                        (formData.quantity * (item.Price || 0)) *
                        (1 - (Number(item.StandardDisc) + Number(formData.discount)) / 100),
                    Quantity: formData.quantity,
                    Discount: formData.discount,
                    SeriesID: formData.selectedSeries
                }));
                setTableData((prev) => [...prev, ...formattedData]);
            } else {
                console.error("Unexpected data format:", data);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleCheckboxChangeCards = (index) => {
        const newData = [...tableDataRepeat];
        newData[index].selected = !newData[index].selected;
        setTableDataRepeat(newData);
    };

    const handleInputChangeCards = (index, field, value) => {
        const updatedData = [...tableDataRepeat];
        updatedData[index][field] = value ? parseInt(value) : 0;
        setTableDataRepeat(updatedData);
    };
    return (
        <View style={{ width: '95%' }}>
            {loading && <Loader />}
            {orderType === "New Order" && <Text style={styles.header}>Orders Process</Text>}
            {orderType === "New Order" && <View style={globalStyles.radioContainer}>
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
            </View>}
            {orderType === "New Order" && title === 'Title in Series' && (
                <View style={[styles.seriesContainer, classType === 'Class Number' ? { height: 190 } : { height: 150 }]}>
                    <View style={globalStyles.radioContainer}>
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
            {orderType === "New Order" && <View style={styles.dropdownContainer}>
                <Text style={[styles.label, { marginTop: 10 }]}>Broad Subject</Text>
                {/* <View style={[globalStyles.input, { borderRadius: 12, marginTop: 10, padding: 0, height: 45, marginBottom: 10 }]}>
                    <Picker
                        selectedValue={formData.selectedSubject}
                        onValueChange={(itemValue) => {
                            handleInputChange('selectedSubject', itemValue);
                        }}
                        style={[styles.picker, { marginTop: -6 }]}
                    >
                        <Picker.Item label="Select a subject" value="" />
                        {subject[0]?.Text_t && subject?.map((sub) => (
                            <Picker.Item key={sub} label={sub.Text_t} value={sub.Value_v} />
                        ))}
                    </Picker>
                </View> */}
                {subject[0]?.Text_t && <IOSPicker
                    selectedValue={formData.selectedSubject}
                    onValueChange={(itemValue) => handleInputChange("selectedSubject", itemValue)}
                    data={[
                        { label: "Select a subject", value: "" }, // Placeholder
                        ...(subject?.map((sub) => ({
                            label: sub.Text_t,
                            value: sub.Value_v,
                        })) || []),
                    ]}
                    placeholder="Select a subject"
                    style={[styles.picker, { marginTop: 6 }]}
                />}

            </View>}
            {formData.selectedSubject !== '' && orderType === "New Order" && (
                <View style={styles.dropdownContainer}>
                    <Text style={styles.label}>{title === "Title in Series" ? "Series" : "Title"}</Text>
                    {/* <View style={[globalStyles.input, { borderRadius: 12, marginTop: 10, padding: 0, height: 45 }]}>
                        <Picker
                            selectedValue={formData.selectedSeries}
                            onValueChange={(itemValue) => handleInputChange('selectedSeries', itemValue)}
                            style={[styles.picker, { marginTop: -6 }]}
                        >
                            <Picker.Item label={title === "Title in Series" ? "Select a series" : "Select a Title"} value="" />

                            {series && series.map((series) => (
                                <Picker.Item key={series} label={series.Text_t} value={series.Value_v} />
                            ))}
                        </Picker>
                    </View> */}
                    <IOSPicker
                        selectedValue={formData.selectedSeries}
                        onValueChange={(itemValue) => handleInputChange("selectedSeries", itemValue)}
                        data={[
                            {
                                label: title === "Title in Series" ? "Select a series" : "Select a Title",
                                value: "",
                            }, // Placeholder
                            ...(series?.map((item) => ({
                                label: item.Text_t,
                                value: item.Value_v,
                            })) || []),
                        ]}
                        placeholder={title === "Title in Series" ? "Select a series" : "Select a Title"}
                        style={[styles.picker, { marginTop: 6 }]}
                    />

                </View>
            )}
            {orderType === "New Order" && <View style={{ marginVertical: 10 }}>
                <Text style={styles.label}>Quantity:</Text>
                <TextInput
                    style={[globalStyles.input, { borderRadius: 12, marginTop: 10 }]}
                    keyboardType="numeric"
                    placeholder="Enter quantity"
                    value={formData.quantity || ''}
                    onChangeText={(value) => {
                        const integerValue = value.replace(/[^0-9]/g, '');
                        handleInputChange('quantity', integerValue)
                    }}
                />
            </View>}
            {orderType === "New Order" && <View style={{ marginVertical: 10 }}>
                <Text style={styles.label}>Add. Discount:</Text>
                <TextInput
                    style={[globalStyles.input, { borderRadius: 12, marginTop: 10 }]}
                    keyboardType="numeric"
                    placeholder="Enter discount"
                    value={formData.discount || ''}
                    onChangeText={(value) => {
                        const positiveDecimalValue = value.replace(/[^0-9.]/g, '') // Remove non-digit and non-period characters
                            .replace(/(\..*?)\./g, '$1'); // Allow only one decimal point
                        handleInputChange('discount', positiveDecimalValue)
                    }}
                />
            </View>}
            {orderType === "New Order" &&
                <View style={[styles.container]}>
                    {orderType === "New Order" &&
                        <TouchableOpacity style={styles.addButton} onPress={addtolist}>
                            <Text style={styles.addButtonText}>
                                {loading ? "Loading..." : "Add to List"}
                            </Text>
                        </TouchableOpacity>}
                    {loading && <ActivityIndicator size="large" color="#007bff" />}
                    {orderType === "New Order" && tableData.length === 0 && !loading ? (
                        <Text style={styles.emptyText}>No data available.</Text>
                    ) : (
                        <FlatList
                            data={tableData}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => (
                                <View style={styles.card}>
                                    <Text style={styles.text}>Row: {index + 1}</Text>
                                    <Text style={styles.text}>Series: {item.BookSeriesDesc}</Text>
                                    <Text style={styles.text}>Title: {item.BookName}</Text>
                                    <Text style={styles.text}>Price: {item.Price}</Text>


                                    {/* Editable Quantity */}
                                    <View style={styles.inputRow}>
                                        <Text style={styles.text}>Quantity: </Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value={String(item.Quantity)}
                                            onChangeText={(text) => {
                                                const integerValue = text.replace(/[^0-9]/g, '');
                                                handleQuantityChange(index, integerValue)
                                            }}
                                        />
                                    </View>

                                    {/* Editable Discount */}
                                    <View style={styles.inputRow}>
                                        <Text style={styles.text}>Add. Discount (%): </Text>
                                        <TextInput
                                            style={styles.input}
                                            keyboardType="numeric"
                                            value={String(item.Discount)}
                                            onChangeText={(text) => {
                                                const positiveDecimalValue = text.replace(/[^0-9.]/g, '').replace(/(\..*?)\./g, '$1'); // Remove non-digit and non-period characters
                                                handleDiscountChange(index, positiveDecimalValue)
                                            }}
                                        />
                                    </View>

                                    <Text style={styles.text}>
                                        Total Amount: {item.TotalAmount.toFixed(2)}
                                    </Text>
                                    <Text style={styles.text}>
                                        Total Net Amount: {item.TotalNetAmount.toFixed(2)}
                                    </Text>
                                    <Text style={styles.text}>
                                        AdditionalDisc23_24: {item.AdditionalDisc23_24}
                                    </Text>
                                    <Text style={styles.text}>
                                        AdditionalDisc24_25: {item.AdditionalDisc24_25}
                                    </Text>

                                    <Button
                                        title="Delete"
                                        color="red"
                                        onPress={() => handleDelete(index)}
                                    />
                                </View>
                            )}
                        />
                    )}
                </View>}
            {orderType === "Repeat Order" &&
                <View style={{ flex: 1, marginTop: 0 }}>
                    <FlatList
                        data={tableDataRepeat}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => (
                            <View style={styles.card}>
                                <Checkbox status={item.selected ? "checked" : "unchecked"}
                                    onPress={() => handleCheckboxChangeCards(index)}
                                    color={PrimaryColor} // Optional: Customize the checkbox color
                                />
                                <Text style={styles.bookName}>Title: {item.BookName}</Text>
                                <Text style={styles.label}>Subject: {item.SubjectName}</Text>
                                <Text style={styles.label}>Series: {item.SeriesName}</Text>
                                <Text style={styles.label}>List Price: {item.SalePrice}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text style={[styles.label, { flex: 1 / 2 }]}>Quantity:</Text>
                                    <TextInput
                                        style={[styles.input, { flex: 1 }]}
                                        keyboardType="numeric"
                                        value={item.quantity.toString()}
                                        editable={item.selected}
                                        onChangeText={(value) => {
                                            const integerValue = value.replace(/[^0-9]/g, '');
                                            handleInputChangeCards(index, "quantity", integerValue)
                                        }}
                                    />
                                </View>
                                <Text style={[styles.label, { marginTop: 5 }]}>Standard Discount (%): {item.StdDisc}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                    <Text style={[styles.label, { flex: 1 / 2 }]}>Add.Disc.(%):</Text>
                                    <TextInput
                                        style={styles.input}
                                        keyboardType="numeric"
                                        value={item.additionalDiscount.toString()}
                                        editable={item.selected}
                                        onChangeText={(value) => {
                                            const positiveDecimalValue = value.replace(/[^0-9.]/g, '') // Remove non-digit and non-period characters
                                                .replace(/(\..*?)\./g, '$1'); // Allow only one decimal point
                                            handleInputChangeCards(index, "additionalDiscount", positiveDecimalValue)
                                        }}
                                    />
                                </View>
                                <Text style={[styles.label, { marginTop: 10 }]}>Unit 25-26: {item.Qty25_26 || 0}</Text>
                                <Text style={[styles.label, { margintop: 5 }]}>Additional Disc(%) 25-26: {item.AddDisc25_26 || 0}</Text>
                                <Text style={[styles.label, { margintop: 5 }]}>Unit 24-25: {item.Qty24_25}</Text>
                                <Text style={[styles.label, { margintop: 5 }]}>Additional Disc(%) 24-25: {item.AddDisc24_25}</Text>
                                <Text style={[styles.label, { margintop: 5 }]}>Unit 23-24: {item.Qty23_24}</Text>
                                <Text style={[styles.label, { margintop: 5 }]}>Additional Disc(%) 23-24: {item.AddDisc23_24}</Text>
                            </View>
                        )}
                    />
                </View>
            }
        </View>
    );
};

export default TitlesSales;

const styles = StyleSheet.create({
    header: {
        fontSize: 16,
        color: '#00000095',
        fontWeight: '500',
        marginBottom: 20,
    },
    seriesContainer: {
        height: 280,
        borderWidth: 1,
        borderColor: '#00000030',
        padding: 10,
        marginTop: 20,
        borderRadius: 6,
    },
    pillContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Enable wrapping for rows
        gap: 0,
        marginTop: 20
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
        borderRadius: 10,

    },
    submitText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadButton: {
        backgroundColor: PrimaryColor,
        width: 130,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 20,
    },
    uploadButtonText: {
        color: '#fff',
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
    }, addButton: {
        backgroundColor: "#007bff",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
        marginBottom: 10,
    },
    addButtonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        fontSize: 16,
        color: "#777",
    },
    card: {
        backgroundColor: "#0000",
        padding: 15,
        marginHorizontal: 2,
        marginVertical: 10,
        borderRadius: 15,
        boxShadow: '0 1 4 #00000040'
    },
    text: {
        fontSize: 14,
        marginBottom: 5,
    },
    inputRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 5,
        flex: 1,
        marginLeft: 5,
    },

});
