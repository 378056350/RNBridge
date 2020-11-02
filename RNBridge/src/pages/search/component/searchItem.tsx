import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';

const styles = {
  container: {
    flexDirection: "row",
    height: countcoordinatesX(80),
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: Color.kLineColor,
    borderBottomWidth: countcoordinatesX(1),
  },
  name: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "300",
    color: Color.kSecondaryTextColor
  },
  iconTouch: {
    padding: countcoordinatesX(10),
    backgroundColor: "orange"
  },
  icon: {
    width: countcoordinatesX(45),
    height: countcoordinatesX(45),
    backgroundColor: "red"
  }
};

const SearchItem = () => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.name}>123</Text>
      <TouchableOpacity style={styles.iconTouch}>
        <Image style={styles.icon}/>
      </TouchableOpacity>
    </View>
  );
};

export default SearchItem;
