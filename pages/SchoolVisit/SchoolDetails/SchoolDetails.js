import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Dummy data for additional details
const additionalDetailsData = {
  previousSponsorship: {
    2024: "Rs.0.00",
    2023: "Rs.0.00",
    2022: "Rs.0.00",
  },
  previousWorkshops: {
    2024: "Workshop 0 and Approved Budget Rs.0",
    2023: "Workshop 0 and Approved Budget Rs.0",
    2022: "Workshop 0 and Approved Budget Rs.0",
  },
  recentSalesVisits: [
    "26/11/2024 : Visit By Ajay Kumar",
    "26/11/2024 : Visit By Ajay Kumar",
    "26/11/2024 : Visit By Ajay Kumar",
  ],
  recentManagerVisits: ["26/11/2024 : Visit By Ashish Singh"],
};

const SchoolDetails = ({ details }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };
  
  const {
    sapcode = "Select School",
    SchoolName="Select School",
    schooladdress = "Select School",
    Phone = "Select School",
    MainContactPerson="Select School",
    category='Select School',
  } = details || {};

  const additionalDetails = (
    <>
      <Text style={styles.detail}>
        <Text style={styles.label}>Category:</Text> {category}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Previous Recent Sponsorship:</Text>
        {"\n"}2024: {additionalDetailsData.previousSponsorship[2024]}
        {"\n"}2023: {additionalDetailsData.previousSponsorship[2023]}
        {"\n"}2022: {additionalDetailsData.previousSponsorship[2022]}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Previous Recent Workshops:</Text>
        {"\n"}2024: {additionalDetailsData.previousWorkshops[2024]}
        {"\n"}2023: {additionalDetailsData.previousWorkshops[2023]}
        {"\n"}2022: {additionalDetailsData.previousWorkshops[2022]}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Recent Sales Executive Visits:</Text>
        {additionalDetailsData.recentSalesVisits.map((visit, index) => (
          <Text key={index}>{"\n"}{visit}</Text>
        ))}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.label}>Recent Manager Visits:</Text>
        {additionalDetailsData.recentManagerVisits.map((visit, index) => (
          <Text key={index}>{"\n"}{visit}</Text>
        ))}
      </Text>
    </>
  );

  return (
    <View style={styles.card}>
      {true ? (
        <>
        <Text style={styles.detail}>
            <Text style={styles.label}>School Name:</Text> {SchoolName}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>SAP Code:</Text> {sapcode}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Address:</Text> {schooladdress}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Phone:</Text> {Phone}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Main Contact Person:</Text> {MainContactPerson}
          </Text>

          {showMore && additionalDetails}

          <TouchableOpacity onPress={toggleShowMore}>
            <Text style={styles.viewMore}>
              {showMore ? "View Less" : "View More"}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={{ textAlign: "center" }}>Please Select School</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 24,
    margin: 5,
    boxShadow: "0px 1px 2px #00000030",
  },
  detail: {
    fontSize: 14,
    marginBottom: 8,
    color: "#555",
  },
  label: {
    fontWeight: "bold",
  },
  viewMore: {
    color: "blue",
    marginTop: 10,
    textAlign: "center",
    textDecorationLine: "underline",
  },
});

export default SchoolDetails;
