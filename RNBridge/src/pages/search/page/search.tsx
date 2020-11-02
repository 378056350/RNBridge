import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, SectionList, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager} from '~common/native';
import SearchNavigation from '~pages/search/component/searchNavigation';
import SearchItem from '~pages/search/component/searchItem';


const styles = {
  container: {
    flex: 1,
  },
  list: {
    
  },
  sectionHeader: {
    width: Constants.kScreenWidth,
    backgroundColor: Color.kDefaultBackGroundColor,
    height: countcoordinatesX(80),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "space-between",
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
  },
  sectionName: {
    fontSize: Constants.kFontNormal(13),
    fontWeight: '400',
    color: Color.kMainTextColor,
  },
  iconTouch: {
    padding: countcoordinatesX(10),
    backgroundColor: "orange"
  },
  icon: {
    width: countcoordinatesX(45),
    height: countcoordinatesX(45),
    backgroundColor: "red"
  }
};

const DATA = [
  {
    title: '搜索发现',
    data: ['Pizza'],
  },
  {
    title: '历史搜索',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
];

const Item = ({title}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Search = () => {
  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  const renderSectionHeader = ({section: {title}, hasTrash}) => {
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionName}>123123</Text>
        <TouchableOpacity style={styles.iconTouch}>
          <Image style={styles.icon}/>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = ({item})=>{
    return (
      <SearchItem/>
    )
  }

  return (
    <View style={styles.container}>
      <SearchNavigation />
      <SectionList
        style={styles.list}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default Search;
