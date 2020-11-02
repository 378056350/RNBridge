import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ViewProps
} from 'react-native';
import { Constants, countcoordinatesX, countcoordinatesY } from '~common/screen'
import { Color } from '~common/colors'

export enum PlaceHolderModes {
  // 未知
  None,
  // 网络失效
  Network = 1 << 1,
  // 等待
  Loading = 1 << 2,
  // 数据为空
  Empty = 1 << 3,
  // 无优惠券
  CouponEmpty = 1 << 4
}

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center"
  },
  netIcon: {
    width: Constants.kScreenWidth / 2,
    height: Constants.kScreenWidth / 2 / 28 * 16
  },
  netName: {
    fontSize: Constants.kFontNormal(11),
    fontWeight: "300",
    color: Color.kSecondaryTextColor,
  },
  netButtonTouch: {
    marginTop: countcoordinatesX(40),
    backgroundColor: Color.kMainColor,
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20),
    paddingLeft: countcoordinatesX(45),
    paddingRight: countcoordinatesX(45),
    borderRadius: countcoordinatesX(5)
  },
  netButton: {
    fontSize: Constants.kFontNormal(12),
    fontWeight: "400",
    color: Color.kWhiteColor,
  },
  loadIcon: {
    width: countcoordinatesX(100),
    height: countcoordinatesX(100),
  },
  loadName: {
    marginTop: countcoordinatesX(20),
    fontSize: Constants.kFontNormal(11),
    fontWeight: "300",
    color: Color.kSecondaryTextColor,
  }
}

interface PlaceHolderIProps {
  onButtonPress: ()=>{}
  mode: PlaceHolderModes
}

type IProps = PlaceHolderIProps & ViewProps

const PlaceHolder = (props: IProps) => {

  const network = ()=>{
    return (
      <>
        <Image style={styles.netIcon} resizeMode={"contain"} source={require("~assets/img/搜索无网络.png")}/>
        <Text style={styles.netName}>网络加载失败, 请检查您的网络</Text>
        <TouchableOpacity onPress={props.onButtonPress} style={styles.netButtonTouch} activeOpacity={0.9}>
          <Text style={styles.netButton}>重新加载</Text>
        </TouchableOpacity>
      </>
    )
  }

  const wait = ()=>{
    return (
      <>
        <ActivityIndicator size="large" style={styles.loadIcon} color={Color.kMainTextColor} />
        <Text style={styles.loadName}>正在加载</Text>
      </>
    )
  }

  const empty = ()=>{
    let source;
    if (props.mode == PlaceHolderModes.Empty) {
      source = require("~assets/img/address/invoice_no_logistics.png")
    } else {
      source = require("~assets/img/coupon/无优惠券.png")
    }
    return (
      <>
        <Image style={styles.netIcon} resizeMode={"contain"} source={source}/>
        <Text style={styles.netName}>暂无数据</Text>
      </>
    )
    // 
  }


  if (props.mode == PlaceHolderModes.None) {
    return (
      <></>
    )
  }
  else {
    return (
      <View style={[props.style, styles.container, {
        paddingBottom: Constants.kSafeAreaBottomHeight + (props.style != undefined && props.style.height != undefined) ? props.style.height / 2 : 0
      }]}>
        {props.mode == PlaceHolderModes.Network && network()}
        {props.mode == PlaceHolderModes.Loading && wait()}
        {props.mode == PlaceHolderModes.Empty && empty()}
        {props.mode == PlaceHolderModes.CouponEmpty && empty()}
      </View>
    )
  }
  

}

PlaceHolder.defaultProps = {
  onButtonPress: ()=>{},
  mode: PlaceHolderModes.Loading
};

export default PlaceHolder;