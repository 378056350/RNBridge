import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ViewProps} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import FastImage from '~components/fastimage/smartImage';

interface HomeModuleIProps {
  onPress: (index: number) => {};
}

type IProps = HomeModuleIProps & ViewProps;

const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingTop: countcoordinatesX(10),
    paddingBottom: countcoordinatesX(10),
  },
  item: {
    width: Constants.kScreenWidth / 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: countcoordinatesX(10),
    paddingBottom: countcoordinatesX(10),
  },
  icon: {
    width: Constants.kScreenWidth / 5,
    height: Constants.kScreenWidth / 5 - countcoordinatesX(40),
  },
  name: {
    paddingTop: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(11),
    fontWeight: '300',
    color: Color.kMainTextColor,
  },
};

const Item = ({props, index, item}) => {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={1}
      onPress={() => {
        props.onPress(index);
      }}>
      <View key={index} style={styles.item}>
        <FastImage
          renderPlaceholder={() => (
            <Image source={require('~assets/img/productDetail.png')} />
          )}
          renderErrorImage={() => (
            <Image source={require('~assets/img/productDetail.png')} />
          )}
          style={styles.icon}
          imageStyle={styles.icon}
          source={{
            uri: item.icon,
          }}
        />
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HomeModule = (props: IProps) => {
  const item = () => {
    const array = [];
    for (let i = 0; i < props.item.length; i++) {
      array.push(Item({props: props, index: i, item: props.item[i]}));
    }
    return array;
  };

  return <View style={styles.container}>{item()}</View>;
};

export default HomeModule;
