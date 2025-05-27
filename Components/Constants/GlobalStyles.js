import { StyleSheet } from 'react-native';
import React from 'react'
var {Platform} = React;
export var colorBase = '#6200ee'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    statusBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 10,
      backgroundColor: '#ffffff',
    },
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
    content: {
      flex: 1,
      padding: 15,
    },
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