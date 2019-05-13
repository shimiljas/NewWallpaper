import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
import Header from "../components/Header";
import { filedownlaod } from "../utilities/FileDownload";

class ImageScreen extends Component {
  downLoad = () => {};
  render() {
    console.log(this.props.image, "this.props.image");
    return (
      <View style={styles.container}>
        <Header />
        <CachedImage
          style={styles.stretch}
          source={{
            uri: this.props.image
          }}
        />
        <TouchableOpacity
          style={styles.download}
          onPress={() => filedownlaod(this.props.image, "wallpapper")}
        >
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
    height: "80%"
  },
  download: {
    width: "100%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingBottom: 10
  },
  downloadText: {
    color: "white",
    fontWeight: "normal",
    fontSize: 20,
    paddingRight: 5
  }
});
export default ImageScreen;
