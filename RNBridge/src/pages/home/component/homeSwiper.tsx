import React, {useEffect, useState} from 'react';
import {View, Image, Text, TouchableOpacity, ViewProps} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import Swiper from 'react-native-swiper';
import FastImage from '~components/fastimage/smartImage'

interface HomeSwiperIProps {
  onPress: (index: number) => {}
  item: any[]
}

type IProps = HomeSwiperIProps & ViewProps;

const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: (Constants.kScreenWidth / 6) * 5,
  },
  wrapper: {},
  slide1: {
    width: Constants.kScreenWidth,
    height: (Constants.kScreenWidth / 6) * 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationStyle: {
    width: Constants.kScreenWidth,
    bottom: countcoordinatesX(20),
  },
  icon: {
    width: Constants.kScreenWidth,
    height: (Constants.kScreenWidth / 6) * 5,
  },
};

const HomeSwiper = (props: IProps) => {
  const dot = (activity: boolean) => {
    return (
      <View
        style={{
          backgroundColor: activity == true ? 'white' : 'rgba(255,255,255,0.5)',
          width:
            activity == true ? countcoordinatesX(30) : countcoordinatesX(20),
          height: countcoordinatesX(5),
          borderRadius: 4,
          marginLeft: 3,
          marginRight: 3,
          marginTop: 3,
          marginBottom: 3,
        }}
      />
    );
  };

  const swipes = () => {
    const array = [];
    for (let i = 0; i < props.item.length; i++) {
      array.push(
        <TouchableOpacity
          activeOpacity={1}
          key={i}
          onPress={() => {
            props.onPress(i);
          }}>
          <View style={styles.slide1}>
            <FastImage
              renderPlaceholder={()=><Image style={styles.icon} source={require("~assets/img/productDetail.png")}/>}
              renderErrorImage={()=><Image style={styles.icon} source={require("~assets/img/productDetail.png")}/>}
              style={styles.icon}
              imageStyle={styles.icon}
              source={{
                uri: props.item[i].icon
              }}
            />
          </View>
        </TouchableOpacity>,
      );
    }
    return array;
  };

  return (
    <View style={styles.container}>
      <Swiper
        style={styles.wrapper}
        showsButtons={false}
        autoplay={true}
        loop={true}
        dot={dot(false)}
        activeDot={dot(true)}
        paginationStyle={styles.paginationStyle}>
        {swipes()}
      </Swiper>
    </View>
  );
};

HomeSwiper.defaultProps = {
  onPress: () => {},
};

export default HomeSwiper;
