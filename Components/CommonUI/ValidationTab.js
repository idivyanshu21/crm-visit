import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ValidationTab = () => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>✅ Validation</Text>
    <View style={styles.divider} />

    
    {/* Validation Text */}
    <Text style={styles.validationText}>
      Your validation has been successfully completed. Please ensure all details are correct.
    </Text>
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
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  validationText: {
    fontSize: 12,
    color: '#333333',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ValidationTab;