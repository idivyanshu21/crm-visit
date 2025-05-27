import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Tabs = ({ activeTab, setActiveTab }) => (
  <View style={styles.tabContainer}>
    {/* <TouchableOpacity
      style={[styles.tab, activeTab === 'school' && styles.activeTab]}
      onPress={() => setActiveTab('school')}
    >
      <Text style={styles.tabText}>🏫 School</Text>
    </TouchableOpacity> */}


<TouchableOpacity
      style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
      onPress={() => setActiveTab('orders')}
    >
      <Text style={styles.tabText}>📦 Orders</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'sponsorship' && styles.activeTab]}
      onPress={() => setActiveTab('sponsorship')}
    >
      <Text style={styles.tabText}>💰 Sponsorship/WS</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.tab, activeTab === 'validation' && styles.activeTab]}
      onPress={() => setActiveTab('validation')}
    >
      <Text style={styles.tabText}>✅ Validation</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.tab, activeTab === 'items' && styles.activeTab]}
      onPress={() => setActiveTab('items')}
    >
      <Text style={styles.tabText}>📋 Items</Text>
    </TouchableOpacity>

    {/* <TouchableOpacity
      style={[styles.tab, activeTab === 'enrollment' && styles.activeTab]}
      onPress={() => setActiveTab('enrollment')}
    >
      <Text style={styles.tabText}>📚 Enrollment</Text>
    </TouchableOpacity>
   */}
  </View>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
  },
  tab: {
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#5c93ce',
  },
  tabText: {
    fontSize: 12,
    color: '#333333',
  },
});

export default Tabs;