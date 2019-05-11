import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";

import Header from "../components/Header";

class ImageScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <Image
          style={styles.stretch}
          source={{
            uri:
              "https://i.pinimg.com/originals/be/f4/b7/bef4b73ebe6048fb6b55df09b284a118.jpg"
          }}
        />
        <TouchableOpacity style={styles.download}>
          <Text style={styles.downloadText}> Download</Text>
          <AntDesign name={"download"} size={20} style={{ color: "white" }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    alignItems: "center",
    backgroundColor: "black"
  },
  stretch: {
    width: "100%",
    height: "80%",
    resizeMode: "cover"
  },
  download: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  downloadText: {
    color: "white",
    fontWeight: "normal",
    fontSize: 20,
    paddingRight: 5
  }
});
export default ImageScreen;
