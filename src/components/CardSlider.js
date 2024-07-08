import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    ImageBackground,
    Dimensions
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from '@react-native-community/blur';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';

import { useSelector, useDispatch } from "react-redux";
import theme from "../theme/theme";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

export default CardSlider = ({ datas }) => {

    const navigation = useNavigation();

    const styles = StyleSheet.create({
        wrapper: { height: 700 },
        slide: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            // height: 700,
            borderRadius: 30,
            borderWidth: 2,
        },
        overlay: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            height: '30%',
        },
        text: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: -100, // Adjust the value to position the text as desired
        },
        blurOverlay: {
            ...StyleSheet.absoluteFillObject,
        },
        hiddenMe: {
            display: "none"
        }
    });
    useEffect(() => {
    }, [])

    const IntrdouctionComponent = (data) => {
        return (
            <View style={{
                flex:1,
                justifyContent:'flex-end',
                marginLeft:10
            }}>
                {/* <LinearGradient
                    colors={['#6E635B', '#1D171B']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        position: "absolute", bottom: 0, left: 10, backgroundColor: "black",
                        height: 250, paddingLeft: 10, width: '95%'
                    }}
                > */}
                    <Text style={{ color: theme.dark.txt, fontSize: 12, fontWeight: 700, }}>{data.data.desc1}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={{ color: theme.dark.txt, fontSize: 12, fontWeight: 700, }}>{data.data.desc2}</Text>
                    </View>
                {/* </LinearGradient> */}

            </View>
        )
    }

    return (
        <Swiper style={styles.wrapper} autoplay={false}>
            {datas.map((data, index) => (
                <View key={index} style={styles.slide}>
                    <ImageBackground
                        imageStyle={{ borderRadius: 10}}
                        source={data.image}
                        style={[styles.image, { width: width * 0.9, height: width * 0.3 }]}
                        resizeMode="cover"
                    >
                        <IntrdouctionComponent data={data} />
                    </ImageBackground>
                </View>
            ))}
        </Swiper>
    );
};
