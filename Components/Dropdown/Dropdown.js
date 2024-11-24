import React from "react";
import { View } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import globalStyles from "../../globalCSS";

const Dropdown = ({
  dropdownOptions,
  selectedOption,
  selectedValue,
  onValueChange,
}) => {
  return (
    <View style={globalStyles.dropdownContainer}>
                            <SearchableDropdown
                                items={dropdownOptions[selectedOption]} // Dropdown options
                                onItemSelect={(item) => onValueChange(item.name)} // Update input field
                                textInputProps={{
                                    value: selectedValue, // Bind value to input
                                    placeholder: "Search and select",
                                    onChangeText: (text) => onValueChange(text), // Update value on typing
                                }}
                                placeholder="Search and select"
                                itemStyle={globalStyles.dropdownItem} // Style for dropdown items
                                itemTextStyle={{ color: "#000" }}
                                listProps={{
                                    nestedScrollEnabled: true,
                                }}
                                textInputStyle={globalStyles.searchInput}
                                itemsContainerStyle={globalStyles.itemContainer}
                                resetValue={false} // Prevent resetting to placeholder
                            />
                        </View>
  );
};

export default Dropdown;
