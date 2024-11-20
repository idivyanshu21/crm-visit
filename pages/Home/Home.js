import { Button, StyleSheet, Text, View } from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome to the Home Screen</Text>
            <Button
                title="Sales Order"
                onPress={() => navigation.navigate('SalesOrder')}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});
export default HomeScreen
