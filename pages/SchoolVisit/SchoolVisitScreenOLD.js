// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { Picker } from "@react-native-picker/picker";
// import globalStyles from "../../globalCSS";

// const SchoolSearchComponent = () => {
//   const [formData, setFormData] = useState({
//     country: "India",
//     state: "Uttar Pradesh",
//     city: "",
//     region: "MIL Northern Region",
//     salesOffice: "MPIL-LUCKNOW",
//     territory: "UP 19",
//     schoolCode: "",
//     email: "",
//     schoolName: "",
//     phone: "",
//     accountableExecutive: "Ajay Kumar (30462)",
//     keySchool: "",
//   });

//   const handleInputChange = (field, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [field]: value,
//     }));
//   };

//   const handleSearch = () => {
//     console.log("Search initiated with data:", formData);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {/* Geographical Structure */}
//       <Text style={styles.sectionTitle}>Geographical Structure</Text>
//       <View style={styles.row}>
//         <Text>Country</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.country}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("country", value)}
//           >
//             <Picker.Item label="India" value="India" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>State</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.state}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("state", value)}
//           >
//             <Picker.Item label="Uttar Pradesh" value="Uttar Pradesh" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>City</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.city}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("city", value)}
//           >
//             <Picker.Item label="--Select City--" value="" />
//           </Picker>
//         </View>
//       </View>

//       {/* MPIL Structure */}
//       <Text style={styles.sectionTitle}>MPIL Structure</Text>
//       <View style={styles.row}>
//         <Text>Region</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.region}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("region", value)}
//           >
//             <Picker.Item
//               label="MIL Northern Region"
//               value="MIL Northern Region"
//             />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>Sales Office</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.salesOffice}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("salesOffice", value)}
//           >
//             <Picker.Item label="MPIL-LUCKNOW" value="MPIL-LUCKNOW" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>Territory</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.territory}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("territory", value)}
//           >
//             <Picker.Item label="UP 19" value="UP 19" />
//           </Picker>
//         </View>
//       </View>

//       {/* School Info */}
//       <Text style={styles.sectionTitle}>School Information</Text>
//       <View style={styles.row}>
//         <Text>School Code</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.schoolCode}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("schoolCode", value)}
//           >
//             <Picker.Item label="Enter School Code" value="" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>Email</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.email}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) => handleInputChange("email", value)}
//           >
//             <Picker.Item label="Enter Email" value="" />
//           </Picker>
//         </View>
//       </View>
//       <View style={styles.row}>
//         <Text>Accountable Executive</Text>
//         <View style={[globalStyles.pickerContainer]}>
//           <Picker
//             selectedValue={formData.accountableExecutive}
//             style={{ height: 60, width: "100%", marginTop: -12 }}
//             onValueChange={(value) =>
//               handleInputChange("accountableExecutive", value)
//             }
//           >
//             <Picker.Item
//               label="Ajay Kumar (30462)"
//               value="Ajay Kumar (30462)"
//             />
//           </Picker>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.button} onPress={handleSearch}>
//         <Text style={styles.buttonText}>Search</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     marginVertical: 10,
//   },
//   row: {
//     marginBottom: 15, // Adds spacing between rows
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//     paddingHorizontal: 5,
//     backgroundColor: "#fff",
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#007bff",
//     padding: 15,
//     borderRadius: 5,
//     alignItems: "center",
//   },
//   buttonText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

// export default SchoolSearchComponent;
