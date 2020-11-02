import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import SegmentBar from '~components/segment/segmentBar';
import HotItem from '~pages/hot/component/hotItem';

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingBottom: Constants.kSafeAreaBottomHeight,
    justifyContent: 'space-between',
  },
  list: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight,
    backgroundColor: Color.kDefaultBackGroundColor
  },
  status: {
    width: Constants.kScreenWidth,
    height: Constants.kStatusBarHeight,
    backgroundColor: "white",
    position: "absolute",
    left: 0,
    top: 0
  },
  footer: {
    width: Constants.kScreenWidth,
    height: Constants.kSafeAreaBottomHeight + countcoordinatesX(15)
  }
};

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const Hot = () => {

  const offsetAnimY = new Animated.Value(0)

  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  const ListHeaderComponent = ()=>{
    return (
      <View style={{height: Constants.kNavigationHeight + countcoordinatesX(80)}}/>
    )
  }

  const ListFooterComponent = ()=>{
    return (
      <View style={styles.footer}/>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList
        onScroll={(event)=>{
          offsetAnimY.setValue(event.nativeEvent.contentOffset.y)
        }}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        data={DATA}
        numColumns={2}
        renderItem={HotItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
      />
      <View style={styles.status}/>
      <NavigationBar
        title={'大麦特卖'}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
        style={{
          transform: [{
            translateY: offsetAnimY.interpolate({
              inputRange: [0, Constants.kNavigationHeight, Constants.kNavigationHeight + countcoordinatesX(160)],
              outputRange: [0, 0, -Constants.kNavigationHeight]
            }),
          }],
        }}
      />
      <SegmentBar
        style={{
          transform: [{
            translateY: offsetAnimY.interpolate({
              inputRange: [0, Constants.kNavigationHeight, Constants.kNavigationHeight + countcoordinatesX(80), 9999],
              outputRange: [0, 0, -(Constants.kNavigationHeight - Constants.kStatusBarHeight), -(Constants.kNavigationHeight - Constants.kStatusBarHeight)]
            }),
          }],
        }}
        names={['111', '222', '333']}
        chooseIcon={[false, false, true]}
        icon={[
          [],
          [],
          [
            require('~assets/img/价格-黑.png'),
            require('~assets/img/价格-1.png'),
            require('~assets/img/价格-2.png'),
          ],
        ]}
      />
    </View>
  );
};

export default Hot;
