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

interface AddressTreeIProps {
  province: string;
  city: string;
  area: string;
  onPress: (index: numer) => {}
}

type IProps = AddressTreeIProps & ViewProps;

const styles = {
  container: {
    paddingLeft: countcoordinatesX(20),
    paddingTop: countcoordinatesX(10),
    paddingBottom: countcoordinatesX(10),
    borderBottomColor: Color.kLineColor,
    borderBottomWidth: countcoordinatesX(2)
  },
  item: {
    flexDirection: 'row',
    width: Constants.kScreenWidth,
    paddingTop: countcoordinatesX(13),
    paddingBottom: countcoordinatesX(13),
    alignItems: 'center',
    marginBottom: countcoordinatesX(10)
  },
  icon: {
    width: countcoordinatesX(25),
    height: countcoordinatesX(25),
    marginRight: countcoordinatesX(20),
  },
  name: {
    fontSize: Constants.kFontNormal(12)
  },
};

const AddressTree = (props: IProps) => {

  const section = (name, index) => (
    <TouchableOpacity activeOpacity={0.7} onPress={()=>props.onPress(index)}> 
      <View style={styles.item}>
        <Image style={styles.icon} source={name.length != 0 ? require('~assets/img/进度程度.png') : require('~assets/img/进度默认.png')} />
        <Text style={[styles.name, {
          color: name.length != 0 ? Color.kMainTextColor : Color.kMainColor,
          fontWeight: name.length != 0 ? "300" : "400"
        }]}>{name.length != 0 ? name: "请选择"}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {section(props.province, 0)}
      {section(props.city, 1)}
      {props.city.length != 0 && section(props.area, 2)}
    </View>
  )
};

AddressTree.defaultProps = {
  province: '',
  city: '',
  area: '',
  onPress: ()=>{}
};

export default AddressTree;
