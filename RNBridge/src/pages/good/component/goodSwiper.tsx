import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ViewProps } from 'react-native';
import { Color } from '~common/colors';
import { Constants, countcoordinatesX } from '~common/screen';
import Swiper from 'react-native-swiper';

interface GoodSwiperIProps {
  onPress: (index: number)=>{}
}

type IProps = GoodSwiperIProps & ViewProps

const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: Constants.kScreenWidth / 6 * 5,
  },
  wrapper: {},
  slide1: {
    width: Constants.kScreenWidth,
    height: Constants.kScreenWidth / 6 * 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  paginationStyle: {
    width: Constants.kScreenWidth,
    bottom: countcoordinatesX(20)
  }
};

const GoodSwiper = (props: IProps) => {

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
  }

  const swipes = () => {
    const array = []
    for (let i = 0; i < 3; i++) {
      array.push(
        <TouchableOpacity key={i} activeOpacity={1} onPress={()=>{props.onPress(i)}}>
          <View style={styles.slide1}>
            <Text>Hello Swiper</Text>
          </View>
        </TouchableOpacity>
      )
    }
    return array
  }

  return (
    <View style={[styles.container]}>
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
  )

}

GoodSwiper.defaultProps = {
  onPress: ()=>{}
};

export default GoodSwiper;
