import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  Easing,
  Animated,
  SectionList,
  ViewProps,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import {Constants, countcoordinatesX} from '~common/screen';
import {Color} from '~common/colors';
import {NativeManager} from '~common/native';
import {PinyinUtil} from '~common/util'


interface AddressProvinceIProps {
  section: any[]
  onProvincePress: (index: number, item: string)=>{}
}

type IProps = AddressProvinceIProps & ViewProps;

const styles = {
  list: {
    flex: 1,
    width: Constants.kScreenWidth,
    backgroundColor: 'white'
  },
  listHeader: {
    paddingLeft: countcoordinatesX(20),
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: Color.kSecondaryTextColor,
    backgroundColor: Color.kDefaultBackGroundColor
  },
  listFooter: {
    height: Constants.kSafeAreaBottomHeight
  },
  listSectionHeader: {
    paddingLeft: countcoordinatesX(20),
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '300',
    color: Color.kSecondaryTextColor,
    backgroundColor: Color.kDefaultBackGroundColor
  },
  item: {
    paddingLeft: countcoordinatesX(20),
    paddingTop: countcoordinatesX(25),
    paddingBottom: countcoordinatesX(25),
    fontSize: Constants.kFontNormal(12),
    fontWeight: '400',
    color: Color.kMainTextColor,
  }
};

const AddressProvince = (props: IProps) => {

  // 点击Item
  const onItemPress = (index, item)=>{
    props.onProvincePress(index, item)
  }


  const ListHeaderComponent = ()=>(
    <Text style={styles.listHeader}>选择省份/地区</Text>
  )

  const ListFooterComponent = ()=>(
    <View style={styles.listFooter}/>
  )

  const renderSectionHeader = ({section: {number}})=>(
    <Text style={styles.listSectionHeader}>{number}</Text>
  )

  const renderItem = ({index, item}) => (
    <TouchableHighlight underlayColor={Color.kDefaultBackGroundColor} onPress={()=>props.onProvincePress(index, item)}>
      <Text style={styles.item}>{item}</Text>
    </TouchableHighlight>
  );

  return (
    <SectionList
      style={styles.list}
      sections={props.section}
      keyExtractor={(item, index) => index.toString()}
      stickySectionHeadersEnabled={false}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      showsVerticalScrollIndicator={false}
    />
  )

}

AddressProvince.defaultProps = {
  section: [],
  onProvincePress: ()=>{}
};

export default AddressProvince;
