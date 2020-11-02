import React, {useEffect, useState} from 'react';
import {View, Text, Image, ViewProps,
  NativeEventEmitter,
  NativeModules} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager, NativeManagerUnInstall} from '~common/native';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import MineInfo from '~pages/mine/component/mineInfo'
import MineOrder from '~pages/mine/component/mineOrder'
import MineModule from '~pages/mine/component/mineModule'

interface MineIProps {}

type IProps = MineIProps & ViewProps;

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.kDefaultBackGroundColor,
  }
};

const Mine = (props: IProps) => {

  const {RNBridgeNativeEmiter} = NativeModules;
  const rnBridgeNativeEmiter = new NativeEventEmitter(RNBridgeNativeEmiter);

  // 已经进入
  const subscription2 = rnBridgeNativeEmiter.addListener(
    'rn_viewDidLoad',
    async (reminder) => {
      if (reminder === props.uuid) {
        NativeManager.addPrebundles(['order', 'collection', 'coupon', 'about', 'address']);
      }
    },
  );

  useEffect(() => {
    return () => {
      subscription2.remove();
    };
  });



  const onOrderPress = (index: number) => {
    NativeManager.push({name: "order", props: {
      index: index
    }});
  }

  const onModulePress = (index: number)=>{
    if (index == 0) {
      NativeManager.push({name: "collection"});
    } else if (index == 1) {
      NativeManager.push({name: "address"});
    } else if (index == 2) {
      NativeManager.push({name: "coupon"});
    } else if (index == 3) {
      NativeManager.push({name: "about"});
    } 
  }

  return (
    <View style={styles.container}>
      <MineInfo/>
      <MineOrder onPress={onOrderPress}/>
      <MineModule onPress={onModulePress}/>
    </View>
  );
};

export default Mine;
