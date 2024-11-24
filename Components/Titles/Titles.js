import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Modal } from 'react-native';
import globalStyles, { PrimaryColor, PrimaryColorLight } from '../../globalCSS';
import * as DocumentPicker from 'expo-document-picker';

const Titles = () => {
    const [title, setTitle] = useState("Title in Series");
    const titleOptions = ['Title in Series', 'Title not in Series'];
    const [classType, setClassType] = useState("Class Level");
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // Simplified Class Levels Array
    const classLevels = ['All', 'Pre Primary', 'Primary', 'Middle', 'Secondary', 'Sr. Secondary'];
    const classNum = ['All', 'Nry', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    // State to Manage Selected Options
    const [selectedLevels, setSelectedLevels] = useState([]);

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

    // Handle Checkbox Change
    const handleCheckboxChange = (level) => {
        const currentArray = classType === 'Class Level' ? classLevels : classNum;

        if (level === 'All') {
            // Toggle All: Select or Deselect All Options
            const allSelected = selectedLevels.length === currentArray.length - 1;
            setSelectedLevels(allSelected ? [] : [...currentArray.slice(1)]);
        } else {
            // Toggle Specific Option
            const updatedLevels = selectedLevels.includes(level)
                ? selectedLevels.filter(option => option !== level)
                : [...selectedLevels, level];

            // Automatically handle "All" based on other selections
            const areAllSelected = currentArray.slice(1).every(option => updatedLevels.includes(option));
            setSelectedLevels(areAllSelected ? [...currentArray.slice(1)] : updatedLevels);
        }
    };
    return (
        <View style={{ width: '95%' }}>
            <Text style={styles.header}>Orders Process</Text>
            <View style={globalStyles.radioContainer}>
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
                <View style={[styles.seriesContainer, classType === 'Class Number' ? { height: 250 } : { height: 200 }]}>
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
                    <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Text style={styles.uploadButtonText}>Upload Titles</Text>
                    </TouchableOpacity>
                    <Text style={{fontSize:12,width:'55%'}}>
                            Note: BookCode, Quantity, AddDisc are required columns in the Excel file.
                    </Text>
                    </View>
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
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Titles;

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
    },
});
