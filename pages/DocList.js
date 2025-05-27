import React, { useState, useEffect } from "react";  
import { View, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { GetUnApprovedOrders } from "../Components/Repo/WEBAPI";

const OrderList = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await GetUnApprovedOrders(
          "OrderValidationGrid", // ActionType
          "0",                   // RequestNo
          779,                   // ExecutiveID
          1,                     // iCompanyID (Replace with actual ID)
          779,                  // UserID (Replace with actual ID)
          "0"             // TransactionID (Replace with actual value)
        );
        setOrders(data);
        console.log("API Response 22:", data); // Log response
      } catch (error) {
        console.error("Error fetching orders 33:", error);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);
    
  const renderItem = ({ item }) => (
    <Card style={{ margin: 10, borderRadius: 15, elevation: 5, backgroundColor: "white", overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 6 }}>
      <Card.Content style={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate("ApprovalScr", { order: item })}>
          <Text style={{ color: "#0056b3", textDecorationLine: "underline", fontWeight: "700", fontSize: 22, letterSpacing: 0.5 }}>
            Order No: {item.RequestNo}
          </Text>
        </TouchableOpacity>
        <Divider style={{ marginVertical: 12, backgroundColor: "#ddd" }} />
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Executive:</Text> {item.ExecutiveName}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Request Date:</Text> {item.RequestDate}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Customer:</Text> {item.CustomerName}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Ship To:</Text> {item.ShipTo}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Shipment Mode:</Text> {item.ShipmentMode}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>Bill To:</Text> {item.BillTo}</Text>
        <Text style={{ fontSize: 17, color: "#222", marginBottom: 6, fontWeight: "500" }}><Text style={{ fontWeight: "bold" }}>MAX AD%:</Text> {item.AD}</Text>
        <Text style={{ fontSize: 20, color: "#000", fontWeight: "bold", marginTop: 12, textAlign: "right" }}>Net Value: {item.NetValue}</Text>
      </Card.Content>
    </Card>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f7fa", padding: 12 }}>
      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.orderNo}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};

export default OrderList;
