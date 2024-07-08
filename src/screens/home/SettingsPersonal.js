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



export default function SettingsPersonal() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const currentUser = store.currentUser;

    const [openClub, setOpenClub] = useState(false);
    const [valueClub, setValueClub] = useState(1);
    const [itemClubs, setItemClubs] = useState(clubList);

    const [openPitch, setOpenPitch] = useState(false);
    const [valuePitch, setValuePitch] = useState(1);
    const [itemPitchs, setItemPitchs] = useState(pitchList);

    const [data, setData] = useState({
        height: currentUser.height,
        weight: currentUser.weight,
        club: currentUser.club,
        pitch: currentUser.pitch,
    });

    useEffect(() => {
        setValueClub(data.club)
        setValuePitch(data.pitch)
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
                            {t("settings.personal")}
                        </Text>
                        <Text style={[style.text2, { color: Colors.disable }]}>
                            {t("settings.modify_basic_information")}
                        </Text>
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.height")}
                        </Text>
                        <TextInput
                            placeholder={t("register.height")}
                            selectionColor={Colors?.primary}
                            placeholderTextColor={Colors?.disable}
                            onChangeText={(e) => setData({ ...data, height: e })}
                            value={data.height.toString()}
                            require
                            style={[
                                style.txtinput,
                                { backgroundColor: theme.bg, },
                            ]}
                        />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.weight")}
                        </Text>
                        <TextInput
                            placeholder={t("register.weight")}
                            selectionColor={Colors?.primary}
                            placeholderTextColor={Colors?.disable}
                            onChangeText={(e) => setData({ ...data, weight: e })}
                            value={data.weight.toString()}
                            require
                            style={[
                                style.txtinput,
                                { backgroundColor: theme.bg, },
                            ]}
                        />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.club")}
                        </Text>
                        <View style={{ zIndex: 200, flex: 1, backgroundColor: theme.bg }}>
                            <DropDownPicker
                                style={{
                                    backgroundColor: theme.bg,
                                    borderColor: Colors.bord,
                                    color: theme.txt,
                                    height: 50,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                                listMode="MODAL"
                                theme="DARK"
                                open={openClub}
                                value={valueClub}
                                items={itemClubs}
                                setOpen={setOpenClub}
                                setValue={setValueClub}
                                setItems={setItemClubs}
                                onChangeValue={(e) => {
                                    setData({ ...data, passport: e });
                                }}
                            />
                        </View>
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.position_on_pitch")}
                        </Text>
                        <View style={{ zIndex: 200, flex: 1, backgroundColor: theme.bg }}>
                            <DropDownPicker
                                style={{
                                    backgroundColor: theme.bg,
                                    borderColor: Colors.bord,
                                    color: theme.txt,
                                    height: 50,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                                listMode="MODAL"
                                theme="DARK"
                                open={openPitch}
                                value={valuePitch}
                                items={itemPitchs}
                                setOpen={setOpenPitch}
                                setValue={setValuePitch}
                                setItems={setItemPitchs}
                                onChangeValue={(e) => {
                                    setData({ ...data, passport: e });
                                }}
                            />
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


