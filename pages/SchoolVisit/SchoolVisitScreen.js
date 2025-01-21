import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
    Platform,
} from "react-native";
import BG from '../../assets/Images/schoolvisitbg.jpg';
import Dropdown from "../../Components/Dropdown/Dropdown";
import AnimatedHeader from "../AnimatedHeader";
import SchoolDetails from "./SchoolDetails/SchoolDetails";
import FormWithFloatingLabels from "./VisitForm";
import Enrollment from "./SchoolDetails/Enrollment";
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { PrimaryColor, PrimaryColorLight, PrimaryColorLight2, PrimaryColorLight3 } from "../../globalCSS";
import Titles from "../../Components/Titles/Titles";
import DropdownForm from "../../Components/AdditionalOptions/AdditionalOptions";
import RenewalOpportunities from "../../Components/RenewalOpportunities/RenewalOpportunities";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import SamplingRequest from "../../Components/Titles/SamplingRequest";
import useSessionDetails from "../../Contexts/sessionDetails";
import Loader from "../../Components/Loader.js";
import SamplingHistory from "../../Components/SamplingHistory.js";

const SchoolVisitScreen = () => {
    const sessionDetails = useSessionDetails()
    const [schoolInput, setSchoolInput] = useState('');
    const [renewalOpportunitiesTable, setRenewalOpportunitiesTable] = useState()
    const [schoolId, setSchoolId] = useState('');
    const [schoolData, setSchoolData] = useState('');
    const [activeTab, setActiveTab] = useState("Visit");
    const [orderData, setOrderData] = useState([])
    const navigation = useNavigation()
    const [cards, setCards] = useState([]);
    const [formDataVD, setFormDataVD] = useState({
        executive: "",
        visitedWith: "",
        purpose: "",
        visitDate: new Date(),
        reason: "",
        demoBy: "",
        demoType: "",
        selectedEPM: "",
        feedback: "",
        followUp: false,
        followUpDate: new Date(),
        followUpAction: "",
        remark: "",
    });
    const [formData, setFormData] = useState({
        selectedSubject: '',
        selectedSeries: '',
        quantity: '',
        discount: '',
        teacher: '',
        shipTo: '',
        samplingCopyType: '',
        samplingType: '',
        shipmentMode: '',
        samplingInstructions: '',
        selectedSubjectSR: '',
        selectedSeriesSR: '',
    });
    const [tableData, setTableData] = useState([]);
    const [businessdetails, setbusinessdetails] = useState()
    const [details, setDetails] = useState([])
    const [tableDataSR, setTableDataSR] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [selectedLevels, setSelectedLevels] = useState([]);
    const [selectedLevelsSR, setSelectedLevelsSR] = useState([]);
    const [invoiceYear, setInvoiceYear] = useState('');
    const [invoiceMonth, setInvoiceMonth] = useState('');
    const [sampleYear, setSampleYear] = useState('');
    const [sampleMonth, setSampleMonth] = useState('');
    const [classValue, setClassValue] = useState()
    const [showTable, setShowTable] = useState(false);
    const [classType, setClassType] = useState("Class Level");
    const [classValueSR, setClassValueSR] = useState()
    const classLevels = ['All', 'Pre Primary', 'Primary', 'Middle', 'Secondary', 'Sr. Secondary'];
    const classNum = ['All', 'Nry', 'LKG', 'UKG', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    const [salesPlanDetailData, setSalesPlanDetailData] = useState([]);
    const [salesPlanData, setSalesPlanData] = useState([]);
    const [samplingRequestData, setSamplingRequestData] = useState([])
    const [samplingRequestDetailData, setSamplingRequestDetailData] = useState([])
    const [loading, setLoading] = useState(false)
    const [renewalOpportunitiesData, setRenewalOpportunitiesData] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const classValues = {
        "All": [],
        "Pre Primary": [-3, -2, -1],
        "Primary": [1, 2, 3, 4, 5],
        "Middle": [6, 7, 8],
        "Secondary": [9, 10],
        "Sr. Secondary": [11, 12],
        "Nry": [-3],
        "LKG": [-2],
        "UKG": [-1],
        "1": [1],
        "2": [2],
        "3": [3],
        "4": [4],
        "5": [5],
        "6": [6],
        "7": [7],
        "8": [8],
        "9": [9],
        "10": [10],
        "11": [11],
        "12": [12],
    };
    function generateRandom10DigitNumber() {
        return (Math.floor(1000000000 + Math.random() * 9000000000)).toString();
    }
    function generateRandom4DigitString() {
        return (Math.floor(1000 + Math.random() * 9000)).toString();
    }
    const OnSubmit = async () => {
        // console.log("+++---",tableData)
        // console.log("++++++",salesPlanData)
        console.log("------",salesPlanDetailData)
        // console.log('=+++===+++===+++=', samplingRequestData)
        // console.log('_>_>_>_>_>_>_>_>_>', samplingRequestDetailData)
        const {
            purpose,
            visitDate,
            reason,
            demoBy,
            demoType,
            selectedEPM,
            feedback,
            followUp,
            followUpDate,
            followUpAction,
            remark
        } = formDataVD;

        // Validate required fields with individual alerts
        if (!purpose) {
            alert("Purpose is required.");
            return; // Stop execution if invalid
        }

        if (!visitDate) {
            alert("Visit Date is required.");
            return;
        }

        if (!reason) {
            alert("Reason is required.");
            return;
        } else if (reason.length <= 50) {
            alert("Reason must be greater than 50 characters.");
            return;
        }

        if (!feedback) {
            alert("Feedback is required.");
            return;
        } else if (feedback.length <= 50) {
            alert("Feedback must be greater than 50 characters.");
            return;
        }

        if (purpose === 3) {
            if (!demoBy) {
                alert("Demo By is required.");
                return;
            }
            if (!demoType) {
                alert("Demo Type is required.");
                return;
            }
            if (demoBy === "DemoByEPM" && !selectedEPM) {
                alert("Selected EPM is required.");
                return;
            }
        }

        if (followUp) {
            if (!followUpDate) {
                alert("Follow-Up Date is required.");
                return;
            }
            if (!followUpAction) {
                alert("Follow-Up Action is required.");
                return;
            }
            if (!remark) {
                alert("Remark is required.");
                return;
            }
        }

        if (salesPlanDetailData && salesPlanDetailData.length > 0) {
            const invalidEntries = salesPlanDetailData.filter(item => 
                !item.AddoptionChances || !item.CompPublisher || !item.Title || !item.Series
            );
            if (invalidEntries.length > 0) {
                alert("Sales Plan Data is invalid. Ensure 'Adoption Chances', 'Publisher', 'Title', and 'Series' are filled for all entries.");
                return;
            }
        }

        setLoading(true)
        try {
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_InsertVisitEntryMaster";
            const body = {
                "jsonObj": {
                    "AppId": generateRandom4DigitString(),
                    "Approved": false,
                    "ApprovedBy": 0,
                    "ApprovedOn": "",
                    "BillToAddress": null,
                    "CityID": 0,
                    "CreatedBy": 0,
                    "CreatedOn": "",
                    "CustomerCode": schoolId,
                    "DemoBy": formDataVD.demoBy,
                    "DemoType": formDataVD.demoType,
                    "EstimatedOrgValue": 0,
                    "ExecutiveConfirmation": null,
                    "ExecutiveConfirmRemarks": null,
                    "ExecutiveID": sessionDetails.ExecutiveID,
                    "FinancialPeriod": null,
                    "FollowUp": formDataVD.followUp,
                    "FollowUpAction": formDataVD.followUpAction,
                    "FollowUpDate": formDataVD.followUpDate.toISOString(),
                    "FollowUpRemark": formDataVD.remark,
                    "iBranchID": 0,
                    "iCompanyID": 0,
                    "InvoiceMonth": 12,
                    "InvoiceYear": "2024",
                    "IP": null,
                    "isTemp": false,
                    "JointExecutiveID": formDataVD.selectedEPM,
                    "Latitude": null,
                    "LocationStatus": null,
                    "Longitude": null,
                    "MainContactID": 0,
                    "OrganizationCode": null,
                    "OtherExecutiveIDs": formDataVD?.visitedWith ? formDataVD?.visitedWith.join(","):'',
                    "OutCome": null,
                    "Plant_SAPCode": null,
                    "Remark": formDataVD.feedback,
                    "SalesOffice_SAPCode": null,
                    "SampleMonth": 12,
                    "SampleYear": "2024",
                    "SamplingWOVisitId": 0,
                    "SAPOrderNo": null,
                    "shipingInstruction": null,
                    "ShipmentMode": null,
                    "ShipmentStatus": null,
                    "ShippingAddress": null,
                    "ShipTo": null,
                    "ShipToAddressType": null,
                    "SourceofLead": null,
                    "Status": null,
                    "TabID": generateRandom10DigitNumber(),
                    "TVAppId": 0,
                    "TVUniqueID": 0,
                    "UpdateTime": "",
                    "UserDefinedField1": null,
                    "UserDefinedField10": null,
                    "UserDefinedField2": null,
                    "UserDefinedField3": null,
                    "UserDefinedField4": null,
                    "UserDefinedField5": null,
                    "UserDefinedField6": null,
                    "UserDefinedField7": null,
                    "UserDefinedField8": null,
                    "UserDefinedField9": null,
                    "UserID": 0,
                    "VisitDate": formDataVD.visitDate.toISOString(),
                    "VisitNo": null,
                    "VisitPurpose": formDataVD.purpose,
                    "VisitReason": formDataVD.reason
                },
                "SamplingRequstData": formDataVD?.purpose === 3 ? null : samplingRequestData,
                "SamplingRequstDetailData": formDataVD?.purpose === 3 ? null : samplingRequestDetailData,
                "SalesPlanData": salesPlanData ? salesPlanData : null,
                "SalesPlanDetailData": salesPlanDetailData ? salesPlanDetailData : null,
                "RenewalOpportunitiesData": renewalOpportunitiesData ? renewalOpportunitiesData : null,
                "iCompanyID": 1,
                "UserID": sessionDetails.ExecutiveID
            };

            const url = `${baseUrl}`;
            // console.log('Request URL:', url);

            // Make the POST request using axios
            console.log(body)
            const response = await axios.post(url, body, {
                headers: {
                    "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
                },
            });

            // Access the data from the response
            const data = response.data;
            alert(`${data[0].ShowStatus}`)
            setFormDataVD({
                visitedWith: "",
                purpose: "",
                visitDate: new Date(),
                reason: "",
                demoBy: "",
                demoType: "",
                selectedEPM: "",
                feedback: "",
                followUp: false,
                followUpDate: new Date(),
                followUpAction: "",
                remark: "",
            })
            setFormData({
                selectedSubject: '',
                selectedSeries: '',
                quantity: '',
                discount: '',
                teacher: '',
                shipTo: '',
                samplingCopyType: '',
                samplingType: '',
                shipmentMode: '',
                samplingInstructions: '',
                selectedSubjectSR: '',
                selectedSeriesSR: '',
            })
            setOrderList([])
            setTableData([])
            setSalesPlanData([])
            setSalesPlanDetailData([])
            setInvoiceMonth('')
            setInvoiceYear('')
            setSampleMonth('')
            setSampleYear('')
            setCards([])
            setTableDataSR([])
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const filteredData = orderList?.map((item) => ({
            BookCode: item.BookCode || null,
            CB_Qty: item.CB_Qty || 0,
            CD_Qty: item.CD_Qty || 0,
            ClassLevel_ConCat: item.ClassLevel_ConCat || null,
            ClassNum_ConCat: item.ClassNum_ConCat || null,
            InvoiceMonthID: item.InvoiceMonthID || null,
            InvoiceYearID: item.InvoiceYearID || "2024",
            LR_Qty: item.LR_Qty || null,
            SampleMonthID: item.SampleMonthID || 12,
            SampleYearID: item.SampleYearID || "2024",
            SeriesID: item.SeriesID || null,
            SubjectID: item.selectedSubject || null,
            TB_Qty: item.TB_Qty || 0,
            TrnsSamplePlanDetailID: item.TrnsSamplePlanDetailID || 1,
            WB_Qty: item.WB_Qty || 0,
            iCompanyID: item.iCompanyID || 0,
        }));
        setSalesPlanData(filteredData);
    }, [orderList]);

    //salesPlanDetailsData
    const extractRelevantData = () => {
        const extractedData = tableData?.map((item) => ({
            AddoptionChances: item.AdoptionChances || null,
            BookCode: item.BookCode || null,
            CompPublisher: item.competitorPublisher || null,
            OppValue: item.OppValue || null,
            PlanYear: item.PlanYear || null,
            Qty: item.Qty || null,
            Series: item.Series || null,
            Title: item.Title || null,
            TitleRemark: item.TitleRemark || null,
            TrnsSamplePlanDetailID: item.TrnsSamplePlanDetailID || 1,
            iCompanyID: item.iCompanyID || 0,
        }));
        setSalesPlanDetailData(extractedData);
    };
    useEffect(() => {
        if (tableData && tableData.length > 0) {
            extractRelevantData();
        }
    }, [tableData]); // Run whenever tableData updates

    useEffect(() => {
        const newFilteredCards = cards?.map(card => {
            const {
                cardId,
                shipment_Mode,
                subject,
                teacher,
                ship_To,
                series,
                sampling_Copy_Type,
                sampling_Type,
                sampling_Instructions,
                bookQuantities,
                ...rest
            } = card; // Destructure and remove unwanted fields

            return rest; // Return only the rest of the data
        });
        setSamplingRequestData(newFilteredCards);
    }, [cards]);


    useEffect(() => {
        // Filter only the specified fields
        const filteredData = renewalOpportunitiesTable?.map(
            ({
                AdoptionChance,
                BookCode,
                OriginalQty,
                Qty,
                TitleRemark,
                TransactionID,
            }) => ({
                AdoptionChance,
                BookCode,
                OriginalQty,
                Qty,
                TitleRemark,
                TransactionID,
            })
        );

        setRenewalOpportunitiesData(filteredData);
    }, [renewalOpportunitiesTable]);

    useEffect(() => {
        const newFilteredCards = tableDataSR?.map(details => {
            const {
                BookName,
                cardId,
                ...rest
            } = details; // Destructure and remove unwanted fields

            return rest; // Return only the rest of the data
        });
        setSamplingRequestDetailData(newFilteredCards);
    }, [tableDataSR]);


    const fetchData = async () => {
        setLoading(true)
        try {
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonComboLoader";
            const params = {
                ActionType: "GetAllTypeCustomerWithSearch",
                iCompanyID: sessionDetails.iCompanyID,
                Col1: "School",
                Col2: "",
                Col3: "",
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

            // Set the state with the fetched data
            setOrderData(data);
        } catch (error) {
            console.log('+++====+++====+++')
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };
    const [totalNetAmount, setTotalNetAmount] = useState(0);

    useEffect(() => {
        const total = tableData.reduce((sum, row) => {
            const netAmount = parseFloat(row.netAmount) || 0; // Ensure netAmount is a valid number
            console.log("Row Net Amount:", netAmount); // Debugging
            return sum + netAmount;
        }, 0);

        console.log("Calculated Total:", total); // Debugging
        setTotalNetAmount(total);
    }, [tableData]);

    const fetchSchoolDetails = async () => {
        try {
            setLoading(true)
            // Construct the URL with query parameters
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_FindCommonDataForEdit";
            const params = {
                ActionType: "GetSchoolDetails",
                iCompanyID: sessionDetails.iCompanyID,
                LoadId: schoolId,
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
            setSchoolData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    }
    const loadTable = async () => {
        try {
            // console.log(classValue, formData.selectedSeries);
            const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_GetCommonDataFromDB";
            const params = {
                ActionType: "GetOppurtunitySchoolWise",
                iCompanyID: sessionDetails.iCompanyID,
                iBranchID: 1,
                FinancialPeriod: '2024-2024',
                Col1: schoolId,
                Col2: "",
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
            console.log(data)
            const filteredTable = data?.filter(
                (item) => item.TBLType === "olddata"
            );
            setRenewalOpportunitiesTable(filteredTable);
            const filteredTableSP = data?.filter(
                (item) => item.TBLType === "SalesPlan"
            );
            const mappedTableData = filteredTableSP?.map((book, index) => {
                return {
                    BookCode: book.BookCode,
                    id: book.BookCode,
                    title: book.BookName,
                    classID: book.ClassID || null, // Assuming ClassID is part of the data
                    netAmount: book.SingleTitleNetAmount * book.Qty,
                    competitorPublisher: book.CompPublisher,
                    Series: book.CompSerirs,
                    Title: book.CompTitle,
                    AdoptionChances: book.AdoptionChance || "",
                    PlanYear: book.PlanYear,
                    OppValue: 1000,
                    Qty: book.Qty,
                    pipelineValue: "",
                    TitleRemark: book.TitleRemark || "",
                    TrnsSamplePlanDetailID: 1,
                };
            });
            setTableData(mappedTableData)
            setShowTable(true)
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    // const fetchBusinessDetails = async () => {
    //     try {
    //         // Construct the URL with query parameters
    //         const baseUrl = "https://visitmcm.cloudpub.in/api/CRM_FindCommonDataForEdit";
    //         const params = {
    //             ActionType: "GetSchoolDetails",
    //             iCompanyID: 1,
    //             LoadId: schoolId,
    //             UserID: 785,
    //         };

    //         const url = `${baseUrl}`;

    //         // Make the POST request using axios
    //         const response = await axios.post(url, null, {
    //             params: params, // Send the params as query parameters
    //             headers: {
    //                 "Authorization": 'Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC', // Basic Auth
    //             },
    //         });
    //         const data = response.data[0];
    //         setbusinessdetails(data);
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        if (sessionDetails) {
            fetchData();
        }
    }, [sessionDetails]);
    useEffect(() => {
        if (schoolId) {
            fetchSchoolDetails();
            loadTable()
        }
    }, [schoolId])
    const handleCheckboxChange = (level) => {
        const currentArray = classType === 'Class Level' ? classLevels : classNum;

        if (level === 'All') {
            const allSelected = selectedLevels.length === currentArray.length - 1;
            const newSelectedLevels = allSelected ? [] : [...currentArray.slice(1)];
            setSelectedLevels(newSelectedLevels);
            setClassValue(newSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        } else {
            const newSelectedLevels = selectedLevels.includes(level)
                ? selectedLevels.filter(option => option !== level)
                : [...selectedLevels, level];

            const areAllSelected = currentArray.slice(1).every(option => newSelectedLevels.includes(option));
            const finalSelectedLevels = areAllSelected ? [...currentArray.slice(1)] : newSelectedLevels;

            setSelectedLevels(finalSelectedLevels);
            setClassValue(finalSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        }
    };

    const handleCheckboxChangeSR = (level) => {
        const currentArray = classType === 'Class Level' ? classLevels : classNum;

        if (level === 'All') {
            const allSelected = selectedLevelsSR.length === currentArray.length - 1;
            const newSelectedLevels = allSelected ? [] : [...currentArray.slice(1)];
            setSelectedLevelsSR(newSelectedLevels);
            setClassValueSR(newSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        } else {
            const newSelectedLevels = selectedLevelsSR.includes(level)
                ? selectedLevelsSR.filter(option => option !== level)
                : [...selectedLevelsSR, level];

            const areAllSelected = currentArray.slice(1).every(option => newSelectedLevels.includes(option));
            const finalSelectedLevels = areAllSelected ? [...currentArray.slice(1)] : newSelectedLevels;

            setSelectedLevelsSR(finalSelectedLevels);
            setClassValueSR(finalSelectedLevels.flatMap(option => classValues[option] || []).join(','));
        }
    };

    const dropdownOptions = orderData?.map((item) => ({ id: item.Value_v, name: item.Text_t }))
    const renderTabContent = () => {
        switch (activeTab) {
            case "Visit":
                return (
                    <>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', marginVertical: '15' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Enrollment", {schoolId })} style={{ backgroundColor: PrimaryColorLight3, paddingHorizontal: 20, paddingVertical: 10, flexDirection: 'row', justifyContent: 'center', borderColor: PrimaryColorLight3, borderWidth: 1, borderRadius: 10 }}>
                                <Text style={{ width: 115, color: PrimaryColor }}>Enrollment Details</Text>
                            </TouchableOpacity>
                        </View>
                        <SchoolDetails details={schoolData} />
                        <FormWithFloatingLabels formData={formDataVD} schoolId={schoolId} OnSubmit={OnSubmit} setFormData={setFormDataVD} isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
                    </>
                );
            case "Sales":
                return (
                    <View style={styles.container}>
                        <Titles
                            schoolCode={schoolId}
                            salesPlan
                            schoolData={schoolData}
                            formData={formData}
                            setFormData={setFormData}
                            tableData={tableData}
                            setTableData={setTableData}
                            orderList={orderList}
                            setOrderList={setOrderList}
                            selectedLevels={selectedLevels}
                            setSelectedLevels={setSelectedLevels}
                            invoiceMonth={invoiceMonth}
                            setInvoiceMonth={setInvoiceMonth}
                            invoiceYear={invoiceYear}
                            setInvoiceYear={setInvoiceYear}
                            sampleMonth={sampleMonth}
                            setSampleMonth={setSampleMonth}
                            sampleYear={sampleYear}
                            setSampleYear={setSampleYear}
                            handleCheckboxChange={handleCheckboxChange}
                            classType={classType}
                            setClassType={setClassType}
                            classValue={classValue}
                            setClassValue={setClassValue}
                            showTable={showTable}
                            setShowTable={setShowTable}
                            totalNetAmount={totalNetAmount}
                            OnSubmit={OnSubmit}
                        />

                    </View>)
            case "Sampling":
                return (
                    <View style={styles.container}>
                        <SamplingRequest
                            schoolCode={schoolId}
                            salesPlan
                            schoolData={schoolData}
                            formData={formData}
                            setFormData={setFormData}
                            tableData={tableData}
                            setTableData={setTableData}
                            orderList={orderList}
                            setOrderList={setOrderList}
                            selectedLevelsSR={selectedLevelsSR}
                            setSelectedLevelsSR={setSelectedLevelsSR}
                            invoiceMonth={invoiceMonth}
                            setInvoiceMonth={setInvoiceMonth}
                            invoiceYear={setInvoiceYear}
                            setInvoiceYear={setInvoiceYear}
                            sampleMonth={sampleMonth}
                            setSampleMonth={setSampleMonth}
                            sampleYear={sampleYear}
                            setSampleYear={setSampleYear}
                            handleCheckboxChangeSR={handleCheckboxChangeSR}
                            classType={classType}
                            setClassType={setClassType}
                            classValueSR={classValueSR}
                            setClassValueSR={setClassValueSR}
                            showTable={showTable}
                            setShowTable={setShowTable}
                            cards={cards}
                            tableDataSR={tableDataSR}
                            setTableDataSR={setTableDataSR}
                            setCards={setCards}
                            OnSubmit={OnSubmit} />

                    </View>)
            case "Renewal":
                return <RenewalOpportunities schoolID={schoolId} details={details} setdetails={setDetails} renewalOpportunitiesTable={renewalOpportunitiesTable} setRenewalOpportunitiesTable={setRenewalOpportunitiesTable} OnSubmit={OnSubmit} />;
            case "History":
                return <SamplingHistory schoolId={schoolId} />;
            default:
                return null;
        }
    };

    return (
        <AnimatedHeader title="School Visit">
            {/* Background Image */}
            <Image
                source={BG}
                style={[styles.backgroundImage, Platform.OS==='ios'&&{borderBottomLeftRadius:0, borderBottomRightRadius: 0,}]}
            />

            {/* Dropdown */}
            <View style={styles.dropdownContainer}>
                <Dropdown
                    dropdownOptions={dropdownOptions}
                    selectedValue={schoolInput}
                    onValueChange={(value) => {
                        setSchoolInput(value);
                    }}
                    id={(value) => {
                        setSchoolId(value);
                    }}
                    rounded
                    transparent
                />
            </View>
            {loading && <Loader />}

            {/* Tabs (Horizontal Scroll) */}
            <View style={styles.tabsWrapper}>
                <ScrollView horizontal style={styles.tabsContainer} showsHorizontalScrollIndicator={false}>
                    {(formDataVD?.purpose === 3 || formDataVD?.purpose === 1 ?
                        [
                            "Visit",
                            "Sales",
                            "Renewal",
                            "History",]
                        :
                        [
                            "Visit",
                            "Sales",
                            "Sampling",
                            "Renewal",
                            "History",
                        ]).map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                style={[
                                    styles.tabButton,
                                    activeTab === tab && styles.activeTabButton,
                                ]}
                                onPress={() => setActiveTab(tab)}
                            >
                                {/* Using Expo's icons */}
                                {tab === "Visit" && (
                                    <FontAwesome5 name="truck" size={15} color={activeTab === tab ? PrimaryColor : "#333"} />
                                )}
                                {tab === "Sales" && (
                                    <FontAwesome5 name="gifts" size={15} color={activeTab === tab ? PrimaryColor : "#333"} />
                                )}
                                {tab === "Sampling" && (
                                    <FontAwesome5 name="file-alt" size={16} color={activeTab === tab ? PrimaryColor : "#333"} />
                                )}
                                {tab === "Renewal" && (
                                    <MaterialIcons name="autorenew" size={20} color={activeTab === tab ? PrimaryColor : "#333"} />
                                )}
                                {tab === "History" && (
                                    <MaterialIcons name="history" size={20} color={activeTab === tab ? PrimaryColor : "#333"} />
                                )}
                                <Text
                                    style={[
                                        styles.tabText,
                                        activeTab === tab && styles.activeTabText,
                                    ]}
                                >
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))}
                </ScrollView>
            </View>

            {/* Scrollable Content */}
            <ScrollView style={styles.scrollView}>
                <View style={styles.contentContainer}>{renderTabContent()}</View>
            </ScrollView>
        </AnimatedHeader>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 20,
        justifyContent: 'center',
        margin: 5,
        borderRadius: 20,
        backgroundColor: 'white',
        boxShadow: '0px 1px 3px #00000020'
    },
    backgroundImage: {
        width: "100%",
        height: 250,
        position: "relative",
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    dropdownContainer: {
        position: "absolute",
        width: "100%",
        top: 180,
        flexDirection: "row",
        justifyContent: "center",
        paddingHorizontal: 25,
        zIndex: 10,
    },
    tabsWrapper: {
        position: "absolute",
        width: "100%",
        top: 240, // Below the dropdown
        zIndex: 7,
    },
    tabsContainer: {
        flexDirection: "row",
        // alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // Slightly transparent background
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginHorizontal: 25
    },
    tabButton: {
        flexDirection: 'row',
        gap: 4,
        alignItems: "center",
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 10,
        marginRight: 0,
    },
    activeTabButton: {
        backgroundColor: PrimaryColorLight3, // Primary color for active tab
        borderColor: PrimaryColorLight,
        borderWidth: 0.5
    },
    tabText: {
        fontSize: 12,
        color: "#333",
    },
    activeTabText: {
        color: PrimaryColor,
        fontWeight: "bold",
    },

    contentContainer: {
        paddingBottom: 50, // Add padding to avoid cutting off content
    },
    dummyText: {
        fontSize: 16,
        color: "#666",
        textAlign: "center",
        marginTop: 20,
    },
});

export default SchoolVisitScreen;
