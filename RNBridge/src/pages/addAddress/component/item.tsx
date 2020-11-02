import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  TextInput,
  ViewProps,
  ColorPropType,
  TouchableOpacity,
} from 'react-native';
import {Constants, countcoordinatesX} from '~common/screen';
import {Color} from '~common/colors';

interface ItemIProps {
  placeholder: string;
  next: any;
  hasSwitch: boolean;
  keyboardType: string;
  onInputPress: ()=>{};
  onValueChange: ()=>{}
  onChangeText: (value: string)=>{}
  isOn: boolean;
  maxLength: number
  value: string
}

type IProps = ItemIProps & ViewProps;

const styles = {
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: countcoordinatesX(20),
    paddingRight: countcoordinatesX(20),
  },
  nameContent: {
    height: countcoordinatesX(90),
    justifyContent: "center",
    alignSelf: "flex-start"
  },
  name: {
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: Color.kMainTextColor,
  },
  input: {
    flex: 1,
    color: Color.kMainTextColor,
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    marginLeft: countcoordinatesX(30),
  },
  next: {
    width: countcoordinatesX(25),
    height: countcoordinatesX(90),
    marginLeft: countcoordinatesX(20),
  },
  sw: {
    marginLeft: countcoordinatesX(20),
  },
  line: {
    position: 'absolute',
    left: countcoordinatesX(15),
    right: countcoordinatesX(15),
    bottom: 0,
    height: countcoordinatesX(1),
    backgroundColor: Color.kLineColor,
  },
  inputTouch: {
    flex: 1,
    height: countcoordinatesX(90),
    marginLeft: countcoordinatesX(30),
    justifyContent: "center"
  },
  inputName: {
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
  }
};

const Item = (props: IProps) => {

  const name = ()=>{
    return (
      <View style={styles.nameContent}>
        <Text style={styles.name}>{props.item.name}</Text>
      </View>
    )
  }

  const input = () => {
    if (props.item.canEdit == false) {
      return (
        <TouchableOpacity style={styles.inputTouch} activeOpacity={1} onPress={props.onInputPress}>
          <Text style={[styles.inputName, {
            color: props.value.length != 0 ? Color.kMainTextColor : Color.kAuxiliaryFontColor
          }]}>{props.value.length != 0 ? props.value : props.item.placeholder}</Text>
        </TouchableOpacity>
      )
    }

    return (
      <TextInput 
        style={[styles.input, {
          opacity: props.item.hasInput ? 1 : 0,
          height: props.item.multiLine == true ? countcoordinatesX(180) : countcoordinatesX(90),
          lineHeight: props.item.multiLine == true ? 20 : 0,
          paddingTop: props.item.multiLine == true ? countcoordinatesX(20) : 0,
          paddingBottom: props.item.multiLine == true ? countcoordinatesX(20) : 0,
        }]}
        selectionColor={Color.kMainColor}
        editable={props.item.canEdit}
        placeholderTextColor={Color.kAuxiliaryFontColor}
        placeholder={props.item.placeholder}
        keyboardType={props.item.keyboardType}
        multiline={props.item.multiLine}
        maxLength={props.item.maxLength}
        onChangeText={props.onChangeText}
        value={props.value}
      />
    );
  };

  return (
    <View style={[styles.container, {
      height: props.item.multiLine == false ? countcoordinatesX(90) : countcoordinatesX(180)
    }]}>
      {name()}
      {input()}
      {props.item.hasNext && (
        <Image style={styles.next} resizeMode={'contain'} source={props.next} />
      )}
      {props.item.hasSwitch && <Switch style={styles.sw} onValueChange={props.onValueChange} trackColor={{false: Color.kDefaultBackGroundColor, true:Color.kMainColor}} value={props.isOn}/>}
      <View style={styles.line} />
    </View>
  );
};

Item.defaultProps = {
  placeholder: '',
  next: require('~assets/img/next_icon.png'),
  hasSwitch: false,
  keyboardType: "default",
  onInputPress: ()=>{},
  onValueChange: ()=>{},
  onChangeText: ()=>{},
  isOn: false,
  maxLength: 0,
  value: ""
};

export default Item;
