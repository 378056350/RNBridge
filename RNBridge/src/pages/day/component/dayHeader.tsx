import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';

const styles = {
  container: {
    
  },
  icon: {
    width: Constants.kScreenWidth,
    height: Constants.kScreenWidth / 3,
    backgroundColor: "red"
  },
  tip: {
    width: Constants.kScreenWidth,
    height: countcoordinatesX(70),
    backgroundColor: "orange"
  }
};


const Day = () => {

  return (
    <View style={styles.container}>
      <Image style={styles.icon}/>
      <Image style={styles.tip}/>
    </View>
  );
};

export default Day;
