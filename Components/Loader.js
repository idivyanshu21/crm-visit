import React from "react";
import { Modal, View, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import LoaderImg from "../assets/Images/Loader.gif";

const Loader = ({ visible }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <BlurView intensity={60} style={styles.blurView}>
          <Image source={LoaderImg} height={110} width={110} />
        </BlurView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.71)",
  },
  blurView: {
    borderRadius: 20,
    height: 130,
    width: 130,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:'0 0 20 rgba(118, 164, 242, 0.66)',
    overflow:'hidden'
  },
});

export default Loader;
