import React, {useState, useMemo, memo} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ViewProps,
  StyleSheet,
} from 'react-native';
import {Constants, countcoordinatesX} from '~common/screen';
import PropTypes from 'prop-types';

interface HiddenItemIProps {
  leftNames: string[];
  leftColors: string[];
  rightNames: string[];
  rightColors: string[];
  onPress: ()=>{}
}

type IProps = HiddenItemIProps & ViewProps;

const HiddenItem = (props: IProps) => {
  const buttons = (names, colors) => {
    const array = [];
    for (let i = 0; i < names.length; i++) {
      array.push(
        <TouchableOpacity style={{backgroundColor: colors[i]}} activeOpacity={0.9} onPress={props.onPress}>
          <View style={[styles.button]}>
            <Text style={styles.name}>{names[i]}</Text>
          </View>
        </TouchableOpacity>,
      );
    }
    return <View style={styles.buttonContainer}>{array}</View>;
  };

  return (
    <View style={[styles.container, props.style]}>
      {buttons(props.leftNames, props.leftColors)}
      {buttons(props.rightNames, props.rightColors)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    width: countcoordinatesX(140),
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontSize: Constants.kFontNormal(14),
    fontWeight: "400",
    color: "white"
  },
});

HiddenItem.defaultProps = {
  leftNames: [],
  leftColors: [],
  rightNames: [],
  rightColors: [],
  onPress: ()=>{}
};

export default HiddenItem;
