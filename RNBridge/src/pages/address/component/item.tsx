import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ViewProps } from 'react-native';
import { Color } from '~common/colors';
import { Constants, countcoordinatesX } from '~common/screen';

interface AddressIProps {
  onPress: ()=>{}
}

type IProps = AddressIProps & ViewProps;

const styles = {
  item: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingLeft: countcoordinatesX(30),
    justifyContent: "center",
    borderBottomColor: Color.kLineColor,
    borderBottomWidth: countcoordinatesX(1)
  },
  left: {
    flex: 1,
    marginRight: countcoordinatesX(20),
    paddingTop: countcoordinatesX(25),
    paddingBottom: countcoordinatesX(25),
  },
  leftTop: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  leftTopName: {
    fontSize: Constants.kFontNormal(16),
    fontWeight: "300",
    color: Color.kMainTextColor,
  },
  leftTopPhone: {
    marginLeft: countcoordinatesX(20),
    fontSize: Constants.kFontNormal(12),
    fontWeight: "300",
    color: Color.kSecondaryTextColor,
  },
  leftBottom: {
    marginTop: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(12),
    fontWeight: "300",
    color: Color.kMainTextColor,
    lineHeight: 15
  },
  right: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: countcoordinatesX(30),
    paddingRight: countcoordinatesX(30),
  },
  rightName: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "300",
    color: Color.kSecondaryTextColor
  },
  line: {
    width: countcoordinatesX(2),
    height: countcoordinatesX(60),
    backgroundColor: Color.kLineColor,
    alignSelf: "center"
  }
};

const Address = (props: IProps) => {

  const left = () => {
    return (
      <View style={styles.left}>
        <View style={styles.leftTop}>
          <Text style={styles.leftTopName}>{props.data.item.user}</Text>
          <Text style={styles.leftTopPhone}>{props.data.item.phone}</Text>
        </View>
        <Text style={styles.leftBottom}>{props.data.item.province} {props.data.item.city} {props.data.item.area} {props.data.item.detail}</Text>
      </View>
    )
  }

  const line = () => {
    return (
      <View style={styles.line} />
    )
  }

  const right = () => {
    return (
      <View style={styles.right}>
        <Text style={styles.rightName}>编辑</Text>
      </View>
    )
  }

  return (
    <TouchableOpacity activeOpacity={1} onPress={()=>props.onPress(props.data.item)}>
      <View style={styles.item}>
        {left()}
        {line()}
        {right()}
      </View>
    </TouchableOpacity>
  );
};

Address.defaultProps = {
  onPress: ()=>{}
};

export default Address;
