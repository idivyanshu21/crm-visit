import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import StatusBar from './CommonUI/StatusBar';
import Tabs from './CommonUI/Tabs';
import SchoolInfo from './CommonUI/SchoolInfo';
import SponsorshipWorkshop from './CommonUI/SponsorshipWorkshop';
 
import OrderDetails from './CommonUI/OrderDetails';
import NavBar from './CommonUI/NavBar';
import ValidationTab from './CommonUI/ValidationTab';
import ItemsTab from './CommonUI/ItemsTab';
const Approval = () => {
  const [activeTab, setActiveTab] = useState('school');

  return (
    <View style={styles.container}>
      <StatusBar />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ScrollView style={styles.content}>
        {activeTab === 'school' && <SchoolInfo />}
        {activeTab === 'sponsorship' && <SponsorshipWorkshop />}
  
        {activeTab === 'orders' && <OrderDetails />}
        {activeTab === 'validation' && <ValidationTab />}
        {activeTab === 'items' && <ItemsTab />}
      </ScrollView>
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 15,
  },
});

export default Approval;