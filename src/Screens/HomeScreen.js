import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Actions } from "react-native-router-flux";

class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      GridListItems: [
        { key: "A1" },
        { key: "A2" },
        { key: "A3" },
        { key: "A4" },
        { key: "A5" },
        { key: "6" },
        { key: "7" },
        { key: "g" },
        { key: "h" },
        { key: "i" },
        { key: "i" },
        { key: "j" },
        { key: "k" },
        { key: "l" },
        { key: "m" },
        { key: " n" },
        { key: "o" },
        { key: "p" },
        { key: "q" },
        { key: "r" }
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
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.GridViewContainer}
              onPress={() => Actions.Image()}
            >
              <Text style={styles.GridViewTextLayout}> {item.key} </Text>
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
    margin: 5,
    backgroundColor: "#7B1FA2"
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
