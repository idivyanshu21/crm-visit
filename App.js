import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './pages/Home/Home';
import SalesOrderScreen from './pages/SalesOrder/SalesOrderScreen';
import SchoolVisitScreen from './pages/SchoolVisit/SchoolVisitScreen';
import Enrollment from './pages/SchoolVisit/SchoolDetails/Enrollment';
import LoginScreen from './pages/Login/Login';
import { getSession } from './Contexts/Session'; // Your session management logic
import { AuthProvider } from './Contexts/Auth';
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Check if there's a session on initial load
    const checkSession = async () => {
      try {
        const session = await getSession(); // Fetch the session
        if (session && session.UserID) {
          setIsLoggedIn(true); // User is logged in
        } else {
          setIsLoggedIn(false); // User is not logged in
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false); // Mark loading as complete
      }
    };
    checkSession();
  }, []);

  if (isLoading) {
    // Show a loading indicator until the session check is complete
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#C82331" />
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? 'Home' : 'Login'} // Conditionally set the initial route
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="SalesOrder"
            component={SalesOrderScreen}
            options={{ title: 'Sales Order', headerTransparent: false }}
          />
          <Stack.Screen
            name="SchoolVisit"
            options={{ title: 'School Visit', headerTransparent: true }}
          >
            {() => <SchoolVisitScreen />}
          </Stack.Screen>
          <Stack.Screen
            name="Enrollment"
            options={{ title: 'Update Enrollment', headerTransparent: true }}
          >
            {() => <Enrollment />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
