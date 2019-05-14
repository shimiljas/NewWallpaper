import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
  Linking
} from "react-native";
import { CachedImage, ImageCacheProvider } from "react-native-cached-image";
import { Actions } from "react-native-router-flux";
import firebase from "react-native-firebase";
const { height, width } = Dimensions.get("window");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import BouncyDrawer from "react-native-bouncy-drawer";
import MAIcon from "react-native-vector-icons/MaterialIcons";
import {
  FancyNavigation,
  openNv,
  closeNv
} from "react-native-rounded-navigation-drawer";
import Communications from "react-native-communications";
import TopHeader from "../components/TopHeader";
import SideMenu from "react-native-side-menu";
import Menu from "./Menu";

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
      ],
      data: [
        { id: "1", title: "Rate Us", color: "#f44336", span: 1 },
        {
          id: "2",
          title: "Share the App",
          color: "#E91E63",
          span: 2
        },
        { id: "3", title: "Contact Us", color: "#f44336", span: 3 }
      ],
      modal: false
    };
  }

  menuOpen = item => {
    if (item == 2) {
      this.onShare();
    } else if (item == 1) {
      Linking.openURL(
        "https://play.google.com/store/apps/details?id=com.ubercab.eats&referrer=mat_click_id%3D7ba955e09e7842af865b84ec9ba081b5-20190514-7336%26link_click_id%3D656868187203377771&mat_click_id=7ba955e09e7842af865b84ec9ba081b5-20190514-7336"
      );
    } else if (item == 3) {
      Communications.email(["contact@softwave.in"], null, null, "Review", "");
    }
  };

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          "https://play.google.com/store/apps/details?id=com.ubercab.eats&referrer=mat_click_id%3D7ba955e09e7842af865b84ec9ba081b5-20190514-7336%26link_click_id%3D656868187203377771&mat_click_id=7ba955e09e7842af865b84ec9ba081b5-20190514-7336"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  render() {
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const unitId = "ca-app-pub-3940256099942544/6300978111";
    const menu = <Menu onItemSelected={this.menuOpen} />;

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width,
              height: 60,
              backgroundColor: "#17202A",
              alignItems: "flex-start"
            }}
          >
            <MaterialCommunityIcons
              onPress={() => {
                this.setState({ isOpen: true });
              }}
              style={{ color: "white", marginLeft: 20, marginTop: 10 }}
              name={"menu"}
              size={30}
            />
          </View>
          <FancyNavigation
            darkColor="#17202A"
            lightColor="#424949"
            onItemPress={this.menuOpen}
            data={this.state.data}
            imageUri="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwu7s_Ic3YioDVl9AmoJGsKbBuCKFVp2cD3KCPzdYlBLOcGmeV"
          />

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
        </View>
      </SideMenu>
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
