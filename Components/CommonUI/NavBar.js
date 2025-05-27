import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavBar = () => (
  <View style={styles.navBar}>
    <TouchableOpacity style={styles.navButton}>
      <Text style={styles.navButtonText}>🏠</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton}>
      <Text style={styles.navButtonText}>📦</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.navButton}>
      <Text style={styles.navButtonText}>👤</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  navButton: {
    padding: 10,
  },
  navButtonText: {
    fontSize: 16,
  },
});

export default NavBar;