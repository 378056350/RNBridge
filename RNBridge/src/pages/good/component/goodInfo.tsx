import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, ViewProps} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import Swiper from 'react-native-swiper';

interface GoodInfoIProps {}

type IProps = GoodInfoIProps & ViewProps;

const styles = {
  container: {
    width: Constants.kScreenWidth,
    backgroundColor: 'white',
    paddingLeft: countcoordinatesX(15),
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20),
    paddingRight: countcoordinatesX(15)
  },
  price: {
    fontSize: Constants.kFontNormal(18),
    fontWeight: "700",
    color: Color.kRedColor
  },
  name: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "400",
    color: Color.kMainTextColor,
    marginTop: countcoordinatesX(10),
  },
  detail: {
    fontSize: Constants.kFontNormal(11),
    fontWeight: "300",
    color: Color.kSecondaryTextColor,
    marginTop: countcoordinatesX(10)
  }
};

const GoodInfo = (props: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>¥790.00</Text>
      <Text style={styles.name}>Welly Merck 威力墨客孔雀石文丽绿色表盘手表时尚简约石英手表女 小众女表 小绿表 女士腕表</Text>
      <Text style={styles.detail}>Welly Merck 威力墨客孔雀石文丽绿色表盘手表时尚简约石英手表女 小众女表 小绿表 女士腕表</Text>
    </View>
  );
};

GoodInfo.defaultProps = {};

export default GoodInfo;
