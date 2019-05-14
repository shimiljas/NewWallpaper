import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
class NotificationCard extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imagebg}>
          <Image
            style={styles.image}
            resizeMethod={"resize"}
            resizeMode={"cover"}
            source={{
              uri:
                "https://facebook.github.io/react-native/docs/assets/favicon.png"
            }}
          />
        </View>
        <View style={styles.notificationbox}>
          <Text style={styles.text}> Checkout the new Awesome Wallpapers</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 65,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "white"
  },
  imagebg: { flex: 0.2, alignItems: "center", justifyContent: "center" },
  notificationbox: { flex: 0.8, justifyContent: "center" },
  image: { width: 50, height: 50 },
  text: { color: "black" }
});

export default NotificationCard;
