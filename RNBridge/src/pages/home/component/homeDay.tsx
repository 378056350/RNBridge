import React, {useEffect, useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {useMappedState, useDispatch} from 'redux-react-hook';
import FastImage from '~components/fastimage/smartImage';

const width = (Constants.kScreenWidth - countcoordinatesX(15) * 3) / 2;
const height = (width / 5) * 3;
const styles = {
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginRight: countcoordinatesX(15),
  },
  item: {
    borderRadius: countcoordinatesX(5),
    marginLeft: countcoordinatesX(15),
    marginBottom: countcoordinatesX(15),
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20),
    overflow: "hidden"
  },
  image: {
    width: width,
    height: height,
  }
};

interface HomeDayIProps {
  onPress: (index: number) => {};
}

type IProps = HomeDayIProps & ViewProps;

const Item = ({props, index, item}) => {
  return (
    <TouchableOpacity key={index} activeOpacity={1} onPress={() => props.onPress(index)}>
      <FastImage
          renderPlaceholder={() => (
            <Image resizeMode={"cover"} style={styles.image} source={require('~assets/img/onePaiThreeImage.png')} />
          )}
          renderErrorImage={() => (
            <Image resizeMode={"cover"} style={styles.image} source={require('~assets/img/onePaiThreeImage.png')} />
          )}
          style={[styles.item, styles.image]}
          imageStyle={[styles.item, styles.image]}
          source={{
            uri: item.icon
          }}
        />
    </TouchableOpacity>
  );
};

const HomeDay = (props: HomeDayIProps) => {
  const item = () => {
    const array = [];
    for (let i = 0; i < 4; i++) {
      array.push(Item({props: props, index: i, item: props.item[i]}));
    }
    return array;
  };

  return <View style={styles.container}>{item()}</View>;
};

HomeDay.defaultProps = {
  onPress: () => {},
};

export default HomeDay;
