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
//   import QuestionHeight from "./FriendProfile";
// import {Avatar,Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { launchCamera } from "react-native-image-picker";
import { useStore } from "../../store/store";
import { t, use } from "i18next";
import Footer from "../../components/Footer";
import { images } from "../../constants";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function Settings() {
    const { changeStore, store } = useStore();
    const theme = useContext(themeContext);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [visible, setVisible] = useState(false);
    const currentUser = store.currentUser;


    const [selectedImage, setSelectedImage] = useState(
        currentUser.image_file
    );
    const [image, setImage] = useState(null);
    const openImagePicker = () => {
        setVisible(false);
        const options = {
            mediaType: "photo",
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log("User cancelled image picker");
            } else if (response.error) {
                console.log("Image picker error: ", response.error);
            } else {
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                setImage(response);
            }
        });
    };

    const handleCameraLaunch = () => {
        setVisible(false);
        const options = {
            mediaType: "photo",
            includeBase64: false,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchCamera(options, (response) => {
            console.log("Response = ", response);
            if (response.didCancel) {
                console.log("User cancelled camera");
            } else if (response.error) {
                console.log("Camera Error: ", response.error);
            } else {
                // Process the captured image
                let imageUri = response.uri || response.assets?.[0]?.uri;
                setSelectedImage(imageUri);
                setImage(response);
                console.log(imageUri);
            }
        });
    };

    const handlelogout = async () => {
        await changeStore({
          isLoggedin:false,
          showSplashScreen:false,
          darkMode:darkMode,
        });
        navigation.navigate("login");
      };


    useEffect(() => {
        // changeStore({ ...store, isLoggedin: false, isLoading: false, page: "home" });
    }, [])

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

    return (
        <SafeAreaView style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}>
            <StatusBar translucent={true} backgroundColor="transparent" />
            <AppBar
                color={theme.bg}
                title={currentUser.name}
                titleStyle={{ color: theme.txt, fontWeight: 'bold', }}
                centerTitle={true}
                elevation={0}
                // leading={
                //     <TouchableOpacity onPress={() => navigation.goBack()}>
                //         <IconM
                //             name="chevron-left"
                //             style={{ backgroundColor: theme.bg }}
                //             color={Colors.primary}
                //             size={40}
                //         />
                //     </TouchableOpacity>
                // }
            />
            <View style={[style.main, { backgroundColor: theme.bg, }]}>
                <View style={{ paddingTop: 30, alignItems: "center", }} >
                    <Avatar.Image
                        source={{ uri: selectedImage }}
                        size={100}
                        style={{ backgroundColor: Colors.secondary }}
                    ></Avatar.Image>
                    <View style={{ alignItems: "center", justifyContent: "center", width: width * 0.4, marginVertical: 10 }}>
                        <Text style={[{ fontSize: 16, fontWeight: "bold", color: theme.txt, }]} > {currentUser.name}</Text>
                        <Text style={[{ fontSize: 12, color: Colors.disable, }]} > {currentUser.id} </Text>
                    </View>
                    <View
                        style={{ position: "absolute", height: "30%", width: "20%", marginTop: 100, alignItems: "center", right: width / 2 - 100, }}>
                        <TouchableOpacity onPress={() => setVisible(true)}>
                            <Avatar.Image
                                source={images.edit}
                                size={30}
                                style={{}}
                            ></Avatar.Image>
                            <Modal transparent={true} visible={visible}>
                                <View
                                    style={{
                                        width: width,
                                        flex: 1,
                                        backgroundColor: "#000000aa",
                                        transparent: "true",
                                    }}
                                >
                                    <View
                                        style={[
                                            style.modalcontainer,
                                            { backgroundColor: theme.bg, width: width - 20 },
                                        ]}
                                    >
                                        <View
                                            style={{ paddingHorizontal: 20, alignSelf: "flex-end" }}
                                        >
                                            <TouchableOpacity onPress={() => setVisible(false)}>
                                                <Icon name="close-sharp" color="black" size={20} />
                                            </TouchableOpacity>
                                        </View>
                                        <Text
                                            style={[
                                                style.title,
                                                { color: theme.txt, alignSelf: "center" },
                                            ]}
                                        >
                                            {t("change_your_picutre")}
                                        </Text>
                                        <View
                                            style={[
                                                style.divider1,
                                                { color: Colors.disable, marginBottom: 20 },
                                            ]}
                                        ></View>
                                        <TouchableOpacity
                                            onPress={handleCameraLaunch}
                                            style={{
                                                // paddingTop: 15 ,
                                                paddingVertical: 15,
                                                backgroundColor: theme.bg,
                                                // theme == "dark" ? "#434E58" : "#E3E7EC",
                                                borderRadius: 10,
                                                paddingHorizontal: 20,
                                                flexDirection: "row",
                                            }}
                                        >
                                            <Icon name="camera" size={25} color={theme.txt} />
                                            <Text
                                                style={[
                                                    style.subtitle,
                                                    { color: theme.txt, paddingLeft: 15 },
                                                ]}
                                            >
                                                {t("take_photo")}
                                            </Text>
                                        </TouchableOpacity>
                                        <View style={{ paddingTop: 15 }}>
                                            <TouchableOpacity
                                                onPress={openImagePicker}
                                                style={{
                                                    //  paddingTop: 15 ,
                                                    paddingVertical: 15,
                                                    backgroundColor: theme.bg,
                                                    // theme == "light" ? "#4A4A65" : "#E3E7EC",
                                                    borderRadius: 10,
                                                    paddingHorizontal: 20,
                                                    flexDirection: "row",
                                                }}
                                            >
                                                <Icon
                                                    name="folder-open-outline"
                                                    size={25}
                                                    color={theme.txt}
                                                />
                                                <Text
                                                    style={[
                                                        style.subtitle,
                                                        { color: theme.txt, paddingLeft: 15 },
                                                    ]}
                                                >
                                                    {t("choose_from_your_file")}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </View>
                </View>


                <TouchableOpacity
                    onPress={() => navigation.navigate("settingsBasic")}
                >
                    <View style={styles.itemcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                                <Text style={[{ fontSize: 16, color: theme.txt, }]} > {t('settings.basic')}</Text>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate("settingsPersonal")}
                >
                    <View style={styles.itemcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                                <Text style={[{ fontSize: 16, color: theme.txt, }]} > {t('settings.personal')}</Text>
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

                <TouchableOpacity
                    onPress={() => navigation.navigate("settingsSecurity")}
                >
                    <View style={styles.itemcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                                <Text style={[{ fontSize: 16, color: theme.txt, }]} > {t('settings.security')}</Text>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate("settingsAppearance")}
                >
                    <View style={styles.itemcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                                <Text style={[{ fontSize: 16, color: theme.txt, }]} > {t('settings.appearance')}</Text>
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
                <TouchableOpacity
                    onPress={() => handlelogout()}
                >
                    <View style={styles.itemcontainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ justifyContent: "center", width: width * 0.4, paddingLeft: 10 }}>
                                <Text style={[{ fontSize: 16, color: theme.txt, }]} > {t('settings.logout')}</Text>
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
            </View >
            <Footer />
        </SafeAreaView >
    );
}


