import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native"; //Navigation Stack

//Redux
import { Provider } from 'react-redux'
import store from './Redux/store'

//context Api
// import Auth from './Context/store/Auth'

// Toast Beautiful Messages
import { Toast } from "react-native-toast-message/lib/src/Toast";

// import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
// import Login from "./Screens/Login";
// import Register from "./Screens/Register";
// import ShoppingCart from "./Screens/ShoppingCart";
// import Success from "./Screens/Success";
// import WelcomeIcon from "./Screens/WelcomeIcon";
// import Help from "./Screens/Help";

// Navigations
import Stacks from './Navigators/mystack';

//Bottom Tab Navigator
// import Main from "./Navigators/main";

//ignore the logging errors in runtime
import { LogBox } from "react-native";

//Ignore all logs (warning)
// LogBox.ignoreLogs(['ViewPropTypes will be removed']);
// LogBox.ignoreLogs(['The Sound is already loaded']);
// LogBox.ignoreAllLogs(true);

export default function App() {

  return (
    <>
    {/* <Auth> */}
      <Provider store={store}>
        <Stacks/>
        
        {/* <StatusBar style="auto" /> */}
        
      <Toast />
      {/* <Toast ref={(ref) => Toast.setRef(ref)} /> */}
      </Provider>
      {/* </Auth> */}
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
