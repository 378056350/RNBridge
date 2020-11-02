import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {useMappedState, useDispatch} from 'redux-react-hook';
import FastImage from '~components/fastimage/smartImage';

const width = Constants.kScreenWidth - countcoordinatesX(15) * 2;
const height = (width / 5) * 3;
const itemWidth = width / 3.5;
const styles = {
  container: {
    marginLeft: countcoordinatesX(15),
    marginRight: countcoordinatesX(15),
    marginBottom: countcoordinatesX(25),
    borderRadius: countcoordinatesX(10),
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  headerImage: {
    width: width,
    height: (width / 750) * 235,
  },
  item: {
    width: itemWidth,
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(30),
    backgroundColor: 'white',
    alignItems: 'center',
  },
  icon: {
    width: (itemWidth / 4) * 3,
    height: (itemWidth / 4) * 3,
  },
  title: {
    color: Color.kMainTextColor,
    fontSize: Constants.kFontNormal(11),
    marginTop: countcoordinatesX(10),
    fontWeight: '400',
    alignSelf: 'flex-start',
    paddingLeft: countcoordinatesX(10),
  },
  priceContent: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-start',
    paddingLeft: countcoordinatesX(10),
    marginTop: countcoordinatesX(10),
  },
  price: {
    color: Color.kRedColor,
    fontSize: Constants.kFontNormal(13),
  },
  oldPrice: {
    color: Color.kSecondaryTextColor,
    marginLeft: countcoordinatesX(10),
    fontSize: Constants.kFontNormal(10),
    fontWeight: '300',
    textDecorationLine: 'line-through',
  },
};

interface HomeHotIProps {
  onPress: (index: number) => {};
  onImagePress: () => {};
}

type IProps = HomeHotIProps & ViewProps;

const HomeHot = (props: HomeHotIProps) => {
  const Item = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => props.onPress(index)}
        style={{marginRight: index != 5 ? countcoordinatesX(20) : 0}}>
        <View style={styles.item}>
          <FastImage
            renderPlaceholder={() => (
              <Image
                style={styles.icon}
                resizeMode={'center'}
                source={require('~assets/img/leftOneRightTwoImage1.png')}
              />
            )}
            renderErrorImage={() => (
              <Image
                style={styles.icon}
                resizeMode={'center'}
                source={require('~assets/img/leftOneRightTwoImage1.png')}
              />
            )}
            style={styles.icon}
            imageStyle={styles.icon}
            source={{
              uri: item.icon,
            }}
          />
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.priceContent}>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.oldPrice}>{item.oldPrice}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={1} onPress={props.onImagePress}>
        <FastImage
          renderPlaceholder={() => (
            <Image
              style={styles.headerImage}
              resizeMode={'center'}
              source={require('~assets/img/bigsale_banner.png')}
            />
          )}
          renderErrorImage={() => (
            <Image
              style={styles.headerImage}
              resizeMode={'center'}
              source={require('~assets/img/bigsale_banner.png')}
            />
          )}
          style={styles.headerImage}
          imageStyle={styles.headerImage}
          source={{
            uri: props.item.icon
          }}
        />
      </TouchableOpacity>
      <FlatList
        data={props.item.data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item, index, separators}) =>
          Item({item: item, index: index})
        }
      />
    </View>
  );
};

HomeHot.defaultProps = {
  onPress: () => {},
  onImagePress: () => {},
};

export default HomeHot;
