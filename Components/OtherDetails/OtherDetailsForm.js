import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TextInput, Button, DefaultTheme } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as DocumentPicker from "expo-document-picker";
import { MaterialIcons } from "@expo/vector-icons";
import useSessionDetails from "../../Contexts/sessionDetails";
import { PrimaryColor, PrimaryColorLight2, PrimaryColorLight3 } from "../../globalCSS";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import IOSPicker from "../IOSPicker";

const OrderDetailsForm = ({ formData, setFormData, tabID, isFileUploaded,setIsFileUploaded }) => {
  const [file, setFile] = useState('')
  const [fileDetails,setFileDetails]=useState({})
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const sessionDetails = useSessionDetails()
  const [reason, setReason] = useState()

  const validateForm = () => {
    let newErrors = {};
    if (!formData.poNumber) {
      newErrors.poNumber = "PO Number is required";
    }
    if (!formData.orderReason) {
      newErrors.orderReason = "Order reason is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const fetchCustomerDetails = async (billTo) => {
    try {
      // Construct the URL with query parameters
      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: "GetOrderReason",
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
      setReason(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCustomerDetails()
  }, [sessionDetails])

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.deliveryDate;
    setShowDatePicker(false);
    setFormData({ ...formData, deliveryDate: currentDate });
  };

  const handleFileUpload = async () => {
    try {
      console.log("executed")
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", // MIME type for .msg files
      });
      console.log(result)

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedFile = result.assets[0]; // Access the first file in the assets array
        const fileExtension = selectedFile.name.split('.').pop().toLowerCase();

        if (fileExtension !== "msg") {
          alert("Please upload a valid .msg file.");
          return; // Stop further processing if the file is not .msg
        }
        // Read the file contents as Base64
        const base64Content = await FileSystem.readAsStringAsync(selectedFile.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
        setFileDetails(selectedFile)
        setFile(base64Content);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload the file. Please try again.");
    }
  };
  useEffect(() => {
    if (file && fileDetails) {
      const uploadFile = async () => {
        try {
          const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_UploadFiles";
          const body = {
            UserID: sessionDetails.UserID,
            iCompanyID: sessionDetails.iCompanyID,
            TabID: Number(tabID),
            FileName: fileDetails.name,
            FileExtension: ".msg",
            FileBase64: file,
          };
  
          const response = await axios.post(baseUrl, body, {// Send the params as query parameters
            headers: {
              "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
            },
          });
          
          const data = response.data;
          console.log(":", data);
          if(data[0]?.Result){
          alert(data[0]?.Result);
          setIsFileUploaded(true)
        }
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      };
      
      uploadFile();
    }
  }, [file, fileDetails]);
  

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form Submitted Successfully: " + JSON.stringify(formData));
    } else {
      alert("Please correct the errors and try again.");
    }
  };
  const date = new Date()
  return (
    <View style={styles.container}>
      {/* File Upload */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleFileUpload}
      >
        <Text style={styles.uploadText}>
          {formData.file ? "File Uploaded" : "+ Upload Order Copy *"}
        </Text>
      </TouchableOpacity>
      
      {fileDetails && <Text style={{marginBottom:10}}>{fileDetails.name}</Text>}

      <TextInput
        label="Order Remarks"
        mode="outlined"
        style={styles.input}
        value={formData.orderRemarks}
        onChangeText={(text) =>
          setFormData({ ...formData, orderRemarks: text })
        }
        theme={{
          roundness: 11,
          colors: {
            ...DefaultTheme.colors,
            primary: PrimaryColor,
            outline: "#00000020",
          },
        }}
      />

      {/* PO Number */}
      <TextInput
        label="PO Number*"
        mode="outlined"
        style={styles.input}
        value={formData.poNumber}
        onChangeText={(text) =>
          setFormData({ ...formData, poNumber: text })
        }
        theme={{
          roundness: 11,
          colors: {
            ...DefaultTheme.colors,
            primary: PrimaryColor,
            outline: "#00000020",
          },
        }}
        error={!!errors.poNumber}
      />
      {!!errors.poNumber && (
        <Text style={styles.errorText}>{errors.poNumber}</Text>
      )}

      {/* Required Delivery Date */}
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => setShowDatePicker(true)}
      >
        <TextInput
          label="Required Delivery Date"
          mode="outlined"
          style={[styles.input, { width: "100%" }]}
          value={formData.deliveryDate ? formData?.deliveryDate?.toISOString().split("T")[0] : ""}
          editable={false}
          theme={{
            roundness: 11,
            colors: {
              ...DefaultTheme.colors,
              primary: PrimaryColor,
              outline: "#00000020",
            },
          }}
        />
        <MaterialIcons
          name="calendar-today"
          size={24}
          color={PrimaryColor}
          style={styles.icon}
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={formData.deliveryDate ? formData.deliveryDate : date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Order Reason */}
      {/* <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.orderReason}
          onValueChange={(value) =>
            setFormData({ ...formData, orderReason: value })
          }
          style={styles.picker}
        >
          <Picker.Item label="Select Order Reason" value="" />
          {reason && reason.map((option, index) => (
            // {console.log(option)}
            <Picker.Item key={index} label={option.Text_t} value={option.Value_v} />
          ))}
        </Picker>
      </View> */}
      <IOSPicker
        selectedValue={formData.orderReason}
        onValueChange={(value) =>
          setFormData({ ...formData, orderReason: value })
        }
        data={[
          { label: "Select Order Reason", value: "" }, // Placeholder
          ...(reason?.map((option) => ({
            label: option.Text_t,
            value: option.Value_v,
          })) || []),
        ]}
        placeholder="Select Order Reason"
        style={styles.picker}
      />

      {!!errors.orderReason && (
        <Text style={styles.errorText}>{errors.orderReason}</Text>
      )}

      {/* Transporter Name */}
      <TextInput
        label="Transporter Name"
        mode="outlined"
        style={styles.input}
        value={formData.transporterName}
        onChangeText={(text) =>
          setFormData({ ...formData, transporterName: text })
        }
        theme={{
          roundness: 11,
          colors: {
            ...DefaultTheme.colors,
            primary: PrimaryColor,
            outline: "#00000020",
          },
        }}
      />

      {/* Packing/Shipping Instructions */}
      {formData.shippingInstructions.map((instruction, index) => (
        <TextInput
          key={index}
          label={`Packing/Shipping Instructions ${index + 1}`}
          mode="outlined"
          style={styles.input}
          value={instruction}
          onChangeText={(text) => {
            const updatedInstructions = [...formData.shippingInstructions];
            updatedInstructions[index] = text;
            setFormData({ ...formData, shippingInstructions: updatedInstructions });
          }}
          theme={{
            roundness: 11,
            colors: {
              ...DefaultTheme.colors,
              primary: PrimaryColor,
              outline: "#00000020",
            },
          }}
        />
      ))}

      {/* Bundle Remarks */}
      <TextInput
        label="Bundle Remarks"
        mode="outlined"
        style={styles.input}
        value={formData.bundleRemarks}
        onChangeText={(text) =>
          setFormData({ ...formData, bundleRemarks: text })
        }
        theme={{
          roundness: 11,
          colors: {
            ...DefaultTheme.colors,
            primary: PrimaryColor,
            outline: "#00000020",
          },
        }}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minWidth: "100%",
    maxHeight: 720
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#00000020",
    borderRadius: 11,
    overflow: "hidden",
    marginBottom: 20,
  },
  picker: {
    height: 50,
  },
  icon: {
    position: "absolute",
    right: 10,
    top: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButton: {
    marginBottom: 5,
    padding: 10,
    backgroundColor: PrimaryColor,
    borderRadius: 12,
    alignItems: "center",
  },
  uploadText: {
    color: "#f1f1f1",
  },
  button: {
    borderRadius: 10,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default OrderDetailsForm;
