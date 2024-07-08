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
    FlatList
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import Icons from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/FontAwesome";
import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
//   import QuestionHeight from "./FriendProfile";
// import {Avatar,Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../store/store";
import { t } from "i18next";
import Footer from "../../components/Footer";
import Gymslider from "../../components/Gymslider";
import ImageSwiper from "../../components/ImageSwiper";
import CardSlider from "../../components/CardSlider";
import Header from "../../components/Header";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function Home() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);

    const [datas, setDatas] = useState([
        { image: require("../../../assets/img_mock/list1.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
        { image: require("../../../assets/img_mock/list2.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
        { image: require("../../../assets/img_mock/list3.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
        { image: require("../../../assets/img_mock/list4.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
        { image: require("../../../assets/img_mock/list5.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
        { image: require("../../../assets/img_mock/list6.png"), desc1: "NFL Power Rankings 2024:", desc2: "Post NFL Draf" },
    ])

    useEffect(() => {
        // changeStore({ ...store, isLoggedin: false, isLoading: false, page: "home" });
    }, [])

    const renderItem = ({ item, index }) => {
        const lastItem = index === datas.length - 1;
        const selectProgram = (item) => {
            changeStore({ ...store, program: item });
        };
        return (
            <TouchableOpacity >
                <View style={{
                    borderRadius: 10,
                    marginBottom: 20,
                    paddingRight: 20,
                }}>
                    <ImageBackground
                        source={item.image}
                        resizeMode="stretch"
                        style={{ width: width / 2 - 30, height: height / 6, borderRadius: 10 }}
                        borderTopLeftRadius={20}
                        borderTopRightRadius={20}
                    >
                    </ImageBackground>
                    <View style={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                        backgroundColor: theme.itembackground,
                        borderBottomLeftRadius: 20,
                        borderBottomRightRadius: 20,
                        alignItems: "center",
                        width: width / 2 - 30,
                    }}>
                        <Text style={[style.text2, { color: theme.txt, }]}>
                            {item.desc}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView
            style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}
        >
            <StatusBar translucent={true} backgroundColor="transparent" />
            <Header />
            <View style={[style.main, { backgroundColor: theme.bg, }]}>

                {store.isShowSearch &&
                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                        <View style={[style.inputContainer, { backgroundColor: theme.itembackground }]}>
                            <Icons name="search" size={20} color={Colors.itemicon} />
                            <TextInput
                                placeholder={t('Search Card')}
                                selectionColor={Colors.primary}
                                placeholderTextColor={Colors.disable}
                                style={{
                                    flex: 1,
                                    color: Colors.active,
                                    fontFamily: "Plus Jakarta Sans",
                                }}
                            />
                        </View>
                    </View>
                }

                <View style={{ marginTop: 5, }}>
                    <View><Text style={style.txt}>{'Recents'}</Text></View>
                    <View>
                    </View>
                </View>
                <View style={{ marginTop: 5, height: 20 }}>
                    <View style={{
                        flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                        <View><Text style={style.txt}>{'News'}</Text></View>
                        <View>
                            <TouchableOpacity >
                                <IconF name="arrow-right" size={15} color={theme.txt} />
                            </TouchableOpacity>

                        </View>

                    </View>

                </View>

                <View style={{ marginTop: 5, marginBottom: 20, height: height * 0.29 }}>
                    <CardSlider datas={datas} />
                    {/* <FlatList
                        numColumns={2}
                        key={"key-1"}
                        data={datas}
                        keyExtractor={(item, index) => {
                            return index;
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                    /> */}
                </View>

                <View style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 10 }}>
                    <TouchableOpacity style={[style.outlineBtn,]} onPress={() => navigation.navigate('AddCard')}>
                        <IconF name="upload" size={15} color={Colors.primary} style={{ fontWeight: 'bold', fontStyle: 'normal' }} />
                        <Text style={[{ color: Colors.primary, fontSize: 12, paddingLeft: 10, fontWeight: 'bold' }]}>{t('Upload')}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer />
        </SafeAreaView>
    );
}
