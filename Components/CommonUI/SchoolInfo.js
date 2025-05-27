import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SchoolInfo = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>🏫 School Details</Text>
    <View style={styles.divider} />
    <Text style={styles.label}>School:</Text>
    <Text style={styles.value}>ABHINAV BHARATI SCHOOL</Text>
    <Text style={styles.label}>Category:</Text>
    <Text style={styles.value}>Non User School</Text>
    <Text style={styles.label}>Phone:</Text>
    <Text style={styles.value}>033-22825215</Text>
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
  label: {
    fontSize: 12,
    color: '#666666',
    marginTop: 10,
  },
  value: {
    fontSize: 12,
    color: '#333333',
  },
});

export default SchoolInfo;