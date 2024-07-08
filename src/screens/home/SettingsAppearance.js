import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    ImageBackground,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ScrollView,
    FlatList,
    StyleSheet,
    Modal,
    Switch
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { useNavigation } from "@react-navigation/native";
import { EventRegister } from "react-native-event-listeners";

import { useStore } from "../../store/store";
import { t, use } from "i18next";
import CustomSwitch from "../../components/CustomSwitch";
import { storage } from "../../utils/storage";

export default function SettingsAppearance() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(store.darkMode);

    
    useEffect(() => {
        const getStorage =async()=>{
            const darkMod = await storage.getItem("darkMode");
            if(darkMod == 'true'){
                setDarkMode(true);
            }
            else {
                setDarkMode(false);
            }
        }
        getStorage();
    }, []);



    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <AppBar
                color={theme.bg}
                title={t('menu.settings')}
                titleStyle={{ color: theme.txt, fontWeight: 'bold', }}
                centerTitle={true}
                elevation={0}
                leading={
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <IconM
                            name="chevron-left"
                            style={{ backgroundColor: theme.bg }}
                            color={Colors.primary}
                            size={40}
                        />
                    </TouchableOpacity>
                }
            />

            <ScrollView showsVerticalScrollIndicator={false}>
                {store.isLoading && <Spinner />}
                <View style={{ flex: 1, marginHorizontal: 30, marginTop: 30, }}>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "flex-start",
                            marginTop: 20,
                            marginBottom: 10,
                        }}
                    >
                        <Text
                            style={[style.text1, { color: theme.txt, }]}
                        >
                            {t("settings.appearance")}
                        </Text>
                        <Text style={[style.text2, { color: Colors.disable }]}>
                            {t("settings.modify_appearance")}
                        </Text>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("settings.enable_dark_mode")}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }} >
                            <CustomSwitch
                                barHeight={30}
                                value={darkMode}
                                onValueChange={async(value) => {
                                    changeStore({ ...store, darkMode: value });
                                    setDarkMode(value);
                                    await storage.setItem("darkMode", JSON.stringify(value));
                                    EventRegister.emit("ChangeTheme", !value);
                                }}
                                disabled={false}
                                backgroundActive={Colors.primary}
                                backgroundInactive={Colors.disable}
                                circleActiveColor={'white'}
                                circleInActiveColor={'white'}
                                // renderInsideCircle={() => <CustomComponent />} // custom component to render inside the Switch circle (Text, Image, etc.)
                                changeValueImmediately={true} // if rendering inside circle, change state immediately or wait for animation to complete
                                innerCircleStyle={{
                                    borderWidth: 0,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }} // style for inner animated circle for what you (may) be rendering inside the circle
                                outerCircleStyle={{}} // style for outer animated circle
                                renderActiveText={false}
                                renderInActiveText={false}
                                switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                switchRightPx={2} // denominator for logic when sliding to FALSE position. Higher number = more space from LEFT of the circle to BEGINNING of the slider
                                switchWidthMultiplier={2.4} // multiplied by the `circleSize` prop to calculate total width of the Switch
                                switchBorderRadius={50} // Sets the border Radius of the switch slider. If unset, it remains the circleSize.
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={[style.row, {
                height: 100,
                paddingHorizontal: 30,
                // justifyContent: "space-between",r
            }]}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => console.log('save') } style={style.btn}>
                        <Text style={style.btntxt}>{t("settings.save")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}


