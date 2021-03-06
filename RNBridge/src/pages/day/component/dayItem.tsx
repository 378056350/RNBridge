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
    marginBottom: countcoordinatesX(15),
  }
};


const DayItem = () => {

  return (
    <View style={styles.container}>
      <Text>123</Text>
    </View>
  );
};

export default DayItem;
