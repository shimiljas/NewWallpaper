import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Router, Scene, Drawer } from "react-native-router-flux";
import HomeScreen from "./Screens/HomeScreen";
import ImageScreen from "./Screens/ImageScreen";

class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="Home" component={HomeScreen} />
          <Scene key="Image" component={ImageScreen} hideNavBar />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black"
  }
});

export default App;
