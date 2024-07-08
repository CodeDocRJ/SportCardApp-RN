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
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/Ionicons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

import { useStore } from "../../store/store";
import { t, use } from "i18next";
import Footer from "../../components/Footer";
import { clubList, images, pitchList } from "../../constants";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function SettingsSecurity() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const currentUser = store.currentUser;

    const [isCPasswordVisible, setIsCPasswordVisible] = useState(false);

    const [isNPasswordVisible, setIsNPasswordVisible] = useState(false);

    const [isCNPasswordVisible, setIsCNPasswordVisible] = useState(false);

    const [data, setData] = useState({
        currentpassword: "",
        newpassword: "",
        confirmpassword: "",
    });

    useEffect(() => {
    }, []);


    const styles = StyleSheet.create({
        itemcontainer: {
            flexDirection: "row",
            paddingRight: 20,
            alignContent: "center",
            justifyContent: "space-between",
            width: width - 40,
            height: height * 0.07,
            borderBottomWidth: 1,
            borderBottomColor: Colors.disable
        },
    });

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
                            {t("settings.security")}
                        </Text>
                        <Text style={[style.text2, { color: Colors.disable }]}>
                            {t("settings.modify_security")}
                        </Text>
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("settings.current_password")}
                        </Text>
                        <View
                            style={[
                                style.txtinput,
                                {
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: 1,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder={t("settings.current_password")}
                                selectionColor={Colors.primary}
                                secureTextEntry={!isCPasswordVisible}
                                placeholderTextColor={Colors.disable}
                                value={data.currentpassword}
                                onChangeText={(e) => setData({ ...data, currentpassword: e })}
                                style={{
                                    backgroundColor: theme.bg,
                                    color: Colors.disable,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                            ></TextInput>
                            <TouchableOpacity
                                onPress={() => setIsCPasswordVisible(!isCPasswordVisible)}
                            >
                                <Icon
                                    name={isCPasswordVisible ? "eye-off" : "eye"}
                                    color={Colors.secondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("settings.new_password")}
                        </Text>
                        <View
                            style={[
                                style.txtinput,
                                {
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: 1,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder={t("settings.new_password")}
                                selectionColor={Colors.primary}
                                secureTextEntry={!isNPasswordVisible}
                                placeholderTextColor={Colors.disable}
                                value={data.newpassword}
                                onChangeText={(e) => setData({ ...data, newpassword: e })}
                                style={{
                                    backgroundColor: theme.bg,
                                    color: Colors.disable,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                            ></TextInput>
                            <TouchableOpacity
                                onPress={() => setIsNPasswordVisible(!isNPasswordVisible)}
                            >
                                <Icon
                                    name={isNPasswordVisible ? "eye-off" : "eye"}
                                    color={Colors.secondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("settings.confirm_password")}
                        </Text>
                        <View
                            style={[
                                style.txtinput,
                                {
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingBottom: 1,
                                },
                            ]}
                        >
                            <TextInput
                                placeholder={t("settings.confirm_password")}
                                selectionColor={Colors.primary}
                                secureTextEntry={!isCNPasswordVisible}
                                placeholderTextColor={Colors.disable}
                                value={data.confirmpassword}
                                onChangeText={(e) => setData({ ...data, confirmpassword: e })}
                                style={{
                                    backgroundColor: theme.bg,
                                    color: Colors.disable,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                            ></TextInput>
                            <TouchableOpacity
                                onPress={() => setIsCNPasswordVisible(!isCNPasswordVisible)}
                            >
                                <Icon
                                    name={isCNPasswordVisible ? "eye-off" : "eye"}
                                    color={Colors.secondary}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>



                </View>
            </ScrollView>
            <View style={[style.row, {
                height: 100,
                paddingHorizontal: 30,
                // justifyContent: "space-between",
            }]}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => console.log("save")} style={style.btn}>
                        <Text style={style.btntxt}>{t("settings.save")}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView >
    );
}


