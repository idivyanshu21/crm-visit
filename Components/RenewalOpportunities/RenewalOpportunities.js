import axios from "axios";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import useSessionDetails from "../../Contexts/sessionDetails";
import { Picker } from "@react-native-picker/picker";
import { PrimaryColor } from "../../globalCSS";

const RenewalOpportunities = ({ schoolID, details, setdetails, renewalOpportunitiesTable, setRenewalOpportunitiesTable, OnSubmit }) => {

  const {
    setarget = 2000000,
    serenewalopportunity = 0,
    senewopportunity = 0,
    adoptionalreadyachieved = 0,
    schoolrenewalopportunity = 0,
    schoolnewopportunity = 0
  } = details || {};
  const sessionDetails = useSessionDetails()
  const [adoptionChances, setAdoptionChances] = useState([])

  const loadDetails = async () => {
    
    try {
      // console.log(classValue, formData.selectedSeries);
      const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonDataFromDB";
      const params = {
        ActionType: "GetRenewalOpportunitiesDetails",
        iCompanyID: sessionDetails.iCompanyID,
        iBranchID: 1,
        FinancialPeriod: '2024-2024',
        Col1: schoolID,
        Col2: sessionDetails.UserID,
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        Col7: "",
        Col8: "",
        Col9: "",
        Col10: "",
        UserID: sessionDetails.UserID,
      };

      const url = `${baseUrl}`;
      // console.log('Request URL:', url);

      const response = await axios.post(url, null, {
        params: params,
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });

      const data = response.data;
      // console.log("Received data:", data);
      setdetails(data[0]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadAdoptionChances = async () => {
    try {
      //console.log(classValue, formData.selectedSeries);
      const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: "GetAdpotionChances",
        iCompanyID: sessionDetails.iCompanyID,
        Col1: "",
        Col2: "",
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        UserID: sessionDetails.ExecutiveID,
      };

      const url = `${baseUrl}`;
      //console.log('Request URL:', url);

      const response = await axios.post(url, null, {
        params: params,
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });

      const data = response.data;
      //  console.log("Received data:", data);
      setAdoptionChances(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
    // loadTable()
    loadAdoptionChances()
  }, [schoolID, sessionDetails]);

  const handleFieldChange = (index, field, value) => {
    const updatedTable = [...renewalOpportunitiesTable];
    updatedTable[index][field] = value;
    setRenewalOpportunitiesTable(updatedTable);
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingVertical: 20,
          justifyContent: 'center',
          margin: 5,
          borderRadius: 20,
          backgroundColor: 'white',
          boxShadow: '0px 1px 3px #00000020'
        }}
      >
        {[
          // { heading: "SE Target for 2024", value: setarget },
          { heading: "SE Renewal Opportunity value for 2024", value: serenewalopportunity },
          { heading: "SE New Opportunity value for 2024", value: senewopportunity },
          { heading: "Adoption Already Achieved for 2024", value: adoptionalreadyachieved },
          { heading: "School Renewal Opportunity value for 2024", value: schoolrenewalopportunity },
          { heading: "School New Opportunity value for 2024", value: schoolnewopportunity },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              // borderBottomWidth: 1,
              // borderColor: "#00000020",
              paddingVertical: 6,
              width: "90%",
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#333" }}>{item.heading}:</Text>
            <Text style={{ textAlign: "right", color: "#555" }}>{item.value}</Text>
          </View>
        ))}
      </View>
      {/* Display table as cards */}
      {renewalOpportunitiesTable?.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardTitle}>Broad Subject: {item.BroadSubject}</Text>
          <Text style={styles.cardSubtitle}>Series: {item.Series || "N/A"}</Text>
          <Text style={styles.cardSubtitle}>Title: {item.BookName || "N/A"}</Text>
          <Text style={styles.cardSubtitle}>Original Qty: {item.OriginalQty}</Text>

          {/* Editable fields */}
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Qty:</Text>
            <TextInput
              style={[styles.input, { backgroundColor: "#f0f0f090", color: '#00000050' }]}
              keyboardType="numeric"
              value={item.Qty.toString()}
              onChangeText={(text) => handleFieldChange(index, "Qty", parseInt(text, 10))}
              editable={false}
            />
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Adoption Charges:</Text>
            <View style={[styles.input, { height: 33, flex: 1 }]}>
              <Picker
                selectedValue={item.AdoptionChance}
                onValueChange={(value) => handleFieldChange(index, "AdoptionChance", value)}
                style={styles.picker}
              >
                {adoptionChances?.map((chance, i) => (
                  <Picker.Item key={i} label={chance.Text_t} value={chance.Value_v} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Remark:</Text>
            <TextInput
              style={styles.input}
              value={item.TitleRemark || ""}
              onChangeText={(text) => handleFieldChange(index, "TitleRemark", text)}
            />
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={OnSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 10,
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: "bold",
    flex: 1,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5,
  },
  picker: {
    marginHorizontal: 0,
    marginTop: -18,
    height: 50,
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: PrimaryColor,
    marginHorizontal:20,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 5,
},
submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
},
});

export default RenewalOpportunities;
