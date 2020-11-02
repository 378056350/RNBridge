import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';

interface GoodHeaderIProps {
  // 点击左侧
  onLeftPress: () => {}
  // 点击右侧
  onRightPress: () => {}
  // 点击标题
  onTitlePress: (index: number)=>{}
}

type IProps = GoodHeaderIProps & ViewProps;

const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: Constants.kNavigationHeight,
    paddingTop: Constants.kStatusBarHeight,
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    left: countcoordinatesX(15),
    top: Constants.kStatusBarHeight,
    right: countcoordinatesX(15),
    bottom: 0,
  },
  buttonContent: {
    padding: countcoordinatesX(10),
  },
  centerContent: {
    flexDirection: 'row',
    flex: 1,
  },
  icon: {
    width: countcoordinatesX(60),
    height: countcoordinatesX(60),
  },
  nameTouch: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: countcoordinatesX(10),
    paddingRight: countcoordinatesX(10),
    borderBottomWidth: countcoordinatesX(10),
    borderBottomColor: 'red',
  },
  name: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "400",
    color: Color.kMainTextColor,
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "white"
  }
};

const GoodHeader = (props: GoodHeaderIProps) => {
  const [selectIndex, setSelectIndex] = useState(0);

  const onTitlePress = (index)=>{
    setSelectIndex(index)
  }

  const name = ({isSelect, index, name}) => {
    return (
      <TouchableOpacity 
        style={[styles.nameTouch, {borderBottomWidth: isSelect}]} 
        activeOpacity={1}
        onPress={()=>onTitlePress(index)}
      >
        <Text style={[styles.name, {
          color: isSelect ? Color.kMainColor: Color.kMainTextColor,
        }]}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, {opacity: props.style.opacity}]}/>
      <Animated.View style={[styles.content]}>
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={props.onLeftPress}>
          <Image
            style={styles.icon}
            source={require('~assets/img/good/product_back_black.png')}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonContent}
          onPress={props.onRightPress}>
          <Image
            style={styles.icon} 
            source={require('~assets/img/good/product_share_black.png')}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={[
          styles.content,
          {opacity: props.style.opacity},
        ]}>
        <TouchableOpacity
          style={[styles.buttonContent]}
          onPress={props.onLeftPress}>
          <Image
            style={styles.icon}
            source={require('~assets/img/good/product_back_black.png')}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttonContent]}
          onPress={props.onRightPress}>
          <Image
            style={styles.icon} 
            source={require('~assets/img/good/product_share_black.png')}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={[styles.centerContent, {opacity: props.style.opacity}]}>
        {name({isSelect: selectIndex == 0, index: 0, name: "商品"})}
        <View style={{width: countcoordinatesX(60)}}/>
        {name({isSelect: selectIndex == 1, index: 1, name: "详情"})}
      </Animated.View>
    </View>
  );
};

GoodHeader.defaultProps = {
  onLeftPress: () => {},
  onRightPress: () => {},
};

export default GoodHeader;
