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
  StatusBar,
  TouchableHighlight
} from "react-native";
import { Router, Scene, Actions } from "react-native-router-flux";
import HomeScreen from "./Screens/HomeScreen";

import ImageScreen from "./Screens/ImageScreen";
import firebase from "react-native-firebase";
import NotificationPopup from "react-native-push-notification-popup";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Drawer from "react-native-drawer-menu";
import { Root } from "native-base";
import NotificationCard from "./components/NotificationCard";
import {
  FancyNavigation,
  openNv,
  closeNv
} from "react-native-rounded-navigation-drawer";
const { width, height } = Dimensions.get("window");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
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

    this.checkPermission();
    this.createNotificationListeners();
  }

  componentWillUnmount() {
    this.notificationListener();
    this.notificationOpenedListener();
  }
  componentDidMount() {
    closeNv();
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
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#17202A"} />
        <FancyNavigation
          darkColor="#17202A"
          lightColor="#424949"
          onItemPress={this.menuOpen}
          data={this.state.data}
          imageUri="null"
        />
        <Root>
          <Router>
            <Scene
              key="root"
              renderLeftButton={() => (
                <MaterialCommunityIcons
                  onPress={() => {
                    if (this.state.modal) {
                      closeNv();
                    } else {
                      this.setState({ modal: true }, () => {
                        openNv();
                      });
                    }
                  }}
                  style={{ color: "white", marginLeft: 20 }}
                  name={"menu"}
                  size={30}
                />
              )}
            >
              <Scene
                key="Home"
                initial="true"
                component={HomeScreen}
                navigationBarStyle={{
                  backgroundColor: "#17202A"
                }}
                titleStyle={{ color: "white" }}
              />
              <Scene key="Image" component={ImageScreen} hideNavBar />
            </Scene>
          </Router>

          <NotificationPopup ref={ref => (this.popup = ref)} />
        </Root>
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
  }
});

export default App;
