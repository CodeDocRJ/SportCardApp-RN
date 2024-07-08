import { View, Text, StatusBar } from "react-native";
import React, { useState, useEffect } from "react";
// import { createStackNavigator } from '@react-navigation/stack';

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EventRegister } from "react-native-event-listeners";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";

import Introduction from "../Introduction";
import Splash from "../screens/auth/Splash";
import Signin from "../screens/auth/SignIn";
import Signup from "../screens/auth/Signup";
import Forgot from "../screens/auth/Forgot";
import Forgotpass from "../screens/auth/Forgotpass";
import NewPassword from "../screens/auth/NewPassword";
import Verification from "../screens/auth/Verification";

import Home from "../screens/home/Home";
import Search from "../screens/home/Search";


import AddCard from "../screens/card/AddCard";


// Common

// import Profile from "../screens/common/Settings";
// import Language from "../screens/common/Language";
// import Privacy from "../screens/common/Privacy";
// import Notification from "../screens/common/Notification";
// import AccountProfile from "../screens/common/AccountProfile";
// import LiveChat from "../screens/common/LiveChat";
// import Terms from "../screens/common/Terms";
// import Law from "../screens/common/Law";
// import ContactUs from "../screens/common/ContactUs";
// import Report from "../screens/common/Report";
// import UpdatePassword from "../screens/common/UpdatePassword";
// import RegisterBank from "../screens/common/RegisterBank";
// import Message from "../screens/common/Message";

import { Colors } from "../theme/color";
import { storage } from "../utils/storage";
import { useStore } from "../store/store";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {

  const { store, changeStore } = useStore();

  const [darkMode, setDarkMode] = useState(false);

  // const toggleSwitch = () => setDarkMode(previousState => !previousState);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
    });

    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);

  const [showSplashScreen, setshowSplashScreen] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      // setshowSplashScreen(false);
      changeStore({ ...store, showSplashScreen: false });
    }, 3000);
    const fetchStatus = async () => {
      const currentUser = await storage.getItem("currentUser");
      if (currentUser != null) {
        // setIsLoggedin(true);
        changeStore({ ...store, isLoggedin: true });
      }
    };
    fetchStatus();
  }, []);

  return (
    <themeContext.Provider
      value={darkMode === false ? theme.dark : theme.light}
    >
      <NavigationContainer
        theme={darkMode === false ? DarkTheme : DefaultTheme}
      >
        <StatusBar
          backgroundColor={
            darkMode === false ? Colors.active : Colors.secondary
          }
          barStyle={darkMode === false ? "light-content" : "dark-content"}
          translucent={false}
        />
        <Stack.Navigator>
          {store.showSplashScreen ? (
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
          ) : null}
          {(store.isLoggedin) ? (
            <>

              <Stack.Screen
                name="Home"
                component={Home}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Search"
                component={Search}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="AddCard"
                component={AddCard}
                options={{ headerShown: false }}
              />

{/* 
              <Stack.Screen
                name="Message"
                component={Message}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="LiveChat"
                component={LiveChat}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Language"
                component={Language}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Privacy"
                component={Privacy}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Terms"
                component={Terms}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Law"
                component={Law}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ContactUs"
                component={ContactUs}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Report"
                component={Report}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AccountProfile"
                component={AccountProfile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="UpdatePassword"
                component={UpdatePassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Withdraw"
                component={Withdraw}
                options={{ headerShown: false }}
              /> */}
            </>
          ) : (
            <>
              <Stack.Screen
                name="Introduction"
                component={Introduction}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Verification"
                component={Verification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgot"
                component={Forgot}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Forgotpass"
                component={Forgotpass}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="NewPassword"
                component={NewPassword}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
}
