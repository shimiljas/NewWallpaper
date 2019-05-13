import RNFetchBlob from "react-native-fetch-blob";
import { Platform, Alert } from "react-native";
import Permissions from "react-native-permissions";
import OpenAppSettings from "react-native-app-settings";
import toast from "../components/toast";
// eslint-disable-next-line import/prefer-default-export
export const filedownlaod = (url, name) => {
  if (Platform.OS === "ios") {
    const savePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}.png`;
    const { config } = RNFetchBlob;
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: savePath
      }
    };
    config(options)
      .fetch("GET", url)
      .then(res => {
        if (res) {
          toast({ text: "Downloaded successfully", type: "success" });
          console.log(res.path());
        } else {
          toast({ text: "Something went wrong", type: "success" });
          console.log("download_failed");
        }
      });
  } else {
    Permissions.check("storage").then(response => {
      if (response === "authorized") {
        const savePath = `${RNFetchBlob.fs.dirs.DownloadDir}/${name}.png`;

        const { config } = RNFetchBlob;
        const options = {
          fileCache: true,
          addAndroidDownloads: {
            useDownloadManager: true,
            notification: true,
            path: savePath
          }
        };
        config(options)
          .fetch("GET", url)
          .then(res => {
            if (res) {
              toast({ text: "Downloaded successfully", type: "success" });
              console.log(res.path());
            } else {
              toast({ text: "Something went wrong", type: "success" });
              console.log("download_failed");
            }
          });
      } else {
        Alert.alert(
          "Can we access your Storage?",
          "Please go to Settings > Applications > Traddle > Permissions > Allow Traddle  to access Storage",
          [
            { text: "Settings", onPress: () => OpenAppSettings.open() },
            { text: "cancel", onPress: () => console.log("cancelled") }
          ],
          { cancelable: false }
        );
      }
    });
  }
};
