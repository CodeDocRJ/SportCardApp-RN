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
import { useNavigation } from "@react-navigation/native";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
import Icon from "react-native-vector-icons/FontAwesome";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import { useStore } from "../store/store";
import { images } from "../constants";

export default function Footer() {
  const { changeStore, store } = useStore();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const ref = React.useRef(null);
  const theme = useContext(themeContext);
  const [focused, setForcused] = useState(store.page ?? "home");

  useEffect(() => {
    setForcused(store.page);
  }, [])

  const goto = (name) => {
    changeStore({ ...store, page: name });
    setForcused(store.page);
    navigation.replace(name);
  }

  return (
    <View style={[style.row, {
      height: 80,
      paddingHorizontal: 30,
      marginVertical: 10,
      justifyContent: "space-between",
      backgroundColor: theme.bg
    }]}>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", borderTopWidth: focused.includes("home") ? 3 : 0, borderTopColor: focused.includes("home") ? Colors.primary : Colors.disable }}
        onPress={() => goto('home')}
      >
        <Image
          tintColor={focused.includes("home") ? Colors.primary : Colors.disable}
          style={{ width: 30, height: 30 }}
          source={images.ic_home}


        />
        <Text
          style={{
            color: focused.includes("home") ? theme.txt : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >{t("Home")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", borderTopWidth: focused.includes("trade") ? 3 : 0, borderTopColor: focused.includes("trade") ? Colors.primary : Colors.disable }}
        onPress={() => goto('trade')}
      >
        <Image
          tintColor={focused.includes("trade") ? Colors.primary : Colors.disable}
          style={{ width: 30, height: 30 }}
          source={images.ic_trade} />
        <Text
          style={{
            color: focused.includes("trade") ? theme.txt : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >{t("Trade")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", borderTopWidth: focused.includes("leagues") ? 3 : 0, borderTopColor: focused.includes("leagues") ? Colors.primary : Colors.disable }}
        onPress={() => goto('leagues')}
      >
        <Image
          tintColor={focused.includes("leagues") ? Colors.primary : Colors.disable}
          style={{ width: 30, height: 30 }}
          source={images.ic_leagues}


        />
        <Text
          style={{
            color: focused.includes("leagues") ? theme.txt : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >{t("Leagues")}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ alignItems: "center", justifyContent: "center", borderTopWidth: focused.includes("profile") ? 3 : 0, borderTopColor: focused.includes("profile") ? Colors.primary : Colors.disable }}
        onPress={() => goto('profile')}
      >
        <Image
          tintColor={focused.includes("profile") ? Colors.primary : Colors.disable}
          style={{ width: 30, height: 30 }}
          source={images.ic_profile}
        />
        <Text
          style={{
            color: focused.includes("profile") ? theme.txt : Colors.disable,
            fontFamily: "Plus Jakarta Sans",
            marginBottom: 15,
            fontSize: 12,
            fontWeight: 'bold'
          }}
        >{t("Profile")}</Text>
      </TouchableOpacity>
    </View>
  );
}
