import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {useMappedState, useDispatch} from 'redux-react-hook';
import FastImage from '~components/fastimage/smartImage';

const width = (Constants.kScreenWidth - countcoordinatesX(15) * 3) / 2;
const styles = {
  container: {
    width: Constants.kScreenWidth,
  },
  item: {
    marginLeft: countcoordinatesX(15),
    marginBottom: countcoordinatesX(15),
    width: width,
    padding: countcoordinatesX(15),
    paddingBottom: countcoordinatesX(20),
    backgroundColor: 'white',
  },
  icon: {
    height: width,
  },
  name: {
    fontSize: Constants.kFontNormal(16),
    color: Color.kMainTextColor,
    marginTop: countcoordinatesX(10),
  },
  priceContent: {
    flexDirection: 'row',
  },
  price: {
    color: 'red',
  },
  oldPrice: {
    marginLeft: countcoordinatesX(10),
  },
};

const DATA = [
  {title: 'Title Text'},
  {title: 'Title Text'},
  {title: 'Title Text'},
  {title: 'Title Text'},
  {title: 'Title Text'},
  {title: 'Title Text'},
];

interface HomeGoodIProps {
  onPress: (index: number) => {};
}

type IProps = HomeGoodIProps & ViewProps;

const HomeGood = (props: IProps) => {
  const Item = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => props.onPress(index)}
        activeOpacity={0.9}
        style={styles.item}>
        <View style={{backgroundColor: 'white'}}>
          <FastImage
            renderPlaceholder={() => (
              <Image
                style={styles.icon}
                source={require('~assets/img/recommon_product.png')}
              />
            )}
            renderErrorImage={() => (
              <Image
                style={styles.icon}
                source={require('~assets/img/recommon_product.png')}
              />
            )}
            style={styles.icon}
            imageStyle={styles.icon}
            source={{
              uri: item.icon,
            }}
          />
          <Text style={styles.name}>{item.title}</Text>
          <View style={styles.priceContent}>
            <Text style={styles.price}>123</Text>
            <Text style={styles.oldPrice}>123</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        numColumns={2}
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index, separators}) =>
          Item({item: item, index: index})
        }
      />
    </View>
  );
};

HomeGood.defaultProps = {
  onPress: () => {},
};

export default HomeGood;
