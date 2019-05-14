import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
import Header from "../components/Header";
import { filedownlaod } from "../utilities/FileDownload";
const { height, width } = Dimensions.get("window");
class ImageScreen extends Component {
  downLoad = () => {};
  render() {
    console.log(this.props.image, "this.props.image");
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView style={{ flex: 1 }}>
          <CachedImage
            resizeMethod={"resize"}
            resizeMode={"cover"}
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,

    backgroundColor: "black"
  },
  stretch: {
    width: "100%",
    height: height - 150
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
