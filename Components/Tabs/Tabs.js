import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import globalStyles, { PrimaryColor } from "../../globalCSS";
import { ScrollView } from "react-native-gesture-handler";

const TabComponent = ({ tabs, defaultTab }) => {
    const [activeTab, setActiveTab] = useState(defaultTab || tabs[0].title);

    const renderContent = () => {
        const activeContent = tabs.find((tab) => tab.title === activeTab)?.content;
        return <View style={styles.contentContainer}>{activeContent}</View>;
    };

    return (
        <View style={globalStyles.step}>
            {/* Tabs */}
            
                <View style={styles.tabContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.title}
                        style={[
                            styles.tab,
                            activeTab === tab.title && styles.activeTab,
                        ]}
                        onPress={() => setActiveTab(tab.title)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                activeTab === tab.title && globalStyles.primaryText,
                            ]}
                        >
                            {tab.title}
                        </Text>
                    </TouchableOpacity>
                ))}
                </View>

            {/* Tab Content */}
            {renderContent()}
        </View>
    );
};

const styles = StyleSheet.create({
    
    tabContainer: {
        width:'100%',
        flexDirection: "row",
        justifyContent:"space-between",
        borderBottomWidth: 1,
        borderColor: "#ccc",
    },
    tab: {
        paddingVertical: 11,
        paddingHorizontal:4
    },
    activeTab: {
        borderBottomWidth: 2,
        borderColor: PrimaryColor,
    },
    tabText: {
        fontSize: 16,
        color: "#555",
        fontWeight:'500'
    },

    contentContainer: {
        paddingVertical: 20,
        
    },
});

export default TabComponent;
