import React, { useEffect, useState } from "react";
import BG from "../../assets/Images/schoolvisitbg.jpg";
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import AnimatedHeader from "../AnimatedHeader";
import globalStyles, {
  PrimaryColor,
  PrimaryColorLight,
  PrimaryColorLight3,
} from "../../globalCSS";
import { GetSponsorshipPhotoValidationData } from "../../API/APIConfig";

const testData = [
  {
    requestNumber: "300001/SPR/525/2",
    executiveName: "Suman Goswami",
    requestDate: "03/05/2025",
    schoolName: "AJB PUBLIC SCHOOL(SCH60186)",
    sapCode: "",
    address: "3,RIPON STREET",
    cityState: "CALCUTTA(West Bengal)",
    amount: 50000,
    eventDate: "04/05/2025",
  },
];

const sponsorshipDetails = [
  { "Request Number": "300001/SPR/525/2" },
  { "Executive Name": "Suman Goswami" },
  { "VP/AVP": "Ashes Saha" },
  { "Sales Office": "MPIL-CALCUTTA" },
  { "Region Name": "MIL Eastern Region 1" },
  { "Request Date": "03/05/2025" },
  { "Recipient Request Date": "03/05/2025" },
  { "Event Date": "04/05/2025" },
  { "Request Letter": "View" },
  { "Pan Card": "View" },
  { "Sponsorship Type": "SchoolEvent" },
  { "Requested Sponsorship Amount": "50000" },
  {
    Description:
      "A book is a medium for recording information in the form of writing or images. Modern books are typically in codex format...",
  },
  { "Payee Name": "Neha" },
  { "Payment Mode": "Cheque" },
  { "Payment Date": "" },
  { "Photo Upload Date": "22/05/2025" },
];

const schoolBasicDetails = [
  { "Previous Recent Visit": ["06/02/2025 : Visit By ARSHAD AHMED"] },
  {
    "Recent Sales Executive Visits": [
      "06/02/2025 : Visit By ARSHAD AHMED",
      "19/11/2024 : Visit By ARSHAD AHMED",
    ],
  },
  { "Recent Manager Visit": [] },
  { "Recent EPM Visit": [] },
  {
    "Previous Recent Sponsorship": [
      "2025 : Rs.50000.00",
      "2024 : Rs.0.00",
      "2023 : Rs.0.00",
    ],
  },
  {
    "Previous Recent Workshop": [
      "2025 : Workshop 1 and Approved Budget Rs.50000.00",
      "2024 : Workshop 0 and Approved Budget Rs.0.00",
      "2023 : Workshop 0 and Approved Budget Rs.0.00",
    ],
  },
  { "Previous Recent AD": ["2025 : 0.00 %", "2024 : 6.03 %", "2023 : 0.00 %"] },
  { "Previous Recent PO": [] },
  { "Previous Recent PD": [] },
];

const businessDetails = [
  { "Business Value (2025)": "0" },
  { "Estimated Business": "100" },
  { "Pipeline Value (2025)": "376975" },
  { "Pipeline Value (2026)": "0" },
  { PipelineToCheck: "376975" },
  { "Adoption Value (Current Year)": "0" },
  { "Adoption Value (Last Year)": "272404" },
  { "Existing Discount": "0" },
  { "Supply Mode": "Direct" },
];

const validationData = [
  {
    type: "Requested By",
    name: "Suman Goswami",
    role: "Branch Manager",
    date: "03/05/2025",
    amount: 50000,
    remark:
      "A book is a medium for recording information in the form of writing or images.",
  },
  {
    type: "Validated By",
    name: "Arshad",
    role: "VP/AVP",
    date: "03/05/2025",
    amount: 50000,
    remark: "testing",
  },
];

const photoValidationData = [
  {
    type: "Validated By",
    name: "Arshad",
    role: "VP/AVP",
    date: "03/05/2025",
    remark: "testing",
  },
];

