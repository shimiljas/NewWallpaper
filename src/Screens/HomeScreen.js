import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

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
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.GridListItems}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={styles.GridViewContainer}
              onPress={() => Actions.Image()}
            >
              <Image
                source={{ uri: item.url }}
                style={{ width: "100%", height: "100%" }}
              />
            </TouchableOpacity>
          )}
          numColumns={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 300,
    margin: 5
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
