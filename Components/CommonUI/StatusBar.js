import React from 'react';
import { View, StyleSheet } from 'react-native';

const StatusBar = () => (
  <View style={styles.statusBar}>
    <View style={styles.statusIcon} />
    <View style={styles.statusIcons}>
      <View style={styles.signalIcon} />
      <View style={styles.wifiIcon} />
      <View style={styles.batteryIcon} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  statusIcon: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#333',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  signalIcon: {
    width: 15,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#333',
  },
  wifiIcon: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
  batteryIcon: {
    width: 40,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#333',
  },
});

export default StatusBar;