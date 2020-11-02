import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  TouchableOpacity,
  ViewProps
} from 'react-native';
import { Constants, countcoordinatesX, countcoordinatesY } from '~common/screen'
import { BoxShadow } from 'react-native-shadow'
import { Color } from '~common/colors'


const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: countcoordinatesX(80),
    backgroundColor: "white",
    flexDirection: "row",
  },
  itemTouch: {
    flex: 1,
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row"
  },
  name: {
    fontSize: Constants.kFontNormal(13),
    fontWeight: "300",
    color: Color.kMainTextColor
  },
  icon: {
    width: countcoordinatesX(25),
    height: countcoordinatesX(25),
    marginLeft: countcoordinatesX(5)
  }
}

interface SegmentBarIProps {
  names: string[]
  chooseIcon: boolean[]
  icon: any[]
  onPress: ()=>{}
}

type IProps = SegmentBarIProps & ViewProps

const SegmentBar = (props: IProps) => {

  const [selectIndex, setSelectIndex] = useState(0);
  const [iconSelectIndex, setIconSelectIndex] = useState(1);

  const onPress = (index)=>{
    // 点击同一个 && 有图片
    if (index == selectIndex) {
      if ((iconSelectIndex + 1) >= props.icon[index].length) {
        setIconSelectIndex(1)
      } else {
        setIconSelectIndex(iconSelectIndex + 1)
      }
    } else {
      setIconSelectIndex(1)
    }
    setSelectIndex(index)

    props.onPress(index)
  }

  const items = ()=>{
    const array = []
    for (let i=0; i<props.names.length; i++) {
      array.push(
        <TouchableOpacity key={i} style={styles.itemTouch} onPress={()=>onPress(i)} activeOpacity={1}>
          <View style={styles.item}>
            <Text style={[styles.name, {
              color: selectIndex == i ? Color.kMainColor : Color.kMainTextColor
            }]}>
              {props.names[i]}
            </Text>
            {props.chooseIcon[i] && <Image style={styles.icon} resizeMode={"contain"} source={props.icon[i][selectIndex != i ? 0 : iconSelectIndex]}/>}
          </View>
        </TouchableOpacity>
      )
    }
    return array
  }

  return (
    <Animated.View style={[styles.container, props.style, {
      width: (props.style != undefined && props.style.width != undefined) ? props.style.width : styles.container.width,
      height: (props.style != undefined && props.style.height != undefined) ? props.style.height : styles.container.height,
    }]}>
      {items()}
    </Animated.View>
  )

}

SegmentBar.defaultProps = {
  names: [],
  chooseIcon: [],
  icon: [],
  onPress: ()=>{}
};

export default SegmentBar;