import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const ItemsTab = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      broadSubject: 'Mathematics',
      series: 'Series A',
      title: 'MACMILLAN PICTURE DICTIONARY',
      bookType: 'Hardcover',
      standardDisc: '10%',
      additionalDisc: '5%',
      ad24_25: '5%',
      ad23_24: '5%',
      requestQty: '10',
      approvedQty: '0',
      saleprice: '1097',
      totalAmount: '10970',
      totalNetAmount: '10421.50',
    },
    // Add more items as needed
  ]);

  const handleApprovedQtyChange = (id, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, approvedQty: value } : item
    );
    setItems(updatedItems);
  };

  const handleAdditionalDiscChange = (id, value) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, additionalDisc: value } : item
    );
    setItems(updatedItems);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>📋 Order Items</Text>
      <View style={styles.divider} />

      <ScrollView>
        {items.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* Broad Subject and Series */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>Broad Subject:</Text>
              <Text style={styles.value}>{item.broadSubject}</Text>
              <Text style={styles.label}>Series:</Text>
              <Text style={styles.value}>{item.series}</Text>
            </View>

            {/* Title and BookType */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>Title:</Text>
              <Text style={styles.value}>{item.title}</Text>
              <Text style={styles.label}>BookType:</Text>
              <Text style={styles.value}>{item.bookType}</Text>
            </View>

            {/* Standard Disc and Additional Disc */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>Standard Disc(%):</Text>
              <Text style={styles.value}>{item.standardDisc}</Text>
              <Text style={styles.label}>Additional Disc(%):</Text>
              <TextInput
                style={styles.input}
                value={item.additionalDisc}
                onChangeText={(value) => handleAdditionalDiscChange(item.id, value)}
                keyboardType="numeric"
              />
            </View>

            {/* AD(%) 24-25 and AD(%) 23-24 */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>AD(%) 24-25:</Text>
              <Text style={styles.value}>{item.ad24_25}</Text>
              <Text style={styles.label}>AD(%) 23-24:</Text>
              <Text style={styles.value}>{item.ad23_24}</Text>
            </View>

            {/* Request Qty and Approved Qty */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>Request Qty:</Text>
              <Text style={styles.value}>{item.requestQty}</Text>
              <Text style={styles.label}>Approved Qty:</Text>
              <TextInput
                style={styles.input}
                value={item.approvedQty}
                onChangeText={(value) => handleApprovedQtyChange(item.id, value)}
                keyboardType="numeric"
              />
            </View>

            {/* Saleprice, Total Amount, and Total NetAmount */}
            <View style={styles.cardRow}>
              <Text style={styles.label}>Saleprice:</Text>
              <Text style={styles.value}>{item.saleprice}</Text>
              <Text style={styles.label}>Total Amount:</Text>
              <Text style={styles.value}>{item.totalAmount}</Text>
              <Text style={styles.label}>Total NetAmount:</Text>
              <Text style={styles.value}>{item.totalNetAmount}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    flexWrap: 'wrap', // Allow wrapping for smaller screens
  },
  label: {
    fontSize: 12,
    color: '#666666',
    flex: 1,
    marginRight: 5,
  },
  value: {
    fontSize: 12,
    color: '#333333',
    flex: 1,
  },
  input: {
    fontSize: 12,
    color: '#333333',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    padding: 5,
    flex: 1,
    minWidth: 50, // Ensure input has a minimum width
  },
});

export default ItemsTab;