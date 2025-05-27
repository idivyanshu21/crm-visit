import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, StatusBar, Image } from "react-native";
import axios from "axios";
import Logo from '../../assets/Images/logo.jpg';
import { useAuth } from "../../Contexts/Auth";
import Loader from "../../Components/Loader";
import { CRM_Login } from "../../API/APIConfig";
import { Ionicons } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
    try {
      setLoading(true);
      await CRM_Login(username, password).then((response)=>{
        // console.log("Login response:", response);
        login(response);
        alert("Login Successful");
        navigation.navigate("Home")
      })
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <StatusBar
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
        translucent={true}
        animated
      />
      {/* Background Image */}
      <Image
        source={Logo}
        style={styles.backgroundImage}
      />
      <View style={styles.container}>
        {loading && <Loader />}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Ionicons
            name={showPassword ? 'eye' : 'eye-off'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
        <View style={{ width: "80%", alignItems: "flex-end" }}>
          <TouchableOpacity onPress={() => alert("Forgot Password")}>
            <Text style={{ color: "gray", fontSize: 14, marginTop: 5,marginBottom:10}}>
                Forget Password?
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth:1,
    // borderRadius:20,
    // borderColor:'#00000020',
    // paddingVertical:20,
    // marginHorizontal:20,
  },
  backgroundImage: {
    width: "100%",
    height: 220,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#C82331",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 18,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
    passwordContainer: {
    width: '80%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingHorizontal: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
  },
    passwordInput: {
    flex: 1,
    height: '100%',
  },
});

export default LoginScreen;
