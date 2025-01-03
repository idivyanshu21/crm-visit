import React from "react";
import { View } from "react-native";
import SearchableDropdown from "react-native-searchable-dropdown";
import globalStyles from "../../globalCSS";
import { BlurView } from "expo-blur";
import { Keyboard } from "react-native";
import { useRef } from "react";

const Dropdown = ({
  dropdownOptions,
  selectedOption,
  selectedValue,
  onValueChange,
  id,
  rounded,
  transparent,
}) => {
  // console.log(dropdownOptions)
  const inputRef = useRef();
  return (
    
    <BlurView intensity={transparent?100:0} style={[globalStyles.dropdownContainer, rounded && {borderRadius:11},transparent&&{borderWidth:0}]} pointerEvents="box-none">
                            <SearchableDropdown
  
                                items={dropdownOptions} // Dropdown options
                                onItemSelect={(item) => {
                                  onValueChange(item.name) 
                                  id(item.id)
                                  Keyboard.dismiss()}
                                }// Update input fiel
                    
                                textInputProps={{
                                    ref: inputRef,
                                    value: selectedValue, // Bind value to input
                                    placeholder: selectedOption ? `Search ${selectedOption}` : "Search and select",
                                    onChangeText: (text) => onValueChange(text), // Update value on typing
                                }}
                                placeholder="Search and select"
                                itemStyle={globalStyles.dropdownItem} // Style for dropdown items
                                itemTextStyle={{ color: "#000" }}
                                listProps={{
                                    nestedScrollEnabled: true,
                                    keyboardShouldPersistTaps: "always",
                                }}
                                textInputStyle={globalStyles.searchInput}
                                itemsContainerStyle={globalStyles.itemContainer}
                                resetValue={false} // Prevent resetting to placeholder
                            />
                        </BlurView>
  );
};

export default Dropdown;
