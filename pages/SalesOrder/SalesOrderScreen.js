import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {Picker} from '@react-native-picker/picker'
import globalStyles from "../../globalCSS";

const SalesOrderScreen = () => {
    const [selectedOption, setSelectedOption] = useState("School");
    const [dropdownValue, setDropdownValue] = useState("");
    const [orderType, setOrderType]=useState("New Order");
    const dropdownOptions = {
        School: ["School Option 1", "School Option 2", "School Option 3"],
        Trade: ["Trade Option 1", "Trade Option 2", "Trade Option 3"],
        "Govt. Dept.": ["Govt. Dept. Option 1", "Govt. Dept. Option 2", "Govt. Dept. Option 3"],
    };

    return (<>
        <View style={globalStyles.container}>
            <View style={globalStyles.step}>
            <Text style={[globalStyles.heading , globalStyles.primaryText]}>ORDER</Text>
            {/* Radio Buttons */}
            <View style={styles.radioContainer}>
                {["School", "Trade", "Govt. Dept."].map((option) => (
                    <TouchableOpacity
                        key={option}
                        style={styles.radioButton}
                        onPress={() => setSelectedOption(option)}
                    >
                        <View style={[
                                selectedOption === option && styles.radioBorder,
                            ]}>
                        <View
                            style={[
                                selectedOption === option? styles.radioSelected : styles.radioCircle,,
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
            <Text style={[globalStyles.heading , globalStyles.primaryText]}>ORDER TYPE</Text>
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={dropdownValue}
                    onValueChange={(itemValue) => setDropdownValue(itemValue)}
                    style={styles.picker}
                >
                    {dropdownOptions[selectedOption].map((option, index) => (
                        <Picker.Item key={index} label={option} value={option} />
                    ))}
                </Picker>
            </View>
            </View>
        {/* Radio Buttons */}
        <View style={{width:'100%', paddingTop:20,}}>
        <View style={styles.radioContainer}>
            {["New Order", "Repeat Order"].map((option) => (
                <TouchableOpacity
                    key={option}
                    style={styles.radioButton}
                    onPress={() => setOrderType(option)}
                >
                    <View style={[
                            orderType === option && styles.radioBorder,
                        ]}>
                    <View
                        style={[
                            orderType === option? styles.radioSelected : styles.radioCircle,,
                        ]}
                    />
                    </View>
                    <Text style={styles.radioText}>{option}</Text>
                </TouchableOpacity>
            ))}
        </View>
        </View>
    </View>
    </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop:10,
        paddingHorizontal: 15,
    },
    step:{
        backgroundColor:'white',
        flexDirection:'column',
        alignItems:'center',
        width:'100%',
        padding:10,
        paddingBottom:20,
        margin:10,
        borderRadius:10,
        boxShadow:'0px 2px 5px #00000020'
    },
    radioContainer: {
        flexDirection: "row",
        width:'100%',
        gap:20
        
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
        padding:2,
        width: 16,
        height: 16,
        borderRadius:10,
        borderRadius: 10,
        borderColor: "#00000060",
        borderWidth: 1,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white',
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
        height:40,
        width: "95%",
        borderWidth: 1,
        borderColor: "#00000040",
        backgroundColor:'white',
        borderRadius: 8,
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        overflow: "hidden",
    },
    picker: {
        width: "100%",
        marginTop:-8,
    },
});

export default SalesOrderScreen;
