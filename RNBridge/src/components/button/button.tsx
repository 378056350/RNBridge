import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ViewProps} from 'react-native';
import {Constants, countcoordinatesX, countcoordinatesY} from '~common/screen';
import {BoxShadow} from 'react-native-shadow';
import {Color} from '~common/colors';
import LinearGradient from 'react-native-linear-gradient';

const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: countcoordinatesX(70),
  },
  name: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "400",
    color: Color.kWhiteColor,
  }
};

interface ButtonIProps {
  name: string
  onPress: ()=>{}
}

type IProps = ButtonIProps & ViewProps;

const Button = (props: IProps) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={props.onPress}>
      <LinearGradient
        style={[props.style, {
          borderRadius: countcoordinatesX(35)
        }]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#f3572d', Color.kMainColor, '#f32d2d']}>
        <View style={styles.container}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

Button.defaultProps = {
  name: "",
  onPress: ()=>{}
};

export default Button;
