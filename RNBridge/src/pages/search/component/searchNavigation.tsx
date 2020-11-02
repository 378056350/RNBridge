import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Color } from '~common/colors';
import { Constants, countcoordinatesX } from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import { NativeManager } from '~common/native';

const styles = {
  container: {
    height: Constants.kNavigationHeight,
    flexDirection: "row",
    backgroundColor: "orange",
    paddingTop: Constants.kStatusBarHeight,
    paddingLeft: countcoordinatesX(20),
    paddingRight: countcoordinatesX(20),
    alignItems: "center"
  },
  inputContent: {
    flex: 1,
    backgroundColor: "yellowgreen",
    height: 33,
    borderRadius: 33 / 2,
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {
    width: countcoordinatesX(40),
    height: countcoordinatesX(40),
    backgroundColor: "red",
    marginLeft: countcoordinatesX(10),
    marginRight: countcoordinatesX(10)
  },
  input: {
    flex: 1, 
    backgroundColor: "purple",
    height: 33
  },
  cancle: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: countcoordinatesX(25),
    paddingRight: countcoordinatesX(25),
    marginLeft: countcoordinatesX(15),
    height: Constants.kNavigationHeight - Constants.kStatusBarHeight
  },
  name: {
    fontSize: Constants.kFontNormal(12),
    fontWeight: "300",
    color: Color.kMainTextColor
  }
};

const SearchNavigation = () => {

  const onCanclePress = () => {
    NativeManager.pop()
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContent}>
        <Image style={styles.icon} />
        <TextInput style={styles.input}/>
      </View>
      <TouchableOpacity style={styles.cancle} activeOpacity={1} onPress={onCanclePress}>
        <Text style={styles.name}>取消</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchNavigation;
