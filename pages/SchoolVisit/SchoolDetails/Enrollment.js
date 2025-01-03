import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import SimpleHeader from "../../SimpleHeader";
import { useRoute } from "@react-navigation/native";
import useSessionDetails from "../../../Contexts/sessionDetails";
import axios from "axios";
import Loader from "../../../Components/Loader";

const Enrollment = () => {
  const route = useRoute();
  const [isEditable, setIsEditable] = useState(false);
  const sessionDetails = useSessionDetails()
  const [enrollmentObject, setEnrollmentObject] = useState('')
  const schoolID = route.params.schoolId
  const [loading, setLoading] = useState(false)
  console.log(schoolID)
  const [enrollmentData, setEnrollmentData] = useState('');
  const [backupData, setBackupData] = useState('');
  const fetchSchoolDetails = async () => {
    try {
      setLoading(true)
      // Construct the URL with query parameters
      const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_FindCommonDataForEdit";
      const params = {
        ActionType: "GetSchoolDetails",
        iCompanyID: sessionDetails.iCompanyID,
        LoadId: schoolID,
        UserID: sessionDetails.UserID,
      };

      const url = `${baseUrl}`;

      // Make the POST request using axios
      const response = await axios.post(url, null, {
        params: params, // Send the params as query parameters
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });
      const data = response.data[0];
      console.log(data)
      setEnrollmentObject(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSchoolDetails()
  }, [schoolID, sessionDetails])

  useEffect(() => {
    if (enrollmentObject) {
      const initialEnrollmentData = Object.fromEntries(
        Object.entries(enrollmentObject).filter(
          ([key]) =>
            key.match(
              /ppenrolment|penrolment|menrolment|senrolment|ssenrolment|Class/i
            ) && !["ClassLevel", "StartClass", "EndClass"].includes(key)
        )
  );
setEnrollmentData(initialEnrollmentData)
setBackupData(initialEnrollmentData)
}
}, [enrollmentObject])



const groupMappings = {
  "Pre-Primary": ["ClassNryEnrol", "ClassLKGEnrol", "ClassUKGEnrol"],
  Primary: [
    "Class1Enrol",
    "Class2Enrol",
    "Class3Enrol",
    "Class4Enrol",
    "Class5Enrol",
  ],
  Middle: ["Class6Enrol", "Class7Enrol", "Class8Enrol"],
  Secondary: ["Class9Enrol", "Class10Enrol"],
  "Senior Secondary": ["Class11Enrol", "Class12Enrol"],
};

const labelMappings = {
  ppenrolment: "Pre-Primary",
  penrolment: "Primary",
  menrolment: "Middle",
  senrolment: "Secondary",
  ssenrolment: "Senior Secondary",
};

const updateGroupTotal = (groupKey, newTotal) => {
  const classes = groupMappings[labelMappings[groupKey]] || [];
  if (classes.length === 0) return;

  const perClassValue = Math.floor(newTotal / classes.length);
  const remainder = newTotal % classes.length;

  const updatedData = { ...enrollmentData };

  classes.forEach((cls, index) => {
    updatedData[cls] = perClassValue + (index < remainder ? 1 : 0);
  });

  updatedData[groupKey] = newTotal;

  setEnrollmentData(updatedData);
};

const updateIndividualClass = (cls, newValue) => {
  const updatedData = { ...enrollmentData };
  updatedData[cls] = parseInt(newValue, 10) || 0;

  for (const [groupKey, classes] of Object.entries(groupMappings)) {
    if (classes.includes(cls)) {
      updatedData[groupKey] = classes.reduce(
        (sum, className) => sum + (updatedData[className] || 0),
        0
      );
      break;
    }
  }

  setEnrollmentData(updatedData);
};

const handleEditToggle = () => {
  if (isEditable) {
    setBackupData(enrollmentData);
  }
  setIsEditable(!isEditable);
};

const handleSubmit = async () => {
  setLoading(true)
  console.log("Updated Enrollment Data:", enrollmentData);
  try {
    // Construct the URL with query parameters
    const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_UpdateEnrollment";
    const params = {
      SchoolID: schoolID,
      Enrolment_Pre_Primary: enrollmentData.ppenrolment || 0,
      Enrolment_Primary: enrollmentData.penrolment || 0,
      Enrolment_Middle: enrollmentData.menrolment || 0,
      Enrolment_Secondary: enrollmentData.senrolment || 0,
      Enrolment_Senior_Secondary: enrollmentData.ssenrolment || 0,
      Enrolment_ClassNryEnrol: enrollmentData.ClassNryEnrol || 0,
      Enrolment_ClassLKGEnrol: enrollmentData.ClassLKGEnrol || 0,
      Enrolment_ClassUKGEnrol: enrollmentData.ClassUKGEnrol || 0,
      Enrolment_Class1Enrol: enrollmentData.Class1Enrol || 0,
      Enrolment_Class2Enrol: enrollmentData.Class2Enrol || 0,
      Enrolment_Class3Enrol: enrollmentData.Class3Enrol || 0,
      Enrolment_Class4Enrol: enrollmentData.Class4Enrol || 0,
      Enrolment_Class5Enrol: enrollmentData.Class5Enrol || 0,
      Enrolment_Class6Enrol: enrollmentData.Class6Enrol || 0,
      Enrolment_Class7Enrol: enrollmentData.Class7Enrol || 0,
      Enrolment_Class8Enrol: enrollmentData.Class8Enrol || 0,
      Enrolment_Class9Enrol: enrollmentData.Class9Enrol || 0,
      Enrolment_Class10Enrol: enrollmentData.Class10Enrol || 0,
      Enrolment_Class11Enrol: enrollmentData.Class11Enrol || 0,
      Enrolment_Class12Enrol: enrollmentData.Class12Enrol || 0,
      iCompanyID: sessionDetails.iCompanyID,
      UserID: sessionDetails.ExecutiveID

    };

    const url = `${baseUrl}`;
    const response = await axios.post(url, null, {
      params: params,
      headers: {
        "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
      },
    });

    // Access the data from the response
    const data = response.data;
    console.log("Received data:", data);
    fetchSchoolDetails()
    alert(response.data[0].Result)
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    setLoading(false);
  }
  setIsEditable(false);
};

const handleCancel = () => {
  setEnrollmentData(backupData);
  setIsEditable(false);
};

return (
  <SimpleHeader title="Enrollment Details">
    {loading && <Loader />}
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Enrollment Details</Text>
      <View style={styles.content}>
        {Object.entries(enrollmentData).map(([key, value]) => (
          <View style={styles.row} key={key}>
            <Text style={styles.label}>
              {labelMappings[key] || key.replace(/Enrol$/, "")}:
            </Text>
            {isEditable ? (
              <TextInput
                style={styles.input}
                value={value?.toString() || "0"}
                keyboardType="numeric"
                onChangeText={(text) => {
                  const newValue = parseInt(text, 10) || 0;
                  if (Object.keys(labelMappings).includes(key)) {
                    updateGroupTotal(key, newValue);
                  } else {
                    updateIndividualClass(key, newValue);
                  }
                }}
              />
            ) : (
              <Text style={styles.value}>{value}</Text>
            )}
          </View>
        ))}

        <View style={styles.buttonRow}>
          {isEditable ? (
            <>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSubmit}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.updateButton}
              onPress={handleEditToggle}
            >
              <MaterialIcons name="edit" size={18} color="white" />
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  </SimpleHeader>
);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 5,
    borderRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    padding: 15,
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  label: {
    fontSize: 14,
    flex: 2,
    fontWeight: "normal",
  },
  value: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
  input: {
    fontSize: 14,
    flex: 1,
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  updateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginLeft: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
  },
});

export default Enrollment;
