import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Button, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingTop: countcoordinatesX(60),
    paddingBottom: Constants.kSafeAreaBottomHeight + countcoordinatesX(40),
    justifyContent: "space-between",
  },
  contentTop: {
    alignItems: "center",
  },
  contentBottom: {
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: Constants.kScreenWidth / 5,
    height: Constants.kScreenWidth / 5,
    backgroundColor: "red"
  },
  name: {
    marginTop: countcoordinatesX(50),
    fontSize: Constants.kFontNormal(18)
  },
  version: {
    marginTop: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(15)
  },
  link: {
    padding: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: "#356bf5"
  },
  company: {
    marginTop: countcoordinatesX(15),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: Color.kMainTextColor
  }
};

const About = () => {
  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        backgroundColor={Color.kDefaultBackGroundColor}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
      />
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <Image style={styles.icon}/>
          <Text style={styles.name}>123123</Text>
          <Text style={styles.version}>123123</Text>
        </View>
        <View style={styles.contentBottom}>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.link}>{"《软件许可及服务协议》"}</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.9}>
            <Text style={styles.link}>{"《隐私保护指引》"}</Text>
          </TouchableOpacity>
          <Text style={styles.company}>2011-2020 All Rights Reserved</Text>
        </View>
      </View>
    </View>
  );
};

export default About;
