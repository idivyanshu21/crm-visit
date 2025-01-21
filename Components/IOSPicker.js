import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const IOSPicker = ({
  selectedValue,
  onValueChange,
  data = [], // Array of options [{label, value, color}]
  placeholder = "Select an option",
  style,
  modalStyle,
  itemStyle,
  placeholderColor = "#00000099", // Default placeholder color
  defaultColor = "#333", // Default color for non-placeholder items
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Normalize data to { label, value, color } format
  const normalizedData = data.map((item) => ({
    label: item.label || item.Text_t,
    value: item.value || item.Value_v,
    color: item.color || defaultColor,
  }));

  // Find the selected label and its color
  const selectedOption = normalizedData.find((item) => item.value === selectedValue);
  const selectedLabel = selectedOption?.label || placeholder;
  const selectedColor = selectedOption?.value ? defaultColor : placeholderColor;

  const handleSelect = (value) => {
    setModalVisible(false); // Close the modal
    onValueChange(value); // Trigger parent state update
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.inputText, { color: selectedColor }]}>
          {selectedLabel}
        </Text>
        <Icon name="arrow-drop-down" size={24} color="#333" style={styles.icon} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="none"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={[styles.modalContainer, modalStyle]}>
            <FlatList
              data={normalizedData}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, itemStyle]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={[styles.itemText, { color: item.color }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    minWidth: "100%"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 11,
    padding: 10,
    paddingHorizontal: 14,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputText: {
    color: "#333",
  },
  icon: {
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 20,
    width: "90%",
    maxHeight: "90%",
    alignSelf: "center",
    paddingHorizontal:5
  },
  item: {
    padding: 15,
  },
  itemText: {
    fontSize: 16,
    color: "#333",
  },
});

export default IOSPicker;