const SponsorshipPhotoValidate = () => {
  const [selectedOption, setSelectedOption] = useState(
    "Sponsorship Photo Upload Validation"
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [visible, setVisible] = useState(false);
  const [imageType, setImageType] = useState("");

  const showImage = (type) => {
    setImageType(type);
    setVisible(true);
  };

  const closeImage = () => {
    setVisible(false);
    setImageType("");
  };

  const imageSources = {
    pan: require("../../assets/icon.png"),
    letter: require("../../assets/splash-icon.png"),
  };

  useEffect(() => {
    const fetchSponsorshipData = async () => {
      await GetSponsorshipPhotoValidationData("GetSponsorshipPhotoUploadValidation",779)
        .then((res) => {
          console.log("Sponsorship Data:", res);
        })
        .catch((err) => {
          console.error("Error fetching sponsorship data:", err);
        });
    };
    fetchSponsorshipData();
  }, []);

  return (
    <AnimatedHeader title="Sponsorship">
      {/* Background Image */}
      <Image
        source={BG}
        style={[
          styles.backgroundImage,
          Platform.OS === "ios" && {
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          },
        ]}
      />
      <View style={styles.dropdownContainer}>
        <View style={styles.radioContainer}>
          {[
            // "Sponsorship Request",
            // "Sponsorship Validation",
            "Sponsorship Photo Upload Validation",
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={globalStyles.radioButton}
              onPress={() => {
                setSelectedOption(item);
              }}
            >
              <Text
                style={[
                  styles.radioText,
                  selectedOption === item && styles.active,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
          ;
        </View>
      </View>
      <View style={styles.card2}>
        <Text style={styles.cardText}>Sponsorship Photo Upload Validation</Text>
      </View>
      {!selectedItem ? (
        <ScrollView horizontal style={styles.card}>
          <View>
            {/* Table Header */}
            <View style={[styles.row, styles.header]}>
              <Text style={styles.cell}>Request Number</Text>
              <Text style={styles.cell}>Executive Name</Text>
              <Text style={styles.cell}>Request Date</Text>
              <Text style={styles.cell}>School Name(Code)</Text>
              <Text style={styles.cell}>SAP Code</Text>
              <Text style={styles.cell}>Address</Text>
              <Text style={styles.cell}>City(State)</Text>
              <Text style={styles.cell}>Amount</Text>
              <Text style={styles.cell}>Event Date</Text>
            </View>

            {/* Table Body */}
            {testData.map((item, index) => (
              <View key={index} style={styles.row}>
                <TouchableOpacity onPress={() => setSelectedItem(item)}>
                  <Text style={[styles.cell, styles.link]}>
                    {item.requestNumber}
                  </Text>
                </TouchableOpacity>
                <Text style={styles.cell}>{item.executiveName}</Text>
                <Text style={styles.cell}>{item.requestDate}</Text>
                <Text style={styles.cell}>{item.schoolName}</Text>
                <Text style={styles.cell}>{item.sapCode}</Text>
                <Text style={styles.cell}>{item.address}</Text>
                <Text style={styles.cell}>{item.cityState}</Text>
                <Text style={styles.cell}>{item.amount}</Text>
                <Text style={styles.cell}>{item.eventDate}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <>
          {/* School Details */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>School Details</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
              <View style={styles.row2}>
                <Text style={styles.label}>School</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>
                  <Text style={{ fontWeight: "bold" }}>
                    AJB PUBLIC SCHOOL (SCH60186) ,3,RIPON STREET
                  </Text>
                </Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Category</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>Non User School</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>033 -22846352</Text>
              </View>
            </View>
          </View>
          {/* Enrollment */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Enrollment</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
              <View style={styles.row2}>
                <Text style={styles.label}>Class Nry</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>26</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Class LKG </Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>26</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Class UKG </Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>26</Text>
              </View>
            </View>
          </View>
          {/* Sales Stage */}
          <View style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Sales Stages</Text>
            </View>
            <View style={{ paddingHorizontal: 15, marginBottom: 10 }}>
              <View style={styles.row2}>
                <Text style={styles.label}>Initial Visit</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>Yes</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Workshop</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>Yes</Text>
              </View>

              <View style={styles.row2}>
                <Text style={styles.label}>Sponsorship</Text>
                <Text style={styles.separator}>:</Text>
                <Text style={styles.value}>Yes</Text>
              </View>
            </View>
          </View>
          {/* Sponsorship Details */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Sponsorship Details</Text>
            </View>
            <View style={styles.container}>
              {sponsorshipDetails.map((item, index) => {
                const key = Object.keys(item)[0];
                const value = item[key];
                const isLink =
                  (key === "Request Letter" || key === "Pan Card") &&
                  value === "View";
                const onPress =
                  key === "Request Letter"
                    ? () => showImage("letter")
                    : () => showImage("pan");

                return (
                  <View key={index} style={styles.row2}>
                    <Text style={styles.label}>{key}</Text>
                    <Text style={styles.separator}>:</Text>
                    {isLink ? (
                      <TouchableOpacity onPress={onPress} style={styles.link2}>
                        <Text style={{ color: "#007BFF" }}>{value}</Text>
                      </TouchableOpacity>
                    ) : (
                      <Text style={styles.value2}>{value}</Text>
                    )}
                  </View>
                );
              })}
            </View>

            <Modal visible={visible} transparent animationType="fade">
              <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={closeImage}>
                    <Text style={styles.closeText}>Close</Text>
                  </TouchableOpacity>
                  <Image
                    source={imageSources[imageType]}
                    style={{ width: 300, height: 400, resizeMode: "contain" }}
                  />
                </View>
              </View>
            </Modal>
          </ScrollView>
          {/* School Basic Details */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>School Basic Details</Text>
            </View>
            <View style={styles.container}>
              {schoolBasicDetails.map((item, index) => {
                const key = Object.keys(item)[0];
                const value = item[key];

                return (
                  <View key={index} style={styles.row2}>
                    <Text style={{ ...styles.label, fontSize: 12 }}>{key}</Text>
                    <Text style={styles.separator}>:</Text>
                    <View>
                      {Array.isArray(value) &&
                        (value.length === 0 ? (
                          <Text style={styles.value3}></Text>
                        ) : (
                          value.map((val, idx) => (
                            <Text key={idx} style={styles.value3}>
                              {val}
                            </Text>
                          ))
                        ))}
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
          {/* Business Details */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Business Details</Text>
            </View>
            <View style={styles.container}>
              {businessDetails.map((item, index) => {
                const key = Object.keys(item)[0];
                const value = item[key];

                return (
                  <View key={index} style={styles.row2}>
                    <Text style={{ ...styles.label, minWidth: 70 }}>{key}</Text>
                    <Text style={styles.separator}>:</Text>
                    <Text style={styles.value3}>{value}</Text>
                  </View>
                );
              })}
              <View style={styles.row2}>
                <Text style={{ ...styles.label, minWidth: 50 }}>Remarks</Text>
                <Text style={styles.separator}>:</Text>
                <TextInput
                  style={styles.inputRemarks}
                  placeholder="Please Enter Remarks"
                  placeholderTextColor="#aaa"
                  multiline
                  numberOfLines={3}
                />
              </View>
            </View>
          </ScrollView>
          {/* Validation Details */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Validation Details</Text>
            </View>
            <ScrollView horizontal style={{ margin: 10, marginRight: 0 }}>
              <View>
                {/* Table Header */}
                <View style={[styles.row, styles.header]}>
                  <Text style={styles.cell}>Type</Text>
                  <Text style={styles.cell}>Name</Text>
                  <Text style={styles.cell}>Role</Text>
                  <Text style={styles.cell}>Date</Text>
                  <Text style={styles.cell}>Amount</Text>
                  <Text style={{ ...styles.cell, width: 300 }}>Remark</Text>
                </View>

                {/* Table Body */}
                {validationData.map((item, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{item.type}</Text>
                    <Text style={styles.cell}>{item.name}</Text>
                    <Text style={styles.cell}>{item.role}</Text>
                    <Text style={styles.cell}>{item.date}</Text>
                    <Text style={styles.cell}>{item.amount}</Text>
                    <Text style={{ ...styles.cell, width: 300 }}>
                      {item.remark}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
          {/*Photo Validation Details */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Photo Validation Details</Text>
            </View>
            <ScrollView horizontal style={{ margin: 10, marginRight: 0 }}>
              <View>
                {/* Table Header */}
                <View style={[styles.row, styles.header]}>
                  <Text style={styles.cell}>Type</Text>
                  <Text style={styles.cell}>Executive Name</Text>
                  <Text style={styles.cell}>Role</Text>
                  <Text style={styles.cell}>Date</Text>
                  <Text style={{ ...styles.cell, width: 300 }}>Remark</Text>
                </View>

                {/* Table Body */}
                {photoValidationData.map((item, index) => (
                  <View key={index} style={styles.row}>
                    <Text style={styles.cell}>{item.type}</Text>
                    <Text style={styles.cell}>{item.name}</Text>
                    <Text style={styles.cell}>{item.role}</Text>
                    <Text style={styles.cell}>{item.date}</Text>
                    <Text style={{ ...styles.cell, width: 300 }}>
                      {item.remark}
                    </Text>
                  </View>
                ))}
              </View>
            </ScrollView>
          </ScrollView>
          {/* Sponsorship Images */}
          <ScrollView style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>Sponsorship Images</Text>
            </View>
            <View style={styles.container}>
               <Image
                source={{ uri: 'https://myvisit.cloudpub.in/Content/Uploadfiles/SponsorshipPhotoUpload/715146137664/SponsorshipPhotoUpload/715146137664.png' }}
                style={{
                  width: 150,
                  height: 150,
                  borderRadius: 8,
                  margin: 10,
                  borderWidth: 1,
                  borderColor: '#ccc',
                }}
                resizeMode="contain"
              />
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}> 
              <Text style={{ color: "#555", fontSize: 12, margin: 10 }}>
                parad_shree_meru_yantra_9_.png
              </Text>
              </View>
            </View>
          </ScrollView>
          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Validate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Reject</Text>
            </TouchableOpacity>
        </View>
        </>
      )}
    </AnimatedHeader>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: 250,
    position: "relative",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  dropdownContainer: {
    position: "absolute",
    top: 160,
    flexDirection: "row",
    justifyContent: "center",
    // paddingHorizontal: 10,
    marginHorizontal: 15,
    zIndex: 10,
  },
  radioContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 10,
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff95",
    borderRadius: 11,
  },
  radioText: {
    fontSize: 16,
    // paddingHorizontal: 10,
    padding: 5,
  },
  active: {
    backgroundColor: PrimaryColorLight3,
    borderWidth: 1,
    borderColor: PrimaryColorLight,
    color: PrimaryColor,
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    backgroundColor: "#e7e8ec",
  },
  cell: {
    padding: 10,
    width: 180,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  card2: {
    backgroundColor: "#f4f7fc", // Matches light blue shade
    padding: 15,
    margin: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // For Android
  },

  cardText: {
    color: "#0a2540", // Dark text
    fontSize: 14,
    fontWeight: "500",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    // padding: 15,
    margin: 10,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    // borderBottomWidth: 1,
    backgroundColor: "#e5e5e5",
    padding: 15,
    // marginBottom: 10,
    paddingBottom: 8,
    color: "#333",
  },
  row2: {
    flexDirection: "row",
    paddingBottom: 8,
    paddingTop: 8,
    // paddingHorizontal: 15,
    // alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  label: {
    flex: 1,
    fontSize: 12,
    color: "#555",
    fontWeight: "500",
    minWidth: 30,
  },
  separator: {
    marginHorizontal: 10,
    color: "#555",
  },
  value: {
    flex: 3,
    fontSize: 12,
    color: "#333",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  closeText: {
    color: "#007BFF",
    fontSize: 14,
    marginBottom: 10,
  },
  link: {
    color: "#007bff",
    textDecorationLine: "underline",
  },
  container: {
    paddingHorizontal: 15,
  },
  value2: {
    flex: 3,
    fontSize: 12,
    color: "#333",
  },
  value3: {
    flex: 3,
    fontSize: 12,
    color: "#333",
    width: 200,
  },
  link2: {
    flex: 3,
    // fontSize: 14,
    color: "#007BFF",
    // textDecorationLine: 'underline',
  },
  inputRemarks: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
    fontSize: 12,
    textAlignVertical: "top", // aligns text at the top for multiline
    minHeight: 80,
    marginTop: 4,
    // width:200
  },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#1976D2', // Material Blue 700
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default SponsorshipPhotoValidate;
