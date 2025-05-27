import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SponsorshipWorkshop = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>💰 Sponsorship</Text>
    <View style={styles.divider} />
    <Text style={styles.value}>2025: Rs.127000.00</Text>
    <Text style={styles.value}>2024: Rs.0.00</Text>
    <Text style={styles.value}>2023: Rs.0.00</Text>

    <Text style={[styles.sectionTitle, { marginTop: 20 }]}>🔧 Workshop</Text>
    <View style={styles.divider} />
    <Text style={styles.value}>2025: Workshop 2 and Approved Budget Rs.74999.99</Text>
    <Text style={styles.value}>2024: Workshop 0 and Approved Budget Rs.0.00</Text>
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
  value: {
    fontSize: 12,
    color: '#333333',
  },
});

export default SponsorshipWorkshop;