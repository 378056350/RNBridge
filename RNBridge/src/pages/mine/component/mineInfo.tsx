import React, {useEffect} from 'react';
import {View, Image, Button} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager, NativeManagerUnInstall} from '~common/native';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';

const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: Constants.kScreenWidth / 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "red"
  }
};

const MineInfo = () => {
  
  return (
    <View style={styles.container}>
      
    </View>
  );
};

export default MineInfo;
