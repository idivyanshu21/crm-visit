import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const OrderDetails = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>🏫 School Details</Text>
    <View style={styles.divider} />

    {/* Label and Value in Same Line */}
    <View style={styles.row}>
      <Text style={styles.label}>School:</Text>
      <Text style={styles.value}>ABHINAV BHARATI SCHOOL</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Category:</Text>
      <Text style={styles.value}>Non User School</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.value}>033-22825215</Text>
    </View>
    <View style={styles.divider} />
    <Text style={styles.sectionTitle}>📦 Order Details</Text>
    <View style={styles.divider} />
    <View style={styles.row}>
      <Text style={styles.label}>Order Number:</Text>
      <Text style={styles.value}>300001/OPD/22/2</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Order Date:</Text>
      <Text style={styles.value}>05-03-2025</Text> 
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Order By:</Text>
      <Text style={styles.value}>ARSHAD AHMED</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Order Status:</Text>
      <Text style={[styles.value, { color: '#f5933b' }]}>Pending</Text>
    </View>
    <View style={styles.row}>
      <Text style={styles.label}>Order Copy:</Text>
      <TouchableOpacity style={styles.downloadButton}>
        <Text style={styles.downloadButtonText}>📥 Download Order Copy</Text>
      </TouchableOpacity>
    </View>

 
  </View>
);

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    fontSize: 12,
    color: '#666666',
    marginRight: 10,
    flex: 1, // Ensures the label takes up available space
  },
  value: {
    fontSize: 12,
    color: '#333333',
    flex: 2, // Ensures the value takes up more space
  },
  downloadButton: {
    backgroundColor: '#5c93ce',
    padding: 10,
    borderRadius: 4,
    marginTop: 10,
  },
  downloadButtonText: {
    color: '#ffffff',
    fontSize: 10,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f5f5f5',
    padding: 5,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  tableCell: {
    fontSize: 10,
    color: '#333333',
  },
  tableFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 5,
  },
  tableFooterText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333333',
  },
});
export default OrderDetails;