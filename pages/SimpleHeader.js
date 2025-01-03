import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SimpleHeader = ({ title, showBackButton = true, children }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar backgroundColor="white" barStyle="dark-content" translucent={true} animated />

      {/* Header */}
      <View style={styles.header}>
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#00000095" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    zIndex: 10,
    elevation: 3,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    paddingTop:30
  },
  headerText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#00000095',
    textAlign: 'center',
    paddingTop:30
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});

export default SimpleHeader;
