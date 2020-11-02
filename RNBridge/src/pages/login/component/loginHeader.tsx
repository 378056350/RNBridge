import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, ImageBackground} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';

const styles = {
  container: {
    width: Constants.kScreenWidth,
    backgroundColor: 'red',
    marginBottom: countcoordinatesX(30)
  },
  backTouch: {
    width: countcoordinatesX(80),
    height: countcoordinatesX(80),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Constants.kStatusBarHeight,
    marginLeft: countcoordinatesX(15),
  },
  back: {
    width: countcoordinatesX(40),
    height: countcoordinatesX(40),
  },
  name: {
    marginTop: countcoordinatesX(40),
    paddingLeft: countcoordinatesX(40),
    paddingBottom: countcoordinatesX(90),
    fontSize: Constants.kFontNormal(20),
    fontWeight: "600",
    color: "white",
  },
  shadow: {
    width: Constants.kScreenWidth,
    height: countcoordinatesX(30),
    backgroundColor: "white",
    borderTopLeftRadius: countcoordinatesX(30),
    borderTopRightRadius: countcoordinatesX(30),
  }
};

const LoginHeader = () => {

  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  return (
    <ImageBackground style={styles.container} source={require("~assets/img/login/loginTopback.png")}>
      <TouchableOpacity style={styles.backTouch} activeOpacity={0.9} onPress={buttonLeftPress}>
        <Image style={styles.back} resizeMode={"contain"} source={require("~assets/img/authCLose.png")}/>
      </TouchableOpacity>
      <Text style={styles.name}>登录</Text>
      <View style={styles.shadow}/>
    </ImageBackground>
  );
};

export default LoginHeader;
