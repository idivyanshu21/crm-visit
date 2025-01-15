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
  data = [], // Array of options {label, value}
  placeholder = "Select an option",
  style,
  modalStyle,
  itemStyle,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Find the label corresponding to the selected value
  const selectedLabel =
    data.find((item) => item.value == selectedValue)?.label || placeholder;

  const handleSelect = (value, label) => {
    setModalVisible(false); // Close the modal
    onValueChange(value); // Trigger parent state update
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.inputText}>{selectedLabel}</Text>
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
              data={data}
              keyExtractor={(item) => String(item.value)}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.item, itemStyle]}
                  onPress={() => handleSelect(item.value, item.label)}
                >
                  <Text style={styles.itemText}>{item.label}</Text>
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
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 11,
    padding: 14,
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
    maxHeight: "80%",
    alignSelf: "center",
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
