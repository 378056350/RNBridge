import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  ViewProps,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {Constants, countcoordinatesX} from '~common/screen';
import {Color} from '~common/colors';
import {NativeManager} from '~common/native';
import {PinyinUtil} from '~common/util';
import AddressTree from './addressTree';
import AddressProvince from './addressProvince';
import AddressCity from './addressCity';
import AddressArea from './addressArea';

interface AddressHUDIProps {
  province: string;
  city: string;
  area: string;
  onShadowPress: () => {};
  onProvincePress: () => {};
  onCityPress: () => {};
  onAreaPress: () => {};
  onTreePress: (index: number) => {};
}

type IProps = AddressHUDIProps & ViewProps;

const styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  content: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: Constants.kScreenWidth,
    height: (Constants.kScreenHeight / 4) * 3,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: countcoordinatesX(5),
    paddingBottom: countcoordinatesX(5),
    paddingLeft: countcoordinatesX(10),
    paddingRight: countcoordinatesX(10),
  },
  title: {
    fontSize: Constants.kFontNormal(13),
    fontWeight: '400',
    color: Color.kMainTextColor,
  },
  closeTouch: {
    padding: countcoordinatesX(20),
  },
  close: {
    width: countcoordinatesX(35),
    height: countcoordinatesX(35),
    opacity: 0.5,
  },
};

