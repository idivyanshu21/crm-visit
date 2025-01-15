import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AnimatedHeader = ({ title, children, showBackButton = true }) => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;

  // State for StatusBar properties
  const [statusBarColor, setStatusBarColor] = useState('rgba(0,0,0,0)');
  const [barStyle, setBarStyle] = useState('light-content');

  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['rgba(0,0,0,0)', 'white'], // Fully transparent to white
    extrapolate: 'clamp',
  });

  const headerTextColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['white', '#00000095'], // Text color transitions based on background
    extrapolate: 'clamp',
  });

  const iconColor = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: ['white', '#00000095'], // Back icon color transitions
    extrapolate: 'clamp',
  });

  // Function to update StatusBar properties based on scroll position
  const updateStatusBar = (y) => {
    if (y < 50) {
      setBarStyle('light-content');
    } else {
      setBarStyle('dark-content');
    }
  };

  // Ensure initial StatusBar is transparent
  useEffect(() => {
    setStatusBarColor('rgba(0,0,0,0)');
    setBarStyle('light-content');
  }, []);

  return (
    <View style={styles.container}>
      {/* StatusBar */}
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={barStyle}
        translucent={true} // Makes the status bar overlay content
        animated
      />

      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            backgroundColor: headerBackgroundColor,
          },
           Platform.OS==='ios'&&{borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,height:100,paddingTop:50}
        ]}
      >
        {showBackButton && (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Animated.Text style={{ color: iconColor }}>
              <Ionicons name="arrow-back" size={24} />
            </Animated.Text>
          </TouchableOpacity>
        )}
        <View style={{ width: '92%', paddingRight: 40 }}>
          <Animated.Text style={[styles.headerText, { color: headerTextColor }]}>
            {title}
          </Animated.Text>
        </View>
      </Animated.View>

      {/* Scrollable Content */}
      <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : ""}>
      <Animated.ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ paddingTop: 60 }}
        onScroll={(event) => {
          const yOffset = event.nativeEvent.contentOffset.y;
          updateStatusBar(yOffset); // Update StatusBar properties
          Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: false,
          })(event);
        }}
        scrollEventThrottle={16}
        keyboardShouldPersistTaps="always"
      >
        {children}
      </Animated.ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingTop: 35,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 10,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  backButton: {
    marginRight: 10,
    width: 24,
  },
  headerText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '500',
  },
  scrollContainer: {
    marginTop: -60,
  },
});

export default AnimatedHeader;
