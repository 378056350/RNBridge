import React, {useEffect, useState} from 'react';
import {Animated, View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {useMappedState, useDispatch} from 'redux-react-hook';

const styles = {
  container: {
    position: "absolute",
    right: 0,
    bottom: countcoordinatesX(30)
  },
  touch: {
    padding: countcoordinatesX(15),
  },
  image: {
    width: countcoordinatesX(90),
    height: countcoordinatesX(90),
  }
};

interface HomeTopIProps {
  onPress: () => {};
}

type IProps = HomeTopIProps & ViewProps;

const HomeTop = (props: HomeHotIProps) => {
  return (
    <Animated.View style={[styles.container, props.style]}>
      <TouchableOpacity activeOpacity={1} style={styles.touch} onPress={props.onPress}>
        <Image style={styles.image} resizeMode={"contain"} source={require("~assets/img/home/home_top_icon.png")}/>
      </TouchableOpacity>
    </Animated.View>
  );
};

HomeTop.defaultProps = {
  onPress: () => {},
};

export default HomeTop;
