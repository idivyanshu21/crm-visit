import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import globalStyles, { PrimaryColor, PrimaryColorLight } from '../../globalCSS';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import useSessionDetails from '../../Contexts/sessionDetails';
import Loader from '../Loader';
import IOSPicker from '../IOSPicker';

const OrderProcess = ({ samplingRequest = false, boardSubject, title, classValue, schoolDetails, invoiceYear, invoiceMonth, sampleYear, sampleMonth, formData,
  setFormData,
  tableData,
  setTableData,
  orderList,
  setOrderList,
  showTable,
  totalNetAmount,
  setShowTable,
  months,
  classType }) => {
  const [series, setseries] = useState()
  const [allBookData, setAllBookData] = useState([]);
  const [competitorPublisher, setCompetitorPublisher] = useState([])
  const [competitorSeries, setCompetitorSeries] = useState([])
  const [competitorTitle, setCompetitorTitle] = useState([])
  const [adoptionChances, setAdoptionChances] = useState([])
  const [toggle, settogggle] = useState()
  const sessionDetails = useSessionDetails()
  const [loading, setLoading] = useState(false)

  const [availableClass, setAvailableClass] = useState()
  const fetchSeriesData = async () => {
    setLoading(true)
    try {
      // Construct the URL with query parameters
      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: title === "Title in Series" ? "GetMasterSeries" : "GetMasterTitle",
        iCompanyID: sessionDetails.iCompanyID,
        Col1: sessionDetails.ExecutiveID,
        Col2: formData.selectedSubject,
        Col3: classValue,
        Col4: "",
        Col5: "",
        Col6: "",
        UserID: sessionDetails.ExecutiveID,
      };

      const url = `${baseUrl}`;
      // console.log('Request URL:', url);

      // Make the POST request using axios
      const response = await axios.post(url, null, {
        params: params, // Send the params as query parameters
        headers: {
          "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });

      // Access the data from the response
      const data = response.data;
      // console.log("Received data:", data);
      setseries(data)
      // Set the state with the fetched data

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.selectedSubject !== '') {
      fetchSeriesData();
    }
  }, [formData.selectedSubject, classValue, sessionDetails]);

  const loadBookType = async () => {
    setLoading(true)
    try {
      // console.log(classValue, formData.selectedSeries);
      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
      const params = {
        ActionType: "LoadBookTypeInSeriesAndBook",
        iCompanyID: sessionDetails.iCompanyID,
        iBranchID: 1,
        FinancialPeriod: '2024-2024',
        Col1: sessionDetails.ExecutiveID,
        Col2: title === "Title in Series" ? formData.selectedSeries : "",
        Col3: title === "Title in Series" ? "" : formData.selectedSeries,
        Col4: title === "Title in Series" ? "existingbooknumforseries" : "existingbooknumfortitle",
        Col5: classValue,
        Col6: "",
        Col7: "",
        Col8: "",
        Col9: "",
        Col10: "",
        UserID: sessionDetails.ExecutiveID,
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
      console.log("Received data:", data);

      // Append new data to the existing array
      setAllBookData([...data]);

      // Update toggle and available classes from the new data
      const toggleOptions = data.map((item) => item.booktypename);
      const availableNumbers = data.map((item) => item.AvailableBookNums.split(',')).flat();
      settogggle(toggleOptions);
      setAvailableClass(availableNumbers);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (formData.selectedSubject !== '') {
      loadBookType();
    }
  }, [formData.selectedSeries, sessionDetails]);


  const toggleOptions = ['CB', 'WB', 'LR', 'TB', 'CD'];
  const [toggleValues, setToggleValues] = useState(
    samplingRequest
      ? toggleOptions.reduce((acc, option) => ({ ...acc, [option]: '' }), {})
      : []
  );


  //console.log('---------------------', formData)

  // const [orderList, setOrderList] = useState([]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleToggleChange = (key, value) => {
    setToggleValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCheckboxChange = (level) => {
    const updatedToggles = toggleValues?.includes(level)
      ? toggleValues.filter((option) => option !== level)
      : [...toggleValues, level];

    setToggleValues(updatedToggles);
  };

  const handleAddToList = () => {
    const { selectedSubject, selectedSeries } = formData;

    // Check required fields
    if (
      schoolDetails &&
      selectedSubject &&
      selectedSeries &&
      invoiceYear &&
      invoiceMonth &&
      sampleYear &&
      sampleMonth &&
      (samplingRequest
        ? Object.values(toggleValues).some((val) => val)
        : toggleValues.length > 0)
    ) {

      // Get display names for subject and series
      const subjectName = boardSubject?.find(subject => subject.Value_v === selectedSubject)?.Text_t || 'Unknown Subject';
      const seriesName = series?.find(s => s.Value_v === selectedSeries)?.Text_t || 'Unknown Series';

      // Create a new item with display names and available numbers
      const newItem = {
        id: selectedSeries, // Use selectedSeries as unique identifier
        SeriesID: title === 'Title in Series' ? selectedSeries : null,
        ...formData,
        toggles: samplingRequest ? toggleValues : toggleValues,
        displayData: {
          subjectName,
          seriesName,
        },
        BookCode: title === 'Title in Series' ? null : allBookData[0].BookCodes.replace(/,/g, ""),
        ClassLevel_ConCat: classType === 'Class Level' ? classValue : '',
        ClassNum_ConCat: classType === 'Class Level' ? '' : classValue,
        SampleYearID: sampleYear,
        SampleMonthID: sampleMonth,
        InvoiceYearID: invoiceYear,
        InvoiceMonthID: invoiceMonth,
        CB_Qty: 0,
        CD_Qty: 0,
        TB_Qty: 0,
        WB_Qty: 0,
        LR_Qty: 0,
        TrnsSamplePlanDetailID: 1,
        iCompanyID: 0
      };

      // Add the new item to the order list
      setOrderList([...orderList, newItem]);
      setShowTable(true); // Show the table once added

      setToggleValues(
        samplingRequest
          ? toggleOptions.reduce((acc, option) => ({ ...acc, [option]: '' }), {})
          : []
      );

      // Add rows to the table
      settogggle()
    } else {
      alert('Please fill all fields and ensure required toggles are selected!');
    }
  };

  const handleAddToTable = async () => {
    setLoading(true)
    try {
      const selectedBooks = allBookData.filter((item) =>
        toggleValues.includes(item.booktypename)
      );

      if (selectedBooks.length === 0) {
        console.warn("No books matched the selected toggles");
        return;
      }

      // Concatenate BookCodes of selected books into a single string
      const concatenatedBookCodes = selectedBooks
        .map((item) => item.BookCodes)
        .filter(Boolean) // Ensure no undefined or null values are included
        .join(',');

      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
      const params = {
        ActionType: title === "Title in Series" ? "LoadSeriesInTitle" : "LoadTitleClass",
        iCompanyID: sessionDetails.iCompanyID,
        iBranchID: 1,
        FinancialPeriod: '2024-2024',
        Col1: title === "Title in Series" ? concatenatedBookCodes : formData.selectedSeries, // BookCodes
        Col2: title === "Title in Series" ? formData.selectedSeries : "", // Selected Series
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        Col7: "",
        Col8: "",
        Col9: "",
        Col10: "",
        UserID: sessionDetails.ExecutiveID,
      };

      const response = await axios.post(baseUrl, null, {
        params: params,
        headers: {
          Authorization: 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
        },
      });

      const data = response.data;
      console.log(data)
      if (data?.length === 0) {
        return alert('No Data Found')
      }
      // Function to map ClassID to the correct key in schoolDetails
      const getClassEnrolmentKey = (classID) => {
        switch (classID) {
          case -3:
            return 'ClassNryEnrol';
          case -2:
            return 'ClassLKGEnrol';
          case -1:
            return 'ClassUKGEnrol';
          default:
            return `Class${classID}Enrol`; // For Class IDs 1 to 12
        }
      };
      const rows = data.map((book, index) => {
        const { selectedSeries } = formData
        const classEnrolmentKey = getClassEnrolmentKey(book.ClassID); // Get the correct key
        const classEnrolment = schoolDetails[classEnrolmentKey] || 0; // Get enrolment value or default to 0
        const calculatedNetAmount = classEnrolment * (book.SingleTitleNetAmount || 0); // Calculate netAmount
        const seriesName = series?.find(s => s.Value_v === selectedSeries)?.Text_t || 'Unknown Series';
        return {
          inSeries: title === "Title in Series" ? true : false,
          BookCode: title === "Title in Series" ? book.BookCode : allBookData[0].BookCodes.replace(/,/g, ""),
          id: `${formData.selectedSeries}-${index}`, // Unique ID
          title: title === "Title in Series" ? book.BookName : seriesName, // BookName as Title
          // Series:title === "Title in Series"? book.BookName:null,
          classID: book.ClassID,
          netAmount: calculatedNetAmount, // Calculated netAmount
          competitorPublisher: '',
          Series: '',
          Title: '',
          AdoptionChances: '',
          PlanYear: invoiceYear, // Example fixed value
          OppValue: 1000,
          Qty: classEnrolment.toString(), // Quantity based on enrolment
          pipelineValue: '', // Placeholder for Pipeline Value input
          TitleRemark: '',
          TrnsSamplePlanDetailID: 1,
          iCompanyID: sessionDetails.iCompanyID
        };
      });

      // Add rows to the table
      setTableData((prevData) => [...prevData, ...rows]);
      setShowTable(true); // Show the table
      setFormData({
        selectedSubject: '',
        selectedSeries: '',
        quantity: '',
        discount: '',
        teacher: '',
        shipTo: '',
        samplingCopyType: '',
        samplingType: '',
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // console.log('------------',tableData)
      setLoading(false)
    }
  };


  const handleDeleteItem = (seriesId) => {
    // Remove the card from the order list
    const updatedOrderList = orderList.filter((item) => item.id !== seriesId);
    setOrderList(updatedOrderList);

    // Filter table rows that are associated with the same `seriesId`
    const updatedTableData = tableData.filter((row) => !row.id.startsWith(seriesId));
    setTableData(updatedTableData);

    // Hide the table if no rows are left
    if (updatedTableData.length === 0) {
      setShowTable(false);
    }
  };


  const updateTableRow = (id, field, value) => {
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
  };

  const loadCompPublisher = async () => {

    try {
      //console.log(classValue, formData.selectedSeries);
      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
      const params = {
        ActionType: "GetMasterPublisherComp",
        iCompanyID: sessionDetails.iCompanyID,
        Col1: "",
        Col2: "",
        Col3: "",
        Col4: "",
        Col5: "",
        Col6: "",
        UserID: sessionDetails.UserID,
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
      setCompetitorPublisher(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchCompetitorSeriesForRows = async (seriesId, publisherValue) => {
  //   try {
  //     const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
  //     const params = {
  //       ActionType: "GetMasterSeriesForPublisher",
  //       iCompanyID: 1,
  //       Col1: publisherValue, // Selected competitor publisher
  //       Col2: "",
  //       Col3: "",
  //       Col4: "",
  //       Col5: "",
  //       Col6: "",
  //       UserID: 785,
  //     };

  //     const response = await axios.post(baseUrl, null, {
  //       params: params,
  //       headers: {
  //         "Authorization": "Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC", // Basic Auth
  //       },
  //     });

  //     const seriesData = response.data;

  //     // Update `tableData` dynamically for rows with the same `seriesId`
  //     setTableData((prevData) =>
  //       prevData.map((row) =>
  //         row.id.startsWith(seriesId)
  //           ? { ...row, dynamicCompetitorSeries: seriesData }
  //           : row
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error fetching competitor series:", error);
  //   }
  // };

  const loadAdoptionChances = async () => {
    try {
      //console.log(classValue, formData.selectedSeries);
      const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
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

  const handleCompetitorPublisherChange = (seriesId, value) => {
    // Update the competitorPublisher for all rows with the same seriesId
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id.startsWith(seriesId) ? { ...row, competitorPublisher: value } : row
      )
    );
    // fetchCompetitorSeriesForRows(seriesId, value);
  };

  const handleCompetitorSeriesChange = (seriesId, field, value) => {
    // Update the competitorPublisher for all rows with the same seriesId
    setTableData((prevData) =>
      prevData.map((row) =>
        row.id.startsWith(seriesId) ? { ...row, [field]: value } : row
      )
    );
    // fetchCompetitorSeriesForRows(seriesId, value);
  };

  const handleAdoptionChancesChange = (id, value) => {
    // Update the competitorPublisher for all rows with the same seriesId
    const adoptionMultiplier = {
      "1": 0.95, // Sure
      "2": 0.75, // High
      "3": 0.50, // Medium
      "4": 0.25, // Low
      "5": 0.00, // LostTitle
    };

    setTableData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          const AdoptionValue = adoptionMultiplier[value] || 0;
          const updatedPipelineValue = row.netAmount * AdoptionValue;

          return {
            ...row,
            AdoptionChances: value,
            netAmount: updatedPipelineValue.toFixed(2), // Update pipeline value
          };
        }
        return row;
      })
    );
  };



  useEffect(() => {
    loadCompPublisher()
    loadAdoptionChances()
  }, [tableData, sessionDetails]);

  return (
    <View style={{ width: '100%' }}>
      {loading && <Loader />}
      {/* Dropdowns and Inputs */}
      <View style={styles.dropdownContainer}>
        <Text style={[styles.label, { marginTop: 10 }]}>Broad Subject</Text>
        
        <View style={[styles.pickerContainer,]}>
          <Picker
            selectedValue={formData.selectedSubject}
            onValueChange={(itemValue) => {
              handleInputChange('selectedSubject', itemValue);
              handleInputChange('selectedSeries', '');
            }}
            style={styles.picker}
          >
            <Picker.Item label="Select a subject" value="" />
            {boardSubject?.map((subject) => (
              <Picker.Item key={subject} label={subject.Text_t} value={subject.Value_v} />
            ))}
          </Picker>
        </View>
        
        {/* <IOSPicker
        data={[
          { label: "Select a subject", value: "" },
          ...(boardSubject?.map((subject) => ({
            label: subject.Text_t,
            value: subject.Value_v,
          })) || []),
        ]}
        selectedValue={formData.selectedSubject}
        onValueChange={(itemValue) => {
          handleInputChange("selectedSubject", itemValue);
          handleInputChange("selectedSeries", ""); // Reset series when subject changes
        }}
        placeholder="Select a subject"
        style={styles.picker}
      /> */}
      </View>
      {formData.selectedSubject && (
        <View style={styles.dropdownContainer}>
          <Text style={styles.label}>{title === "Title in Series" ? "Series" : "Title"}</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={formData.selectedSeries}
              onValueChange={(itemValue) => handleInputChange('selectedSeries', itemValue)}
              style={styles.picker}
            >
              <Picker.Item label={title === "Title in Series" ? "Select a series" : "Select a Title"} value="" />
              {/* {series && console.log(series)} */}
              {series && series.map((series) => (
                <Picker.Item key={series} label={series.Text_t} value={series.Value_v} />
              ))}
            </Picker>
          </View>
        </View>
      )}

      <View style={styles.pillContainer}>
        {allBookData.map((item, index) => (
          <TouchableOpacity
            key={`${item.booktypeId}-${index}`}
            style={[
              styles.pillButton,
              toggleValues.includes(item.booktypename)
                ? styles.selectedPill
                : styles.unselectedPill,
            ]}
            onPress={() => handleCheckboxChange(item.booktypename)}
          >
            <Text
              style={[
                styles.pillText,
                toggleValues.includes(item.booktypename)
                  ? styles.selectedPillText
                  : styles.unselectedPillText
              ]}
            >
              {item.booktypename}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Dropdowns for Sampling */}
      {/* {samplingRequest && (
        <>
          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Teacher</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.teacher}
                onValueChange={(itemValue) => handleInputChange('teacher', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Teacher" value="" />
                <Picker.Item label="Teacher 1" value="Teacher 1" />
                <Picker.Item label="Teacher 2" value="Teacher 2" />
                <Picker.Item label="Teacher 3" value="Teacher 3" />
              </Picker>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Ship To</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.shipTo}
                onValueChange={(itemValue) => handleInputChange('shipTo', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Shipping Location" value="" />
                <Picker.Item label="Location 1" value="Location 1" />
                <Picker.Item label="Location 2" value="Location 2" />
                <Picker.Item label="Location 3" value="Location 3" />
              </Picker>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Sampling Copy Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.samplingCopyType}
                onValueChange={(itemValue) => handleInputChange('samplingCopyType', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Copy Type" value="" />
                <Picker.Item label="Copy Type 1" value="Copy Type 1" />
                <Picker.Item label="Copy Type 2" value="Copy Type 2" />
                <Picker.Item label="Copy Type 3" value="Copy Type 3" />
              </Picker>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.label}>Sampling Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.samplingType}
                onValueChange={(itemValue) => handleInputChange('samplingType', itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Select Sampling Type" value="" />
                <Picker.Item label="Sampling Type 1" value="Sampling Type 1" />
                <Picker.Item label="Sampling Type 2" value="Sampling Type 2" />
                <Picker.Item label="Sampling Type 3" value="Sampling Type 3" />
              </Picker>
            </View>
          </View>
        </>
      )} */}
      <View style={{ paddingBottom: 10 }} >
        {title === "Title in Series" && allBookData?.map((item, index) => (
          <Text key={index}>{item.booktypename}: {item.AvailableBookNums}</Text>
        ))}
      </View>
      {/* Add to List Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          if (!schoolDetails) {
            alert("Please select the school details.");
            return;
          }

          if (!invoiceYear) {
            alert("Please select the invoice year.");
            return;
          }

          if (!invoiceMonth) {
            alert("Please select the invoice month.");
            return;
          }

          if (!sampleYear) {
            alert("Please select the sample year.");
            return;
          }

          if (!sampleMonth) {
            alert("Please select the sample month.");
            return;
          }

          // Check toggle values based on `samplingRequest`
          if (samplingRequest) {
            if (!Object.values(toggleValues).some((val) => val)) {
              alert("Please check class num or class level");
              return;
            }
          } else if (!toggleValues || toggleValues.length === 0) {
            alert("Please check class num or class level");
            return;
          }

          // If all validations pass, proceed
          handleAddToList();
          handleAddToTable();
        }}
      >
        <Text style={styles.addButtonText}>Add to List</Text>
      </TouchableOpacity>


      {/* Custom Card View for Order List */}
      <View style={{ width: '100%' }}>
        {/* Custom Card View for Order List */}
        <View>
          {orderList.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.cardText}>Subject: {item.displayData.subjectName}</Text>
              <Text style={styles.cardText}>Series/Title: {item.displayData.seriesName}</Text>
              <Text style={styles.cardText}>
                {samplingRequest
                  ? Object.entries(item.toggles).map(([key, value]) => `${key.toUpperCase()}: ${value}`).join(', ')
                  : item.toggles.join(', ')}
              </Text>
              <Text style={styles.cardText}>Invoice Year: {invoiceYear}</Text>
              <Text style={styles.cardText}>Invoice Month: {months[invoiceMonth-1]}</Text>
              <Text style={styles.cardText}>Sample Year: {sampleYear}</Text>
              <Text style={styles.cardText}>Sample Month: {months[sampleMonth-1]}</Text>
              <TouchableOpacity
                onPress={() => handleDeleteItem(item.id)}
                style={styles.deleteButton}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Show table only if showTable is true */}
        {showTable && (
          <View style={styles.tableContainer}>
            {tableData.map((row, index) => (
              <View key={row.id} style={styles.card}>
                <Text style={styles.cardText}>
                  <Text style={styles.boldText}>S.NO:</Text> {index + 1}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.boldText}>Title:</Text> {row.title}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.boldText}>Quantity:</Text> {row.Qty}
                </Text>
                <Text style={styles.cardText}>
                  <Text style={styles.boldText}>Pipeline Value:</Text> {row.netAmount}
                </Text>
                <View style={[styles.pickerContainer, { marginBottom: 10, backgroundColor: '#ffff' }]}>
                  <Picker
                    selectedValue={row.competitorPublisher}
                    style={styles.picker}
                    onValueChange={(value) =>
                      handleCompetitorPublisherChange(row.id.split('-')[0], value) // Pass seriesId
                    }
                  >
                    <Picker.Item label="Select Competitor Publisher" value="" />
                    {competitorPublisher.map((publisher) => (
                      <Picker.Item
                        key={publisher.Value_v}
                        label={publisher.Text_t}
                        value={publisher.Value_v}
                      />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  placeholder="Competitor Series"
                  style={styles.input}
                  value={row.Series}
                  onChangeText={(value) =>
                    handleCompetitorSeriesChange(row.id.split('-')[0], 'Series', value)
                  }
                />
                <TextInput
                  placeholder="Competitor Title"
                  style={styles.input}
                  value={row.Title}
                  onChangeText={(value) =>
                    handleCompetitorSeriesChange(row.id.split('-')[0], 'Title', value)
                  }
                />
                <View style={[styles.pickerContainer, { marginBottom: 10, backgroundColor: '#ffff' }]}>
                  <Picker
                    selectedValue={row.AdoptionChances}
                    style={styles.picker}
                    onValueChange={(value) =>
                      handleAdoptionChancesChange(row.id, value) // Pass seriesId
                    }
                  >
                    <Picker.Item label="Select Adoption Chances" value="" />
                    {adoptionChances.map((chance) => (
                      <Picker.Item
                        key={chance.Value_v}
                        label={chance.Text_t}
                        value={chance.Value_v}
                      />
                    ))}
                  </Picker>
                </View>
                <TextInput
                  placeholder="Remark"
                  style={styles.input}
                  value={row.TitleRemark}
                  onChangeText={(value) => updateTableRow(row.id, 'TitleRemark', value)}
                />
              </View>
            ))}

            <Text style={styles.totalText}>
              Total Pipeline Value: {Number(totalNetAmount).toFixed(2)}
            </Text>
          </View>

        )}

      </View>
    </View>
  );
};

export default OrderProcess;

const styles = StyleSheet.create({
  dropdownContainer: { marginBottom: 20 },
  label: { fontSize: 12, color: '#00000095', marginBottom: 5 },
  dropdown: { backgroundColor: '#f1f1f1', borderRadius: 5, padding: 10 },
  dropdownItem: { padding: 10 },
  selectedItem: { backgroundColor: PrimaryColorLight },
  itemText: { fontSize: 14 },
  selectedItemText: { color: PrimaryColor },
  pillContainer: {
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap', // Enable wrapping for rows
    gap: 0,
  },
  pillButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25, // High corner radius for pill shape
    margin: 5,
  },
  selectedPill: {
    backgroundColor: PrimaryColorLight,
    // borderWidth: 1,
    // borderColor: '#0a61c990',
  },
  unselectedPill: {
    backgroundColor: '#00000015',
  },
  pillText: {
    fontSize: 12,
  },
  selectedPillText: {
    color: PrimaryColor,
    fontWeight: 500
  },
  unselectedPillText: {
    color: '#00000090',
    fontWeight: 500
  },
  addButton: { backgroundColor: PrimaryColor, padding: 10, borderRadius: 5, marginBottom: 20 },
  addButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  card: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: { fontSize: 14, marginBottom: 5 },
  deleteButton: { backgroundColor: '#ff4d4d', padding: 8, borderRadius: 5 },
  deleteButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  dropdownContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#00000090',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    height: 45,
  },
  picker: {
    marginTop: -6,
    color: '#00000090',
  },
  numericInput: {
    borderWidth: 1,
    borderColor: '#00000045',
    width: 56,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 20
  },
  tableContainer: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 8,
    color: '#000',
  },
  boldText: {
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },

});
