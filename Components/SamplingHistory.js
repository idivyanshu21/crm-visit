import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import useSessionDetails from "../Contexts/sessionDetails";
import Loader from "./Loader";
import axios from "axios";

const SamplingHistory = ({ schoolId }) => {
    const [loading, setLoading] = useState(false);
    const [historyData, setHistoryData] = useState([]);
    const sessionDetails = useSessionDetails();

    const fetchHistory = async () => {
        const today = new Date();
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(today.getDate() - 3); 
        const isoDateThreeDaysAgo = threeDaysAgo.toISOString().split('T')[0];
        const isoDate = today.toISOString().split('T')[0];
        try {
            setLoading(true);
            const baseUrl = "https://visitcrm.cloudpub.in/api/CRM_SchoolSamplingReport";
            const params = {
                ActionType: "GetSchoolSamplingData",
                RequestedBy: sessionDetails.ExecutiveID,
                RequestFromDate: isoDateThreeDaysAgo,
                RequestToDate: isoDate,
                ValidationFromDate: isoDate,
                ValidationToDate: isoDate,
                Status: "P,S,V,R,W,",
                iCompanyID: sessionDetails.iCompanyID,
                UserID: sessionDetails.UserID,
                SchoolID: schoolId,
            };

            const response = await axios.post(baseUrl, null, {
                params: params,
                headers: {
                    Authorization: "Basic LTExOkRDNkY3Q0NCMkRBRDQwQkI5QUYwOUJCRkYwN0MyNzNC",
                },
            });

            const data = response.data;
            console.log("Fetched Data:", data);
            setHistoryData(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [sessionDetails, schoolId]);

    return (
        <>
            {loading && <Loader />}
            {!loading && historyData.length === 0 && (
                <Text style={styles.noDataText}>No data to show</Text>
            )}
            {!loading && historyData.length > 0 && (
                <FlatList
                    data={historyData}
                    keyExtractor={(item) => item.TransactionID.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <View style={styles.row}>
                                <Text style={styles.label}>Request Date:</Text>
                                <Text style={styles.value}>{item.RequestDate}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Requested By:</Text>
                                <Text style={styles.value}>{item.RequestedBy}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>TrnsDocNo:</Text>
                                <Text style={styles.value}>{item.TrnsDocNo}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Validated By:</Text>
                                <Text style={styles.value}>{item.ValidatedBy || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Validation Date:</Text>
                                <Text style={styles.value}>{item.ValidationDate || "N/A"}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>School:</Text>
                                <Text style={styles.value}>{item.School}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Teacher:</Text>
                                <Text style={styles.value}>{item.Teacher}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Shipping Address:</Text>
                                <Text style={styles.value}>{item.State}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.label}>Status:</Text>
                                <Text style={[styles.value, styles.status]}>{item.Status}</Text>
                            </View>
                        </View>
                    )}
                />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    label: {
        fontWeight: "bold",
        fontSize: 14,
        color: "#333",
    },
    value: {
        fontSize: 14,
        color: "#555",
    },
    status: {
        fontWeight: "bold",
        color: "#007bff",
    },
    noDataText: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#999",
    },
});

export default SamplingHistory;
