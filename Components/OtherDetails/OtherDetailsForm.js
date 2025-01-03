import React, { useState } from "react";
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

const PrimaryColor = "#6200EE"; // Customize your primary color here

const OrderDetailsForm = () => {
  const [formData, setFormData] = useState({
    poNumber: "",
    deliveryDate: new Date(),
    orderReason: "",
    transporterName: "",
    shippingInstructions: ["", "", ""],
    bundleRemarks: "",
    orderRemarks: "",
    file: null,
  });

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

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

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.deliveryDate;
    setShowDatePicker(false);
    setFormData({ ...formData, deliveryDate: currentDate });
  };

  const handleFileUpload = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/octet-stream",
    });
    if (result.type === "success") {
      setFormData({ ...formData, file: result });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert("Form Submitted Successfully: " + JSON.stringify(formData));
    } else {
      alert("Please correct the errors and try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* File Upload */}
      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleFileUpload}
      >
        <Text style={styles.uploadText}>
          {formData.file ? "File Uploaded" : "+ Upload Order Copy"}
        </Text>
      </TouchableOpacity>

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
          style={styles.input}
          value={formData.deliveryDate.toISOString().split("T")[0]}
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
          value={formData.deliveryDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Order Reason */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={formData.orderReason}
          onValueChange={(value) =>
            setFormData({ ...formData, orderReason: value })
          }
          style={styles.picker}
        >
          <Picker.Item label="-- Select Order Reason --" value="" />
          <Picker.Item label="Reason 1" value="Reason 1" />
          <Picker.Item label="Reason 2" value="Reason 2" />
        </Picker>
      </View>
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

      {/* Order Remarks */}
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

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.button}
        theme={{ colors: { primary: PrimaryColor } }}
      >
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    minWidth:"100%"
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
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    alignItems: "center",
  },
  uploadText: {
    color: "#555",
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
