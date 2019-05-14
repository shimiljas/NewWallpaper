import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Router, Scene, Actions } from "react-native-router-flux";
class Header extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => Actions.pop()} style={styles.imageBox}>
          <AntDesign name="leftcircleo" style={{ color: "white" }} size={22} />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.imageBox2}>
          <AntDesign name="hearto" style={{ color: "white" }} size={22} />
        </TouchableOpacity> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#17202A",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  imageBox: {
    flex: 0.5,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  imageBox2: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingHorizontal: 10
  }
});
export default Header;
