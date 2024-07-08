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
  Modal,
  FlatList,
  StyleSheet,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import style from "../../theme/style";
import themeContext from "../../theme/themeContex";
import { Colors } from "../../theme/color";
import Icons from "react-native-vector-icons/Ionicons";
import IconF from "react-native-vector-icons/Feather";

import { AppBar } from "@react-native-material/core";
import { Avatar } from "react-native-paper";
import VideoPlayer from 'react-native-media-console';
// import {useAnimations} from '@react-native-media-console/reanimated';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useNavigation } from "@react-navigation/native";
import { useStore } from "../../store/store";
import { t } from "i18next";
import Footer from "../../components/Footer";

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;



export default function CreateVideo() {
  const { changeStore, store } = useStore();
  const theme = useContext(themeContext);
  const navigation = useNavigation();
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sVideos, setVideos] = useState([
    { video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",image: require("../../../assets/img_mock/list1.png"), title: "Video 1" },
    { video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",image: require("../../../assets/img_mock/list1.png"), title: "Video 2" },
    { video: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",image: require("../../../assets/img_mock/list1.png"), title: "Video 3" },
  ]);

  const [video, setVideo] = useState('https://vjs.zencdn.net/v/oceans.mp4');

  const handleCamera = () => {
    setVisible(false);
    launchCamera({ mediaType: 'video' }, (response) => {
      if (!response.didCancel) {
        let videoUri = response.uri || response.assets?.[0]?.uri;
        const newArray = [{ video: videoUri,image: require("../../../assets/img_mock/list1.png"), title: response.assets?.[0]?.fileName.split('.')[0] }, ...sVideos];
        setVideos(newArray);
      }
    });
  };

  const handleLibrary = () => {
    setVisible(false);
    launchImageLibrary({ mediaType: 'video' }, (response) => {
      if (!response.didCancel) {
        let videoUri = response.uri || response.assets?.[0]?.uri;
        const newArray = [{ video: videoUri,image: require("../../../assets/img_mock/list1.png"), title: response.assets?.[0]?.fileName.split('.')[0] }, ...sVideos];
        setVideos(newArray);
      }
    });
  };

  useEffect(() => {
    // changeStore({ ...store, isLoggedin: false, isLoading: false, page: "home" });
  }, [])

  const renderItem = ({ item, index }) => {
    const selectVideo = (item) => {
      setVideo(item.video);
    };
    return (
      <TouchableOpacity 
        onPress={() => selectVideo(item)}
      >
        <View style={{
          // borderRadius: 10,
          marginBottom: 20,
          paddingRight: 5,
        }}>
          
          <View style={{
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: theme.itembackground,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            alignItems: "center",
            width: width *0.3,
          }}>
            <Text style={[style.text2, { color: theme.txt, }]}>
              {item.title}
            </Text>
          </View>
          <ImageBackground
            source={item.image}
            resizeMode="stretch"
            style={{ width: width *0.3, height: height *0.08, }}
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
          >
          </ImageBackground>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView
      style={[style.area, { backgroundColor: theme.bg, paddingTop: 30, }]}
    >
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={[style.main, { backgroundColor: theme.bg, }]}>

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
                  <Icons name="close-sharp" color="black" size={20} />
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
                onPress={handleCamera}
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
                <Icons name="camera" size={25} color={theme.txt} />
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
                  onPress={handleLibrary}
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
                  <Icons
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

        <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 10 }}>
          <TouchableOpacity style={[style.outlineBtn,]} onPress={() => setVisible(true)}>
            <IconF name="upload" size={15} color={Colors.primary} style={{ fontWeight: 'bold', fontStyle: 'normal' }} />
            <Text style={[{ color: Colors.primary, fontSize: 12, paddingLeft: 10, fontWeight: 'bold' }]}>{t('createvideo.upload')}</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginVertical: 20, marginBottom: 20, height: height *0.25 }}>
          <VideoPlayer source={{ uri: video }}
            containerStyle={{ height: height * 0.5, borderRadius: 10 }}
            resizeMode={"cover"}
          />
        </View>
        <View style={{marginVertical:10}}>
            <FlatList
              numColumns={3}
              key={"key-1"}
              data={sVideos}
              keyExtractor={(item, index) => {
                return index;
              }}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem}
            />
          </View>
      </View>
      <Footer />
    </SafeAreaView>
  );
}
