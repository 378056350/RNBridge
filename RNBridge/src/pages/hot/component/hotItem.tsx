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
    backgroundColor: "orange",
    width: (Constants.kScreenWidth - countcoordinatesX(15) * 3) / 2,
    marginLeft: countcoordinatesX(15),
    marginTop: countcoordinatesX(15),
    paddingTop: countcoordinatesX(100),
    paddingBottom: countcoordinatesX(100)
  }
};


const HotItem = () => {

  return (
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  );
};

export default HotItem;
