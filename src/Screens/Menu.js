import React from "react";
import PropTypes from "prop-types";
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text
} from "react-native";

const window = Dimensions.get("window");
const uri = "https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png";

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: "#17202A",
    padding: 20,
    justifyContent: "center"
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1
  },
  name: {
    position: "absolute",
    left: 70,
    top: 20
  },
  item: {
    fontSize: 20,
    fontWeight: "bold",
    paddingTop: 5,
    color: "white",
    marginVertical: 15
  }
});

export default function Menu({ onItemSelected }) {
  return (
    <View scrollsToTop={false} style={styles.menu}>
      <Text onPress={() => onItemSelected("1")} style={styles.item}>
        Rate Us
      </Text>
      <Text onPress={() => onItemSelected("2")} style={styles.item}>
        Share App
      </Text>

      <Text onPress={() => onItemSelected("3")} style={styles.item}>
        Contacts
      </Text>
    </View>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired
};
