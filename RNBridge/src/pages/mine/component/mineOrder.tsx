import React, {useEffect} from 'react';
import {View, Text, Image, Button, TouchableOpacity, ViewProps} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager, NativeManagerUnInstall} from '~common/native';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {BoxShadow} from 'react-native-shadow';

const width = Constants.kScreenWidth - countcoordinatesX(15) * 2
const styles = {
  container: {
    width: width,
    marginLeft: countcoordinatesX(15),
    marginTop: countcoordinatesX(15),
    height: countcoordinatesX(140),
  },
  content: {
    overflow: 'hidden',
    borderRadius: countcoordinatesX(10),
    height: countcoordinatesX(140),
    flexDirection: "row",
    backgroundColor: "white"
  },
  itemTouch: {
    flex: 1,
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20)
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: countcoordinatesX(50),
    height: countcoordinatesX(50)
  },
  name: {
    marginTop: countcoordinatesX(15),
    fontSize: Constants.kFontNormal(10),
    color: Color.kMainTextColor,
    fontWeight: '300',
  }
};

interface MineOrderIProps {
  onPress: (index: number)=>{}
}

type IProps = MineOrderIProps & ViewProps

const Item = ({props, index, name, icon})=>{
  return (
    <TouchableOpacity 
      style={styles.itemTouch} 
      activeOpacity={0.9}
      onPress={()=>{props.onPress(index)}}
    >
      <View style={styles.item}>
        <Image style={styles.icon} source={icon} resizeMode={"contain"}/>
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const MineOrder = (props: IProps) => {

  const shadowOpt = {
    width: width,
    height: countcoordinatesX(140),
    color: Color.kShadowColor,
    border: 3,
    radius: countcoordinatesX(10),
    opacity: 0.1,
    x: 0,
    y: 0,
  };

  const items = ()=>{
    const params = [
      {
        icon: require("~assets/img/mine/mine_waittingpayment.png"),
        name: "待支付"
      },
      {
        icon: require("~assets/img/mine/mine_waittingreceive.png"),
        name: "待收货"
      },
      {
        icon: require("~assets/img/mine/mine_waittingevaluate.png"),
        name: "待评价"
      },
      {
        icon: require("~assets/img/mine/mine_aftersale.png"),
        name: "退换/售后"
      },
      {
        icon: require("~assets/img/mine/mine_order.png"),
        name: "我的订单"
      }
    ]
    const array = []
    for (let i=0; i<params.length; i++) {
      array.push(<Item key={i} props={props} name={params[i].name} icon={params[i].icon} index={i}/>)
    }

    return array
  }
  
  return (
    <View style={styles.container}>
      <BoxShadow setting={shadowOpt}>
        <View style={styles.content}>{items()}</View>
      </BoxShadow>
    </View>
  );
};

Item.defaultProps = {
  onPress: () => { }
};

export default MineOrder;
