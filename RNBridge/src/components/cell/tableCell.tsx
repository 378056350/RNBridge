import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ViewProps} from 'react-native';
import {Constants, countcoordinatesX, countcoordinatesY} from '~common/screen';
import {BoxShadow} from 'react-native-shadow';
import {Color} from '~common/colors';


const styles = {
  container: {
    backgroundColor: 'white',
    width: Constants.kScreenWidth,
    height: countcoordinatesX(100),
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: countcoordinatesX(20),
    paddingRight: countcoordinatesX(20),
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justfiyContent: 'center',
  },
  contentRight: {
    flexDirection: 'row',
    alignItems: 'center',
    justfiyContent: 'center',
  },
  icon: {
    width: countcoordinatesX(60),
    height: countcoordinatesX(60),
    backgroundColor: 'red',
    marginRight: countcoordinatesX(20),
  },
  name: {
    fontSize: Constants.kFontNormal(13),
    fontWeight: '300',
    color: Color.kMainTextColor,
  },
  detail: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: '300',
    color: Color.kSecondaryTextColor,
  },
  next: {
    width: countcoordinatesX(30),
    height: countcoordinatesX(30),
    marginLeft: countcoordinatesX(15)
  },
  line: {
    height: countcoordinatesX(1),
    backgroundColor: Color.kLineColor,
    position: "absolute",
    bottom: 0,
    left: 0
  }
};

interface TableCellIProps {
  // 图标
  icon: any;
  // 标题
  name: string;
  // 详情
  detail: string;
  // 下一步按钮
  next: any;
  // 显示图标
  showIcon: boolean;
  // 显示下一步
  showNext: boolean;
  // 显示线条
  showLine: boolean;
  // 点击
  onPress: () => {};
}

type IProps = TableCellIProps & ViewProps;

const TableCell = (props: IProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        props.style,
        {
          width: props.style.width,
          height: props.style.height,
        },
      ]}
      activeOpacity={0.9}
      onPress={props.onPress}>
      <View style={styles.content}>
        <View style={styles.contentLeft}>
          {props.showIcon && <Image style={styles.icon} />}
          <Text style={styles.name}>{props.name}</Text>
        </View>
        <View style={styles.contentRight}>
          <Text style={styles.detail}>{props.detail}</Text>
          {props.showNext && <Image style={styles.next} source={props.next}/>}
        </View>
        <View style={[styles.line, {width: props.style.width}]}/>
      </View>
    </TouchableOpacity>
  );
};

TableCell.defaultProps = {
  name: "",
  detail: "",
  showIcon: true,
  showNext: true,
  showLine: true,
  onPress: ()=>{},
};

export default TableCell;
