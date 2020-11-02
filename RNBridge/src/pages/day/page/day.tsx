import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import DayHeader from '~pages/day/component/dayHeader'
import DayItem from '~pages/day/component/dayItem'

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingBottom: Constants.kSafeAreaBottomHeight + countcoordinatesX(40),
    justifyContent: 'space-between',
  },
  footer: {
    width: Constants.kScreenWidth,
    height: Constants.kSafeAreaBottomHeight
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
];

const Day = () => {
  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  const ListFooterComponent = ()=>{
    return (
      <View style={styles.footer}/>
    )
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'每日购推荐'}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
      />
      <View style={styles.content}>
        <FlatList
          data={DATA}
          numColumns={2}
          renderItem={DayItem}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={DayHeader}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
    </View>
  );
};

export default Day;
