import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";

// Location Data (Single Object)
const locationData = {
  India: {
    states: {
      Maharashtra: ["Mumbai", "Pune", "Nagpur"],
      Delhi: ["New Delhi", "Dwarka"],
    },
  },
  USA: {
    states: {
      California: ["Los Angeles", "San Francisco"],
      Texas: ["Houston", "Dallas"],
    },
  },
};

const AddressForm = () => {
  const [formData, setFormData] = useState({
    country: "",
    state: "",
    city: "",
    name: "",
    phone: "",
    address1: "",
    address2: "",
    address3: "",
    pinCode: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const countries = Object.keys(locationData).map((key) => ({ id: key, name: key }));

  const handleCountryChange = (item) => {
    setFormData((prev) => ({
      ...prev,
      country: item.name,
      state: "",
      city: "",
    }));
    const stateKeys = Object.keys(locationData[item.name]?.states || {});
    setStates(stateKeys.map((key) => ({ id: key, name: key })));
    setCities([]);
  };

  const handleStateChange = (item) => {
    setFormData((prev) => ({
      ...prev,
      state: item.name,
      city: "",
    }));
    const cityList = locationData[formData.country]?.states[item.name] || [];
    setCities(cityList.map((city) => ({ id: city, name: city })));
  };

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <View contentContainerStyle={styles.container}>
      {/* Country Dropdown */}
      <Text style={styles.label}>Country:</Text>
      <SearchableDropdown
        onItemSelect={(item) => handleCountryChange(item)}
        items={countries}
        defaultIndex={-1}
        placeholder="--Select Country--"
        resetValue={false}
        textInputStyle={styles.textInput}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
      />

      {/* State Dropdown */}
      <Text style={styles.label}>State:</Text>
      <SearchableDropdown
        onItemSelect={(item) => handleStateChange(item)}
        items={states}
        defaultIndex={-1}
        placeholder="--Select State--"
        resetValue={false}
        textInputStyle={styles.textInput}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
        disabled={!states.length}
      />

      {/* City Dropdown */}
      <Text style={styles.label}>City:</Text>
      <SearchableDropdown
        onItemSelect={(item) => handleInputChange("city", item.name)}
        items={cities}
        defaultIndex={-1}
        placeholder="--Select City--"
        resetValue={false}
        textInputStyle={styles.textInput}
        itemStyle={styles.item}
        itemTextStyle={styles.itemText}
        disabled={!cities.length}
      />

      {/* Other Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Name"
        value={formData.name}
        onChangeText={(text) => handleInputChange("name", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Phone No."
        keyboardType="phone-pad"
        value={formData.phone}
        onChangeText={(text) => handleInputChange("phone", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address 1"
        value={formData.address1}
        onChangeText={(text) => handleInputChange("address1", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address 2"
        value={formData.address2}
        onChangeText={(text) => handleInputChange("address2", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Address 3"
        value={formData.address3}
        onChangeText={(text) => handleInputChange("address3", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Pincode"
        keyboardType="numeric"
        value={formData.pinCode}
        onChangeText={(text) => handleInputChange("pinCode", text)}
      />

      {/* Debug: Show Form Data */}
      {/* <Text style={styles.debugText}>Form Data: {JSON.stringify(formData, null, 2)}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    margin:2,
    borderRadius:6,
    boxShadow:'0px 1px 3px #00000030'
  },
  label: {
    fontSize: 16,
    color:'#00000090',
    marginBottom: 5,
  },
  textInput: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemText: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  debugText: {
    marginTop: 20,
    fontSize: 12,
    fontStyle: "italic",
    color: "#555",
  },
});

export default AddressForm;
