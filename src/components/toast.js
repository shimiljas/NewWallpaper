import { Toast } from "native-base";

const toast = ({
  text = "",
  position = "bottom",
  type = "success",
  duration = 3000
}) => {
  Toast.show({
    text,
    position,
    buttonText: "OK",
    type,
    duration,
    style: {
      backgroundColor: type === "danger" ? "red" : "green",
      fontSize: 10
    }
  });
};

export default toast;
