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

// Navigations
import Stacks from './Navigators/mystack';

//ignore the logging errors in runtime
import { LogBox } from "react-native";

//Ignore all logs (warning)
// LogBox.ignoreLogs(['ViewPropTypes will be removed']); (fixed)
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
