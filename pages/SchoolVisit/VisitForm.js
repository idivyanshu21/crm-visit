import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { TextInput, Button, DefaultTheme, Checkbox } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons"; // Make sure MaterialIcons is installed
import { PrimaryColor, PrimaryColorLight, PrimaryColorLight2, PrimaryColorLight3 } from "../../globalCSS";
import { getSession } from "../../Contexts/Session";
import axios from "axios";
import useSessionDetails from "../../Contexts/sessionDetails";
import { MultiSelect } from "react-native-element-dropdown";
import Loader from "../../Components/Loader";

const FormWithFloatingLabels = ({ formData, setFormData, OnSubmit, schoolId,isDropdownOpen, setIsDropdownOpen }) => {
  const [loading,setLoading]=useState(false)
  const sessionDetails = useSessionDetails()
  const [visited, setvisited] = useState()
  const [epm, setEpm] = useState()

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      setFormData({ ...formData, executive: session.ExecutiveName })
    };
    checkSession();
  }, []);

  const fetchVisitedWithOtherExecutives = async () => {
    setLoading(true)
    try {
      const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: "GetExecByTerritory",
        iCompanyID: sessionDetails?.iCompanyID,
        Col1: "",
        Col2: "",
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        UserID:sessionDetails?.ExecutiveID,
      };

      const url = `${baseUrl}`;

      // Make the POST request using axios
      const response = await axios.post(url, null, {
        params: params, // Send the params as query parameters
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });
      const data = response.data;
      setvisited(data)
      //console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }
  const fetchEPM = async () => {
    setLoading(true)
    try {
      const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: "GetEPMExecutive",
        iCompanyID: sessionDetails?.iCompanyID,
        Col1: "",
        Col2: "",
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        UserID: sessionDetails?.ExecutiveID,
      };

      const url = `${baseUrl}`;

      // Make the POST request using axios
      const response = await axios.post(url, null, {
        params: params, // Send the params as query parameters
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });
      const data = response.data;
      setEpm(data)
      // console.log("===========", data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchVisitedWithOtherExecutives()
    fetchEPM()
  }, [sessionDetails]);

 

  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [showFollowUpDatePicker, setShowFollowUpDatePicker] = useState(false);

  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!formData.executive) {
  //     newErrors.executive = "This field is required";
  //   }
  //   if (!formData.visitDate) {
  //     newErrors.visitDate = "This field is required";
  //   }
  //   if (formData.feedback.length < 50) {
  //     newErrors.feedback = "Feedback must be at least 50 characters long";
  //   }
  //   if (formData.followUp && !formData.followUpDate) {
  //     newErrors.followUpDate = "This field is required";
  //   }
  //   if (formData.followUp && !formData.followUpAction) {
  //     newErrors.followUpAction = "This field is required";
  //   }
  //   if (formData.followUp && formData.remark.length < 50) {
  //     newErrors.remark = "Remark must be at least 50 characters long";
  //   }
  //   if (formData.reason.length < 50) {
  //     newErrors.reason = "Reason must be at least 50 characters long";
  //   }
  //   if (!formData.purpose) {
  //     newErrors.purpose = "Please select a purpose";
  //   }
  //   if (formData.purpose===3&&!formData.demoBy) {
  //     newErrors.demoBy = "Please select a demoBy";
  //   }
  //   if (formData.purpose===3&&!formData.demoType) {
  //     newErrors.demoType = "Please select a demoType";
  //   }
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.visitDate;
    setShowDatePicker(false);
    setFormData({ ...formData, visitDate: currentDate });
  };
  const handleFollowUpDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || formData.followUpDate;
    setShowFollowUpDatePicker(false);
    setFormData({ ...formData, followUpDate: currentDate });
  };

  const handleSubmit = () => {

    if (!schoolId) {
      return alert('Select School')
    }
    OnSubmit()
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const currentDate = new Date();
  const minDate = new Date(); // Today
  const maxDate = currentDate;
  minDate.setDate(currentDate.getDate() - 3);


  const [isFocus, setIsFocus] = useState(false);

  const handleSelectChange = (values) => {
    setFormData({ ...formData, visitedWith: values });
  };




  return (
    <View style={styles.container}>
      {loading && <Loader/>}
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={styles.title}>Enter Visit Details</Text>
        <MaterialIcons
          name={isDropdownOpen ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {isDropdownOpen &&
        <View style={{ paddingTop: 10 }}>
          {/* Executive Field */}
          <TextInput
            label="Executive*"
            mode="outlined"
            disabled
            style={styles.input}
            value={formData.executive}
            onChangeText={(text) =>
              setFormData({ ...formData, executive: text })
            }
            theme={{
              roundness: 11,
              colors: {
                ...DefaultTheme.colors,
                primary: PrimaryColor, // Example primary color
                outline: "#00000020",
              },
            }}
            error={!!errors.executive}
          />
          {!!errors.executive && (
            <Text style={styles.errorText}>{errors.executive}</Text>
          )}

          {/* Visited With Dropdown */}
          {/* <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.visitedWith}
              onValueChange={(value) =>
                setFormData({ ...formData, visitedWith: value })
              }
              style={styles.picker}
            >
              <Picker.Item label="Select Executive" value="" />
              {visited?.map((executive) => (
                <Picker.Item label={executive.Text_t} value={executive.Value_v} />
              ))}
            </Picker>
          </View> */}

          <View style={[styles.pickerContainer,{height:'auto',paddingHorizontal:10,paddingBottom:10}]}>
            <MultiSelect
              style={[styles.picker, isFocus && { borderColor: "#6C63FF" }]}
              data={visited?.map((executive) => ({
                label: executive.Text_t,
                value: executive.Value_v,
              }))}
              labelField="label"
              valueField="value"
              placeholder="Visited With Other Executive"
              searchPlaceholder="Search..."
              value={formData.visitedWith}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={handleSelectChange}
              selectedStyle={styles.selectedStyle}
              placeholderStyle={styles.placeholderStyle}
              activeColor={PrimaryColorLight3}
              selectedTextStyle={{color:PrimaryColor}}
            />
          </View>
          {!!errors.visitedWith && (
            <Text style={styles.errorText}>{errors.visitedWith}</Text>
          )}

          {/* Purpose Picker */}
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.purpose}
              onValueChange={(value) =>
                setFormData({ ...formData, purpose: value })
              }
              style={styles.picker}
            >
              <Picker.Item label="Visited Purpose*" value="" />
              <Picker.Item label="Product Orientation" value={1} />
              <Picker.Item label="Product Promotion" value={2} />
              <Picker.Item label="Product Demo" value={3} />
            </Picker>
          </View>
          {!!errors.purpose && (
            <Text style={styles.errorText}>{errors.purpose}</Text>
          )}
          {formData.purpose === 3 && (
            <>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.demoBy}
                  onValueChange={(itemValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      demoBy: itemValue
                    }));
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Demo By*" value="" />
                  <Picker.Item label="Demo By Self" value="DemoBySelf" />
                  <Picker.Item label="Demo By EPM" value="DemoByEPM" />
                </Picker>
              </View>

              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.demoType}
                  onValueChange={(itemValue) => {
                    setFormData((prev) => ({
                      ...prev,
                      demoType: itemValue
                    }));
                  }}
                  style={styles.picker}
                >
                  <Picker.Item label="Demo Type*" value="" />
                  <Picker.Item label="Altura Demo" value="Altura Demo" />
                  <Picker.Item label="Other Titles" value="Other Titles" />
                </Picker>
              </View>
            </>
          )}

          {(formData.purpose === 3 && formData.demoBy === "DemoByEPM") && (
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.selectedEPM}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    selectedEPM: value,
                  }))
                }
                style={styles.picker}
              >
                <Picker.Item label="Select EPM*" value="" />
                {epm?.map((executive) => (
                  <Picker.Item label={executive.Text_t} value={executive.Value_v} />
                ))}
              </Picker>
            </View>
          )}

          {/* Date Picker - Entire Container Clickable */}
          <TouchableOpacity
            style={styles.inputContainer} // This makes the entire container clickable
            onPress={() => setShowDatePicker(true)}
          >
            <TextInput
              label="Visit Date*"
              mode="outlined"
              style={[styles.input, { width: '100%' }]}
              value={formData.visitDate.toISOString().split("T")[0]}
              theme={{
                roundness: 11,
                colors: {
                  ...DefaultTheme.colors,
                  primary: PrimaryColor, // Example primary color
                  outline: "#00000020",
                },
              }}
              editable={false} // Disable manual editing
            />
            <MaterialIcons
              name="calendar-today"
              size={24}
              color={PrimaryColor} // Icon color
              style={styles.icon} // Style for the icon
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.visitDate}
              mode="date"
              display="default"
              minimumDate={minDate} // Prevent selection before today
              maximumDate={maxDate} // Prevent selection after 3 days
              onChange={handleDateChange}
            />
          )}

          {/* Reason Field */}
          <TextInput
            label="Reason*"
            mode="outlined"
            style={[styles.input, { height: 100 }]}
            multiline
            value={formData.reason}
            onChangeText={(text) => setFormData({ ...formData, reason: text })}
            theme={{
              roundness: 12,
              colors: {
                ...DefaultTheme.colors,
                primary: PrimaryColor, // Example primary color
                outline: "#00000020",
              },
            }}
          />

          <TextInput
            label="Feedback*"
            mode="outlined"
            style={[styles.input, { height: 100 }]}
            multiline
            value={formData.feedback}
            onChangeText={(text) => setFormData({ ...formData, feedback: text })}
            theme={{
              roundness: 12,
              colors: {
                ...DefaultTheme.colors,
                primary: PrimaryColor, // Example primary color
                outline: "#00000020",
              },
            }}
          />

          <View style={styles.checkboxContainer}>
            <Checkbox
              color={PrimaryColor}
              status={formData.followUp ? "checked" : "unchecked"}
              onPress={() => setFormData({ ...formData, followUp: !formData.followUp })}
            />
            <Text style={styles.checkboxLabel}>Follow Up</Text>
          </View>

          {formData.followUp && (
            <>
              {/* Follow-Up Date */}
              <TouchableOpacity
                style={styles.inputContainer}
                onPress={() => setShowFollowUpDatePicker(true)}
              >
                <TextInput
                  label="Follow-Up Date*"
                  mode="outlined"
                  style={[styles.input, { width: "100%" }]}
                  value={formData.followUpDate.toISOString().split("T")[0]}
                  theme={{
                    roundness: 11,
                    colors: {
                      ...DefaultTheme.colors,
                      primary: PrimaryColor,
                      outline: "#00000020",
                    },
                  }}
                  editable={false}
                />
                <MaterialIcons
                  name="calendar-today"
                  size={24}
                  color={PrimaryColor}
                  style={styles.icon}
                />
              </TouchableOpacity>
              {showFollowUpDatePicker && (
                <DateTimePicker
                  value={formData.followUpDate}
                  mode="date"
                  display="default"
                  onChange={handleFollowUpDateChange}
                />
              )}

              {/* Follow-Up Action */}
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.followUpAction}
                  onValueChange={(value) =>
                    setFormData({ ...formData, followUpAction: value })
                  }
                  style={styles.picker}
                >
                  <Picker.Item label="Follow-Up Action" value="" />
                  <Picker.Item label="Manager Visit" value={1} />
                  <Picker.Item label="Calling" value={2} />
                  <Picker.Item label="Sampling" value={3} />
                </Picker>
              </View>

              {/* Remark */}
              <TextInput
                label="Remark*"
                mode="outlined"
                style={[styles.input, { height: 100 }]}
                multiline
                value={formData.remark}
                onChangeText={(text) => setFormData({ ...formData, remark: text })}
                theme={{
                  roundness: 12,
                  colors: {
                    ...DefaultTheme.colors,
                    primary: PrimaryColor,
                    outline: "#00000020",
                  },
                }} />
            </>
          )}

          {/* Submit Button */}
          <Button
            mode="contained"
            onPress={handleSubmit}
            style={styles.button}
            theme={{ colors: { primary: PrimaryColor } }}
          >
            Submit
          </Button>
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    padding: 20,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'white',
    boxShadow: '0px 1px 3px #00000020'
  },
  input: {
    marginBottom: 20,
    backgroundColor: "#fff",
    height: 45,
    paddingBottom: 2
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#00000020",
    borderRadius: 11,
    overflow: "hidden",
    marginBottom: 20,
    height: 50,
    backgroundColor: "white",
  },
  picker: {
    height: 55,
    marginTop: -4
  },
  icon: {
    position: "absolute",
    right: 10, // Adjust icon position
    top: 18, // Adjust icon position
  },
  button: {
    // marginTop: 20,
    borderRadius: 10
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
  placeholderStyle: {
    color: "#000",
  },
  selectedStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor:PrimaryColorLight3,
    padding: 5,
    borderWidth: 1,
    color:'blue',
    borderColor: PrimaryColorLight,
    borderRadius: 20,
  },
});

export default FormWithFloatingLabels;
