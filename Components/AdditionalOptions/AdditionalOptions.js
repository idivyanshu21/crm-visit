import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const DropdownForm = () => {
  const [invoiceYear, setInvoiceYear] = useState('');
  const [invoiceMonth, setInvoiceMonth] = useState('');
  const [sampleYear, setSampleYear] = useState('');
  const [sampleMonth, setSampleMonth] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Invoice Year</Text>
        <Picker
          selectedValue={invoiceYear}
          style={styles.dropdown}
          onValueChange={(itemValue) => setInvoiceYear(itemValue)}>
          <Picker.Item label="--Year--" value="" />
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Invoice Month</Text>
        <Picker
          selectedValue={invoiceMonth}
          style={styles.dropdown}
          onValueChange={(itemValue) => setInvoiceMonth(itemValue)}>
          <Picker.Item label="--Month--" value="" />
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="March" value="March" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sample Year</Text>
        <Picker
          selectedValue={sampleYear}
          style={styles.dropdown}
          onValueChange={(itemValue) => setSampleYear(itemValue)}>
          <Picker.Item label="--Year--" value="" />
          <Picker.Item label="2022" value="2022" />
          <Picker.Item label="2023" value="2023" />
          <Picker.Item label="2024" value="2024" />
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sample Month</Text>
        <Picker
          selectedValue={sampleMonth}
          style={styles.dropdown}
          onValueChange={(itemValue) => setSampleMonth(itemValue)}>
          <Picker.Item label="--Month--" value="" />
          <Picker.Item label="January" value="January" />
          <Picker.Item label="February" value="February" />
          <Picker.Item label="March" value="March" />
        </Picker>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  formGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  dropdown: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
  },
});

export default DropdownForm;