const AddressHUD = React.forwardRef((props: IProps, ref) => {
  // 是否显示
  const [show, setShow] = useState(false);
  // 数据
  const [data, setData] = useState([]);
  // 省数据
  const [provinceSection, setProvinceSection] = useState([]);
  // 市数据
  const [citySection, setCitySection] = useState([]);
  // 区数据
  const [areaSection, setAreaSection] = useState([]);
  // 透明度动画
  const [opacityAnim, setOpacityAnim] = useState(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    show: () => {
      setShow(true);
      Animated.timing(opacityAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true,
      }).start();
    },
    hide: () => {
      Animated.timing(opacityAnim, {
        toValue: 0,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true,
      }).start(() => {
        setShow(false);
      });
    },
  }));

  useEffect(() => {
    loadProvince()
  }, []);

  useEffect(() => {
    if (provinceSection.length != 0 && props.province != undefined) {
      loadCity(props.province);
    }
  }, [provinceSection]);

  useEffect(() => {
    if (citySection.length != 0 && props.city != undefined) {
      loadArea(props.city);
    }
  }, [citySection]);

  // 点击关闭
  const onClosePress = () => {
    ref.current.hide();
  };

  // 点击省
  const onProvincePress = (index, item) => {
    loadCity(item)
    // 回调
    props.onProvincePress(item);
  };

  // 点击市
  const onCityPress = (index, item) => {
    loadArea(item)
    // 回调
    props.onCityPress(item);
  };

  // 点击县
  const onAreaPress = (index, item) => {
    props.onAreaPress(item);
  };

  // 读取省
  const loadProvince = () => {
    // 获取city.plist
    NativeManager.loadPlist('city').then((value) => {
      setData(value);
      const section = {};
      for (let i = 0; i < value.length; i++) {
        const pinyin = PinyinUtil.ConvertPinyinFirst(
          value[i].cityName,
        ).substring(0, 1);
        const subSection = section[pinyin] != undefined ? section[pinyin] : [];
        subSection.push(value[i].cityName);
        section[pinyin] = subSection;
      }

      let sectionArray = [];
      for (let i = 0; i < Object.keys(section).length; i++) {
        sectionArray.push({
          number: Object.keys(section)[i],
          data: section[Object.keys(section)[i]],
        });
      }
      sectionArray = sectionArray.sort(function (a, b) {
        return a.number.localeCompare(b.number);
      });
      setProvinceSection(sectionArray);
    });
  };

  // 读取城市
  const loadCity = (item) => {
    const section = {};
    for (let i = 0; i < data.length; i++) {
      const cityName = data[i].cityName;
      if (cityName === item) {
        const cityArr = data[i].cityArr;
        for (let i = 0; i < cityArr.length; i++) {
          const name = cityArr[i].areaName;
          const pinyin = PinyinUtil.ConvertPinyinFirst(
            cityArr[i].areaName,
          ).substring(0, 1);
          const subSection =
            section[pinyin] != undefined ? section[pinyin] : [];
          subSection.push(name);
          section[pinyin] = subSection;
        }
      }
    }
    let sectionArray = [];
    for (let i = 0; i < Object.keys(section).length; i++) {
      sectionArray.push({
        number: Object.keys(section)[i],
        data: section[Object.keys(section)[i]],
      });
    }
    sectionArray = sectionArray.sort(function (a, b) {
      return a.number.localeCompare(b.number);
    });
    setCitySection(sectionArray);
  };

  // 读取区
  const loadArea = (item) => {
    const section = {};
    for (let i = 0; i < data.length; i++) {
      const cityName = data[i].cityName;
      if (cityName === props.province) {
        const cityArr = data[i].cityArr;
        for (let i = 0; i < cityArr.length; i++) {
          const name = cityArr[i].areaName;
          if (name === item) {
            console.log(cityArr[0].areaArr);
            for (let i = 0; i < cityArr[0].areaArr.length; i++) {
              const name = cityArr[0].areaArr[i].towmName;
              const pinyin = PinyinUtil.ConvertPinyinFirst(name).substring(
                0,
                1,
              );
              const subSection =
                section[pinyin] != undefined ? section[pinyin] : [];
              subSection.push(name);
              section[pinyin] = subSection;
            }
          }
        }
      }
    }

    let sectionArray = [];
    for (let i = 0; i < Object.keys(section).length; i++) {
      sectionArray.push({
        number: Object.keys(section)[i],
        data: section[Object.keys(section)[i]],
      });
    }
    sectionArray = sectionArray.sort(function (a, b) {
      return a.number.localeCompare(b.number);
    });
    setAreaSection(sectionArray);
  };

  const header = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeTouch} activeOpacity={0.9}>
        <Image style={[styles.close, {opacity: 0}]} />
      </TouchableOpacity>
      <Text style={styles.title}>请选择所在地区</Text>
      <TouchableOpacity
        style={styles.closeTouch}
        onPress={onClosePress}
        activeOpacity={0.9}>
        <Image
          style={styles.close}
          resizeMode={'contain'}
          source={require('~assets/img/nav_close.png')}
        />
      </TouchableOpacity>
    </View>
  );

  if (show) {
    return (
      <Animated.View
        style={[
          styles.container,
          props.style,
          {
            opacity: opacityAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}>
        <TouchableOpacity
          style={{flex: 1}}
          activeOpacity={1}
          onPress={onClosePress}>
          <View />
        </TouchableOpacity>
        <View style={styles.content}>
          {header()}
          {props.province.length != 0 && (
            <AddressTree
              province={props.province}
              city={props.city}
              area={props.area}
              onPress={props.onTreePress}
            />
          )}
          {props.province.length == 0 && (
            <AddressProvince
              section={provinceSection}
              onProvincePress={onProvincePress}
            />
          )}
          {props.province.length != 0 && props.city.length == 0 && (
            <AddressCity section={citySection} onCityPress={onCityPress} />
          )}
          {props.province.length != 0 && props.city.length != 0 && (
            <AddressArea section={areaSection} onAreaPress={onAreaPress} />
          )}
        </View>
      </Animated.View>
    );
  } else {
    return <></>;
  }
});

AddressHUD.defaultProps = {
  province: '',
  city: '',
  area: '',
  onShadowPress: () => {},
  onProvincePress: () => {},
  onCityPress: () => {},
  onAreaPress: () => {},
  onTreePress: () => {},
};

export default AddressHUD;
