import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import LinearGradient from 'react-native-linear-gradient';

const styles = {
  container: {
    width: Constants.kScreenWidth,
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingBottom: Constants.kSafeAreaBottomHeight,
  },
  iconTouch: {
    padding: countcoordinatesX(15),
    paddingLeft: countcoordinatesX(15),
  },
  smallIcon: {
    alignItems: 'center',
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
  },
  icon: {
    width: countcoordinatesX(40),
    height: countcoordinatesX(40),
  },
  name: {
    marginTop: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(11),
    fontWeight: '300',
    color: Color.kSecondaryTextColor,
  },
  buttonTouch: {
    flex: 1
  },
  buttonShadow: {
    flex: 1,
    backgroundColor: 'yellowgreen',
    margin: countcoordinatesX(13),
    borderRadius: countcoordinatesX(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    fontSize: Constants.kFontNormal(16),
    fontWeight: '400',
    color: Color.kWhiteColor,
  },
};

const GoodFooter = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.iconTouch}
        activeOpacity={0.9}
        onPress={() => {}}>
        <View style={styles.smallIcon}>
          <Image
            style={styles.icon}
            resizeMode={'contain'}
            source={require('~assets/img/good/客服2.png')}
          />
          <Text style={styles.name}>客服</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.iconTouch}
        activeOpacity={0.9}
        onPress={() => {}}>
        <View style={styles.smallIcon}>
          <Image
            style={styles.icon}
            resizeMode={'contain'}
            source={require('~assets/img/good/product_collection_no.png')}
          />
          <Text style={styles.name}>收藏</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonTouch} activeOpacity={0.9}>
        <LinearGradient
          style={styles.buttonShadow}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f3572d', Color.kMainColor, '#f32d2d']}>
          <Text style={styles.button}>立即购买</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default GoodFooter;
