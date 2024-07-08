import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import theme from "../theme/theme";
import themeContext from "../theme/themeContex";
import { Colors } from "../theme/color";
import style from "../theme/style";
import { useTranslation } from "react-i18next";
import Icon from "react-native-vector-icons/Ionicons";

import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import { server } from "../constants";
import { storage } from "../utils/storage";
import { useStore } from "../store/store";

export default function Header() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);

  const [numMessages, setNumMessages] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const currentUser = store.currentUser;

  useEffect(() => {
    
  }, []);


  return (
    <View style={{ height: 80 }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 20,
          marginHorizontal: 20,
        }}
      >
        <View style={[style.row]}>
          <View style={{ paddingLeft: 5 }}>
            <Text style={{ marginTop: 8, fontWeight: 600, color: theme.txt }}>
              {t("Good Morning!")}
            </Text>
            <Text style={{ color: theme.txt }}>{currentUser.name}</Text>
          </View>
        </View>
        <View>
          <View style={[style.row, { height: 40, width: "100%" }]}>
            <View style={{ position: "relative" }}>
              <TouchableOpacity onPress={() => { 
                navigation.navigate('Search')
                // changeStore({ ...store, isShowSearch:true}); 
                }}>
                <View
                  style={{
                    top: 10,
                    right: 20,
                  }}>
                  <Icon
                    name="search"
                    color={theme.txt}
                    size={22}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ position: "relative" }}>
              <TouchableOpacity onPress={() => {console.log('Notification!')}}>
                <View
                  style={{
                    top: 10,
                    right: 0,
                  }}
                >
                  <Icon name="notifications" color={theme.txt} size={20} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
