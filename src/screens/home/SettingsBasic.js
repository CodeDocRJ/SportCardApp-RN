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
import { passportList, placeList } from "../../constants";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function SettingsBasic() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const currentUser = store.currentUser;
    const [openPob, setOpenPob] = useState(false);
    const [valuePob, setValuePob] = useState(currentUser.pob);
    const [itemPobs, setItemPobs] = useState(placeList);
    
    const [openPassport, setOpenPassport] = useState(false);
    const [valuePassport, setValuePassport] = useState(currentUser.passport);
    const [itemPassports, setItemPassports] = useState(passportList);

    const [data, setData] = useState({
        name: currentUser.name,
        dob: currentUser.dob,
        pob: currentUser.pob,
        d_dob: new Date(), // Choose date
        passport: ""
    });

    function padZero(num) {
        return (num < 10 ? '0' : '') + num;
    }

    useEffect(() => {
        console.log(currentUser)
        const [month, day, year] = currentUser.dob.split('/');
        const date = new Date(year, month - 1, day, 0, 0, 0);
        setData({ ...data, d_dob: date });
    }, []);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        hideDatePicker();
        const datetime = new Date(date);
        const day = datetime.getDate(); // Get the day (1-31)
        const month = datetime.getMonth(); // Get the month (0-11)
        const year = datetime.getFullYear(); // Get the full year (e.g., 2024)

        setData({
            ...data,
            d_dob: datetime,
            dob: padZero(month + 1) + "/" + padZero(day) + "/" + year,
        });
    };


    useEffect(() => {
        // changeStore({ ...store, isLoggedin: false, isLoading: false, page: "home" });
    }, [])

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
                            {t("settings.basic")}
                        </Text>
                        <Text style={[style.text2, { color: Colors.disable }]}>
                            {t("settings.modify_basic_information")}
                        </Text>
                    </View>

                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.name")}
                        </Text>
                        <TextInput
                            placeholder={t("name ")}
                            selectionColor={Colors?.primary}
                            placeholderTextColor={Colors?.disable}
                            onChangeText={(e) => setData({ ...data, name: e })}
                            value={data.name}
                            require
                            style={[
                                style.txtinput,
                                { backgroundColor: theme.bg, },
                            ]}
                        />
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.dob")}
                        </Text>
                        <View
                            style={[
                                style.txtinput,
                                {
                                    paddingHorizontal: 15,
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderColor: Colors.disable,
                                },
                            ]}>
                            <TextInput
                                value={data.dob}
                                style={{ color: Colors.disable, }}
                            />
                            <TouchableOpacity onPress={showDatePicker}>
                                <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    locale="ja-JP"
                                    timeZoneOffsetInMinutes={540}
                                    date={data.d_dob}
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                                <Icons name="calendar" size={18} color={theme.txt} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.pob")}
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
                                placeholder="Country"
                                listMode="MODAL"
                                theme="DARK"
                                open={openPob}
                                value={valuePob}
                                items={itemPobs}
                                setOpen={setOpenPob}
                                setValue={setValuePob}
                                setItems={setItemPobs}
                                onChangeValue={(e) => {
                                    setData({ ...data, pob: e });
                                }}
                            />
                        </View>
                    </View>
                    <View style={{ paddingVertical: 10 }}>
                        <Text style={[style.text2, { color: theme.txt, paddingVertical: 5 }]}>
                            {t("register.passport")}
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
                                placeholder="Country"
                                open={openPassport}
                                value={valuePassport}
                                items={itemPassports}
                                setOpen={setOpenPassport}
                                setValue={setValuePassport}
                                setItems={setItemPassports}
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


