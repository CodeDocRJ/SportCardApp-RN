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
    StyleSheet
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import Icons from "react-native-vector-icons/Ionicons";
import IconM from "react-native-vector-icons/MaterialCommunityIcons";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../store/store";
import { t } from "i18next";
import Footer from "../../components/Footer";
import { CategoryList, images } from "../../constants";
import { Dropdown } from 'react-native-element-dropdown';
import DropDownPicker from "react-native-dropdown-picker";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function Statistics() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);


    const [openPob, setOpenPob] = useState(false);
    const [valuePob, setValuePob] = useState(0);
    const [itemPobs, setItemPobs] = useState(CategoryList);

    // const [categories, setCategories] = useState(CategoryList);

    const data = [
        { label: 'Item 1', value: '1' },
        { label: 'Item 2', value: '2' },
        { label: 'Item 3', value: '3' },
        { label: 'Item 4', value: '4' },
        { label: 'Item 5', value: '5' },
        { label: 'Item 6', value: '6' },
        { label: 'Item 7', value: '7' },
        { label: 'Item 8', value: '8' },
    ];

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel = () => {
        if (value || isFocus) {
            return (
                <Text style={[styles.label, isFocus && { color: 'blue' }]}>
                    Dropdown label
                </Text>
            );
        }
        return null;
    };



    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 50,
        },
        tabBar: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: theme.background,
            marginBottom: 20,
        },
        tabButton: {
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: theme.background,
        },
        tabButtonText: {
            fontSize: 14,
            fontWeight: 'bold',
            color: Colors.disable

        },
        activeTabText: {
            borderBottomWidth: 2,
            borderColor: Colors.primary,

        },
        activeTabView: {
            backgroundColor: Colors.primary,
            width: 30, height: 5,
            alignSelf: "center",
            marginTop: 10,
            borderRadius: 10
        },
        activeColor: {
            color: theme.txt,
        },
        renderItem2View: {
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 30,
            justifyContent: "space-between",
            width: width - 40,
            height: height * 0.09,
            borderBottomColor: Colors.disable, borderBottomWidth: 2
        },
        tabContent: {
            // flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
        },
    });

    const [datas, setDatas] = useState([
        { image: images.card_nhl, desc: 'NHL' },
        { image: images.card_nba, desc: 'NBA' },
        { image: images.card_nhl, desc: 'MLB' },
        { image: images.card_nfl, desc: 'NFL' },
    ]);

    useEffect(() => {
        // changeStore({ ...store, isLoggedin: false, isLoading: false, page: "home" });
    }, [])

    const renderItem1 = ({ item, index }) => {
        const selectProgram = (item) => {
            changeStore({ ...store, program: item });
        };
        return (
            <TouchableOpacity >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 10,
                    marginBottom: 20,
                    paddingRight: 20,

                }}>

                    <View style={{
                        alignItems: 'center',
                        paddingVertical: 15,
                        paddingHorizontal: 15,
                        backgroundColor: theme.itembackground,
                        borderRadius: 20,
                        // alignItems: "center",
                        justifyContent: "space-evenly",
                        width: width / 2 - 30,
                        height: height * 0.16,
                        borderColor: Colors.disable
                    }}>
                        <Image
                            source={item.image}
                            resizeMode="stretch"
                            style={{ width: 80, height: 80, alignContent: "center", }}
                            tintColor={theme.txt}
                        />
                    </View>
                    <Text style={[style.text2, { color: theme.txt, }]} > {item.desc} </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const renderItem2 = ({ item, index }) => {

        const lastItem = index === datas.length - 1;
        const selectProgram = (item) => {
            changeStore({ ...store, program: item });
        };
        return (
            <TouchableOpacity >
                <View style={styles.renderItem2View}>
                    <View style={{ flexDirection: "row", alignSelf: "center", justifyContent: "center" }}>
                        <Image
                            source={item.image}
                            resizeMode="stretch"
                            style={{ width: 25, height: 25, alignSelf: "center", marginRight: 10 }}
                            tintColor={theme.txt}
                        />
                        <Text style={[{ fontSize: 14, color: theme.txt, width: 80, alignSelf: "center" }]} > {item.desc} </Text>
                    </View>
                    <View style={{ width: 80, paddingRight: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[{ color: theme.txt, fontWeight: 'bold', fontSize: 14, }]} > {item.avg}</Text>
                    </View>
                    <View style={{ width: 80, paddingRight: 15, justifyContent: "center", alignItems: "center" }}>
                        <Text style={[{ color: theme.txt, fontWeight: 'bold', fontSize: 14, }]} >{item.matchnum} </Text>
                    </View>

                </View>
            </TouchableOpacity>
        );
    };

    const renderItem3 = ({ item, index }) => {
        const selectPerson = (item) => {
            navigation.navigate('details');
            changeStore({ ...store, user: item });
        };
        return (
            <TouchableOpacity
                onPress={() => selectPerson(item)}
            >
                <View style={{
                    flexDirection: "row",
                    paddingRight: 20,
                    backgroundColor: theme.itembackground,
                    borderRadius: 20,
                    alignContent: "center",
                    justifyContent: "space-between",
                    width: width - 40,
                    height: height * 0.09,
                    marginBottom: 10,
                }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image
                            source={item.image}
                            style={{ width: height * 0.1, height: height * 0.1, borderTopLeftRadius: 20, borderBottomLeftRadius: 20 }}
                        />
                        <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                            <Text style={[{ fontSize: 16, fontWeight: "bold", color: theme.txt, }]} > {item.name}</Text>
                            <Text style={[{ fontSize: 12, color: Colors.disable, }]} > {item.desc} </Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "center" }}>
                        <IconM
                            name="chevron-right"
                            color={Colors.disable}
                            size={26}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (tabNumber) => {
        setActiveTab(tabNumber);
    };


    return (
        <SafeAreaView
            style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}
        >
            <AppBar
                color={theme.bg}
                title={t('Search Cards')}
                titleStyle={{ fontFamily: "Plus Jakarta Sans" }}
                centerTitle={true}
                elevation={0}
                leading={
                    <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                        <Avatar.Icon
                            icon="arrow-left"
                            style={{ backgroundColor: theme.bg }}
                            color={theme.txt}
                            size={40}
                        />
                    </TouchableOpacity>
                }
            />

            <StatusBar translucent={true} backgroundColor="transparent" />
            <View style={[style.main, { backgroundColor: theme.bg, }]}>
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tabButton,]}
                        onPress={() => handleTabChange(1)}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 1 && styles.activeColor]}>{t('By Game')}</Text>
                        <View style={activeTab === 1 && styles.activeTabView}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabButton, activeTab === 2]}
                        onPress={() => handleTabChange(2)}
                    >
                        <Text style={[styles.tabButtonText, activeTab === 2 && styles.activeColor]}>{t('By Number')}</Text>
                        <View style={activeTab === 2 && styles.activeTabView}></View>
                    </TouchableOpacity>
                </View>
                <View style={styles.tabContent}>
                    {activeTab === 1 && <View style={{ marginTop: 5, marginBottom: 20, height: height * 0.6 }}>
                        <FlatList
                            numColumns={2}
                            key={"key-1"}
                            data={datas}
                            keyExtractor={(item, index) => {
                                return index;
                            }}
                            showsVerticalScrollIndicator={false}
                            renderItem={renderItem1}
                        />
                    </View>}
                    {activeTab === 2 && <View style={{ marginTop: 5, marginBottom: 20, }}>


                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Category</Text>
                            </View>

                            <View style={{ marginTop: 10, zIndex: 200, backgroundColor: theme.bg }}>
                                <DropDownPicker
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }}
                                    listMode="FLATLIST"
                                    theme="DARK"
                                    placeholder="Select"
                                    open={openPob}
                                    value={valuePob}
                                    items={itemPobs}
                                    setOpen={setOpenPob}
                                    setValue={setValuePob}
                                    setItems={setItemPobs}
                                    // onChangeValue={(e) => {
                                    // setData({ ...data, pob: e });
                                    // }}
                                />
                            </View>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Name</Text>
                            </View>
                            <View style={{ marginTop: 10 }}>
                                <TextInput
                                    placeholder={t("Name")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Brand</Text>
                            </View>
                            <View style={{ paddingVertical: 5, }}>
                                <TextInput
                                    placeholder={t("Brand or manufacturer")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Year</Text>
                            </View>
                            <View style={{ paddingVertical: 5, }}>
                                <TextInput
                                    placeholder={t("Year")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Set</Text>
                            </View>
                            <View style={{ paddingVertical: 5, }}>
                                <TextInput
                                    placeholder={t("Set")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Number</Text>
                            </View>
                            <View style={{ paddingVertical: 5, }}>
                                <TextInput
                                    placeholder={t("Number")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View>
                                <Text style={[style.txt, { color: theme.txt }]}>Team</Text>
                            </View>
                            <View style={{ paddingVertical: 5, }}>
                                <TextInput
                                    placeholder={t("Team")}
                                    selectionColor={Colors?.primary}
                                    placeholderTextColor={Colors?.disable}
                                    require
                                    style={{
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        paddingHorizontal: 20,
                                        color: Colors.disable,
                                        height: 45,
                                        width: width * 0.7,
                                        backgroundColor: theme.itembackground
                                    }} />
                            </View>
                        </View>
                    </View>}
                </View>
            </View>
        </SafeAreaView>
    );
}


