import React, {useEffect, useState} from 'react';
import {
  Animated,
  View,
  Text,
  TextInput,
  Image,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {BoxShadow} from 'react-native-shadow';
import LinearGradient from 'react-native-linear-gradient';

interface HomeHeaderIProps {
  // 点击登录
  onLoginPress: () => {};
  // 点击分类
  onSortPress: () => {};
  // 点击搜索
  onSearchPress: () => {};
}

type IProps = HomeHeaderIProps & ViewProps;

const styles = {
  container: {
    width: Constants.kScreenWidth,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  shadow: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  statusContent: {
    backgroundColor: "red",
    width: Constants.kScreenWidth,
    height: Constants.kStatusBarHeight,
    position: "absolute",
    left: 0,
    top: 0,
  },

  content: {
    overflow: 'hidden',
    flex: 1,
  },
  moveContent: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: countcoordinatesX(10) + Constants.kStatusBarHeight,
    height: countcoordinatesX(70),
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
  },
  titleContainerLeft: {
    flexDirection: 'row',
    alignItems: "center"
  },
  title: {
    color: 'white',
    fontSize: Constants.kFontNormal(18),
    fontWeight: '600',
  },
  subTitle: {
    marginLeft: countcoordinatesX(20),
    color: 'white',
    fontSize: Constants.kFontNormal(12),
    fontWeight: '600',
  },
  loginTouch: {},
  login: {
    height: countcoordinatesX(55),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: countcoordinatesX(30),
    paddingRight: countcoordinatesX(30),
    borderRadius: countcoordinatesX(27.5),
  },
  loginName: {
    fontSize: Constants.kFontNormal(10),
    fontWeight: '300',
  },

  searchContainer: {
    flexDirection: 'row',
    paddingTop: countcoordinatesX(10),
    paddingBottom: countcoordinatesX(10),
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
  },
  inputTouch: {
    flex: 1,
    height: countcoordinatesX(60),
    backgroundColor: 'white',
    borderRadius: countcoordinatesX(5),
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    width: countcoordinatesX(27),
    height: countcoordinatesX(27),
    marginLeft: countcoordinatesX(20),
  },
  inputName: {
    marginLeft: countcoordinatesX(15),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: Color.kSecondaryTextColor,
  },

  searchTouch: {
    borderRadius: countcoordinatesX(5),
    width: countcoordinatesX(140),
    height: countcoordinatesX(60),
    marginLeft: countcoordinatesX(15),
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: 'white',
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: countcoordinatesX(5),
    height: countcoordinatesX(60),
  },
  searchName: {
    fontSize: Constants.kFontNormal(11),
    fontWeight: '300',
  },
  searchIcon: {
    width: countcoordinatesX(25),
    height: countcoordinatesX(25),
    marginLeft: countcoordinatesX(10),
  },
};

const HomeHeader = (props: IProps) => {
  // 阴影
  const shadowOpt = {
    width: countcoordinatesX(160),
    height: countcoordinatesX(60),
    color: Color.kShadowColor,
    border: 3,
    radius: countcoordinatesX(5),
    opacity: 0.1,
    x: 0,
    y: 0,
  };

  const shadow = () => {
    return (
      <Animated.View
        style={[styles.statusContent, {opacity: props.style.opacity}]}>
        <LinearGradient
          style={{flex: 1}}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#f3572d', Color.kMainColor, '#f32d2d']}></LinearGradient>
      </Animated.View>
    );
  };

  const title = () => {
    return (
      <View>
        <Animated.View
          style={{
            flex: 1,
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            opacity: props.style.opacity,
            transform: props.style.transform,
          }}>
          <LinearGradient
            style={{
              flex: 1,
            }}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#f3572d', Color.kMainColor, '#f32d2d']}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.titleContainer,
            {
              transform: props.style.transform,
            },
          ]}>
          <View style={styles.titleContainerLeft}>
            <Text style={styles.title}>天颐商城</Text>
            <Text style={styles.subTitle}>*******生活更美好</Text>
          </View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.loginTouch}
            onPress={props.onLoginPress}>
            <View style={styles.login}>
              <Text style={styles.loginName}>登录/注册</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  const input = () => {
    return (
      <View>
        <Animated.View style={[styles.searchContainer, {
          transform: props.style.transform
        }]}>
          <Animated.View style={{
            opacity: props.style.opacity,
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
          }}>
            <LinearGradient
              style={{
                flex: 1
              }}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#f3572d', Color.kMainColor, '#f32d2d']}
            />
          </Animated.View>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.inputTouch}
            onPress={props.onSearchPress}>
            <View style={styles.input}>
              <Image style={styles.inputIcon} source={require("~assets/img/home/home_search.png")}/>
              <Text style={styles.inputName}>iPhone12低于官网价格200</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.searchTouch}
            onPress={props.onSortPress}>
            <View style={styles.search}>
              <Text style={styles.searchName}>分类</Text>
              <Image 
                style={styles.searchIcon} 
                resizeMode={"contain"}
                source={require("~assets/img/home/home_category.png")}
              />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {title()}
      {input()}
      {shadow()}
    </View>
  );
};

HomeHeader.defaultProps = {
  onLoginPress: () => {},
  onSortPress: () => {},
  onSearchPress: () => {},
};

export default HomeHeader;
