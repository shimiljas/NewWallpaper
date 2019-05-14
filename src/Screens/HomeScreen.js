import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
const { height, width } = Dimensions.get("window");
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridListItems: [
        { url: "https://homepages.cae.wisc.edu/~ece533/images/airplane.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/arctichare.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/baboon.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/boat.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/cat.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/fruits.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/frymire.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/girl.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/goldhill.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/lena.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/monarch.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/mountain.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/peppers.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/pool.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/sails.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/serrano.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/tulips.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/watch.png" },
        { url: "https://homepages.cae.wisc.edu/~ece533/images/zelda.png" }
      ]
    };
  }

  GetGridViewItem(item) {
    Alert.alert(item);
  }

  render() {
    firebase.admob().initialize("ca-app-pub-5050580636963483~4190266227");
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const unitId = "ca-app-pub-3940256099942544/6300978111";
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.GridListItems}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.GridViewContainer}
              onPress={() => Actions.Image({ image: item.url })}
            >
              <CachedImage
                resizeMethod="resize"
                resizeMode="cover"
                source={{ uri: item.url }}
                style={{ width: "100%", height: 300 }}
              />
            </TouchableOpacity>
          )}
          numColumns={1}
        />
        <Banner
          style={{ width: "100%", height: "100%" }}
          unitId={unitId}
          size={"FULL_BANNER"}
          request={request.build()}
          onAdLoaded={() => {
            console.log("Advert loaded");
          }}
          onAdFailedToLoad={result => {
            console.log("result", result);
            console.log("Ad failed to load");
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "black",
    padding: 5
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    width,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    marginVertical: 5
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    color: "#fff",
    padding: 10
  }
});

export default HomeScreen;
