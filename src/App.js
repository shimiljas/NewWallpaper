import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Alert,
  FlatList,
  AsyncStorage,
  Platform,
  Dimensions,
  Easing,
  TouchableHighlight
} from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import HomeScreen from "./Screens/HomeScreen";
import ImageScreen from "./Screens/ImageScreen";
import firebase from "react-native-firebase";
import NotificationPopup from "react-native-push-notification-popup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "react-native-drawer-menu";

const { width, height } = Dimensions.get("window");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };

    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  async getToken() {
    let fcmToken = await AsyncStorage.getItem("fcmToken");
    if (!fcmToken) {
      fcmToken = await firebase.messaging().getToken();
      if (fcmToken) {
        // user has a device token
        console.log("fcmToken:", fcmToken);
        await AsyncStorage.setItem("fcmToken", fcmToken);
      }
    }
    console.log("fcmToken:", fcmToken);
  }
  createNotificationListeners = async () => {
    /*
     * Triggered when a particular notification has been received in foreground
     * */
    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        const { title, body, data } = notification;

        this.showAlert(title, body, data, notification);
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const { title, body, data } = notificationOpen.notification;
        this.showAlert(title, body, data);
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      const { title, body, data } = notificationOpen.notification;
      this.showAlert(title, body, data);
    }
    /*
     * Triggered for data only payload in foreground
     * */
    this.messageListener = firebase.messaging().onMessage(message => {
      console.log(JSON.stringify(message));
    });
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      this.getToken();
    } catch (error) {
      console.log("permission rejected");
    }
  };

  showAlert = (title, body, data) => {
    if (title && body && data) {
      this.popup.show({
        onPress: () => {
          console.log("Pressed");
        },
        // eslint-disable-next-line global-require

        appTitle: "New WallPapper",
        timeText: "Now",
        title,
        body
      });
    }
  };
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      this.getToken();
    } else {
      this.requestPermission();
    }
  };

  render() {
    firebase.admob().initialize("ca-app-pub-5050580636963483~4190266227");
    const Banner = firebase.admob.Banner;
    const AdRequest = firebase.admob.AdRequest;
    const request = new AdRequest();
    const unitId = "ca-app-pub-3940256099942544/6300978111";

    return (
      <View style={{ flex: 1 }}>
        <Router>
          <Scene
            key="root"
            renderLeftButton={() => (
              <MaterialCommunityIcons
                onPress={() => {
                  alert("ko");
                }}
                style={{ color: "black", marginLeft: 20 }}
                name={"menu"}
                size={30}
              />
            )}
          >
            <Scene key="Home" initial="true" component={HomeScreen} />
            <Scene key="Image" component={ImageScreen} hideNavBar />
          </Scene>
        </Router>
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
        <NotificationPopup ref={ref => (this.popup = ref)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "black"
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "black"
  },
  controlText: {
    color: "white"
  },
  button: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    padding: 10
  },
  main: {
    position: "absolute",
    backgroundColor: "#2ba"
  },
  head: {
    height: 60,
    marginBottom: 200,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#6a0d45"
  },
  content: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#e3b8cb"
  },
  drawerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  leftTop: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    alignSelf: "stretch",
    backgroundColor: "#8ad8dd"
  },
  leftBottom: {
    flex: 2,
    justifyContent: "space-around",
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#f0f0f0"
  },
  leftDrawer: {
    borderRightWidth: 4,
    borderRightColor: "#5b585a"
  },
  rightDrawer: {
    borderLeftWidth: 4,
    borderLeftColor: "#5b585a"
  },
  btn1: {
    marginTop: 10,
    padding: 10,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#f06355"
  },
  btn2: {
    marginTop: 10,
    padding: 10,
    overflow: "hidden",
    borderRadius: 5,
    backgroundColor: "#37b9d5"
  },
  btnText: {
    fontSize: 14,
    color: "#f0f0f0"
  }
});

export default App;
