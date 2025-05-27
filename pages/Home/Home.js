import { Button, Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Logo from '../../assets/Images/logo.jpg';
import Schoolvisitbtn from '../../assets/Images/schoolvisitbtn.jpg';
import Orderentrybtn from '../../assets/Images/orderentrybtn.jpg';
import ApprovalScrbtn from '../../assets/cloud.png';
import Sponsorshipbtn from '../../assets/adaptive-icon.png';
import { useAuth } from "../../Contexts/Auth";

const HomeScreen = ({ navigation }) => {
    const { logout } = useAuth(); // Access the logout function from context

    const handleLogout = () => {
        logout(); // Clear authentication details
        navigation.replace("Login"); // Navigate back to Login screen
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
                <TouchableOpacity onPress={() => navigation.navigate("SalesOrder")}>
                    <Image source={Orderentrybtn} style={styles.btn} />
                    <View style={{ paddingBottom: 10, alignItems: "center" }}>
                        <Text style={{ color: "#000", fontSize: 16 }}>Order Entry</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SchoolVisit")}>
                    <Image source={Schoolvisitbtn} style={styles.btn} />
                    <View style={{ paddingBottom: 10, alignItems: "center" }}>
                        <Text style={{ color: "#000", fontSize: 16 }}>School Visit</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("ApprovalScr")}>
                    <Image source={ApprovalScrbtn} style={styles.btn} />
                    <View style={{ paddingBottom: 10, alignItems: "center" }}>
                        <Text style={{ color: "#000", fontSize: 16 }}>Approval</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("SponsorshipPhotoValidation")}>
                    <Image source={Sponsorshipbtn} style={styles.btn} />
                    <View style={{ paddingBottom: 10, alignItems: "center" }}>
                        <Text style={{ color: "#000", fontSize: 16 }}>Sponsorship</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
            <View style={{ padding: 10, alignItems: "center", marginTop: 20 }}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: "100%",
        height: 220,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        boxShadow: "0px 2px 3px #00000010",
    },
    btn: {
        width: 120,
        height: 100,
        borderRadius: 20,
        boxShadow: "0px 1px 3px #00000040",
        objectFit: "cover",
    },
    logoutButton: {
        width: "80%",
        padding: 15,
        backgroundColor: "#C82331",
        borderRadius: 18,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontSize: 18,
        // fontWeight: "bold",
    },
    container:{
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        padding: 10,
        justifyContent: "space-between",
        marginTop: 15,
        overflow: "hidden",
    }
});

export default HomeScreen;
