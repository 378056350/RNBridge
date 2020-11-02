import React, {useEffect, useState, useRef} from 'react';
import {Animated, View, Text, Button, Image, TouchableOpacity, SectionList} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import GoodHeader from '~pages/good/component/goodHeader';
import GoodSwiper from '~pages/good/component/goodSwiper';
import GoodInfo from '~pages/good/component/goodInfo';
import GoodFooter from '~pages/good/component/goodFooter'


const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.kDefaultBackGroundColor
  },
};

const DATA = [
  {
    title: 'Main dishes',
    section: 0,
    data: ['Pizza'],
  },
  {
    title: 'Sides',
    section: 1,
    data: ['French Fries'],
  },
  {
    title: 'Drinks',
    section: 2,
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    section: 3,
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const Item = ({section, item, index}) => {
  if (section == 0) {
    return <GoodSwiper/>
  }
  else if (section == 1) {
    return <GoodInfo/>
  }
  return (
    <View>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
      <Text>123123</Text>
    </View>
  )
}

const Good = () => {
  const offsetAnimY = new Animated.Value(0)

  const onLeftPress = () => {
    NativeManager.pop();
  };

  const onRightPress = () => {};

  return (
    <View style={styles.container}>
      <SectionList
        onScroll={(event)=>{
          NativeManager.hideKeyboard()
          offsetAnimY.setValue(event.nativeEvent.contentOffset.y)
        }}
        showsVerticalScrollIndicator={false}
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({section: {section}, item, index}) => <Item title={item} index={index} section={section}/>}
      />
      <GoodFooter/>
      <GoodHeader 
        onLeftPress={onLeftPress} 
        onRightPress={onRightPress} 
        style={{
          opacity: offsetAnimY.interpolate({
            inputRange: [-1, 0, Constants.kScreenWidth / 6 * 5 - Constants.kNavigationHeight - Constants.kStatusBarHeight],
            outputRange: [0, 0, 1]  // 0 : 150, 0.5 : 75, 1 : 0
          })
        }}
      />
    </View>
  );
};

export default Good;
