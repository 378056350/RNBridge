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


export enum NavigationBarModes {
  // 未知
  None,
  // 返回按钮
  Back = 1 << 1,
  // 左侧关闭
  LeftClose = 1 << 2,
  // 右侧关闭
  RightClose = 1 << 3,
}

const styles = {
  container: {
    width: Constants.kScreenWidth,
    height: Constants.kNavigationHeight,
  },
  background: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  content__back: {
    flex: 1,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    marginTop: Constants.kStatusBarHeight,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content__button: {
    flexDirection: 'row',
  },
  // 按钮
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  button__image: {
    width: 20,
    height: 20
  },
  button__name: {
    fontSize: Constants.kFontNormal(15),
    fontWeight: "300"
  },
  button__content_padding: {
    marginLeft: countcoordinatesX(10)
  },
  // 线条
  line: {
    width: Constants.kScreenWidth,
    height: countcoordinatesY(1),
    position: "absolute",
    bottom: 0
  },
  // 标题
  content__title: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: Color.kMainTextColor,
    fontWeight: "400",
  }
}

interface IViewProps {
  // 模式
  mode?: NavigationBarModes,
  // 标题
  title?: string,
  // 按钮左
  buttonTitleLefts?: string[],
  // 按钮右
  buttonTitleRights?: string[],
  // 按钮左
  buttonImageLefts?: string[],
  // 按钮右
  buttonImageRights?: string[],
  // 按钮点击左
  buttonLeftPress: (index: number) => {},
  // 按钮点击右
  buttonRightPress: (index: number) => {},
  // 背景色
  backgroundColor: any,
  // 线条
  lineColor: String,
  // 显示线条
  showBottomLine: boolean,
}

type IProps = IViewProps & ViewProps

const NavigationBar = (props: IProps) => {

  const [buttonTitleLefts, setButtonTitleLefts] = useState([]);
  const [buttonImageLefts, setButtonImageLefts] = useState([]);
  const [buttonTitleRights, setButtonTitleRights] = useState([]);
  const [buttonImageRights, setButtonImageRights] = useState([]);

  const [lineColor, setLineColor] = useState(props.lineColor != null ? props.lineColor : Color.kLineColor);
  const [showBottomLine, setShowBottomLine] = useState(props.showBottomLine != null ? props.showBottomLine : false);

  // 生命周期
  useEffect(() => {
    // 返回按钮
    if (props.mode & NavigationBarModes.Back) {
      setButtonTitleLefts([])
      setButtonImageLefts([require('~/assets/img/back_arrow.png')])
    }
    // 关闭左
    if (props.mode & NavigationBarModes.LeftClose) {
      setButtonTitleLefts([])
      setButtonImageLefts([require('~/assets/img/navigation_close.png')])
    }
    // 关闭右
    if (props.mode & NavigationBarModes.RightClose) {
      setButtonTitleRights([])
      setButtonImageRights([require('~/assets/img/navigation_close.png')])
    }
    // 文本左
    if (props.buttonTitleLefts != null) {
      setButtonTitleLefts(props.buttonTitleLefts)
    }
    // 图片左
    if (props.buttonImageLefts != null) {
      setButtonImageLefts(props.buttonImageLefts)
    }
    // 文本右
    if (props.buttonTitleRights != null) {
      setButtonTitleRights(props.buttonTitleRights)
    }
    // 图片右
    if (props.buttonImageRights != null) {
      setButtonImageRights(props.buttonImageRights)
    }

  }, [])


  //======================================== Event ========================================//
  const onPress = (index: number, isLeft: boolean) => {
    if (isLeft == true && props.buttonLeftPress != null) {
      props.buttonLeftPress(index)
    }
    else if (isLeft == false && props.buttonRightPress != null) {
      props.buttonRightPress(index)
    }
  }

  //======================================== UI ========================================//
  const titleContainer = () => {
    return (
      <View style={styles.content__title}>
        <Text style={[styles.title, {
          fontSize: Constants.kFontNormal((props.title != undefined && props.title.length >= 3) ? 16 : 18)
        }]}>{props.title}</Text>
      </View>
    )
  }

  const button = (index: number, isLeft: boolean, title?: string, image?: Any) => {
    // 图片
    const imageContainer = (image?: String) => {
      return (image.length != 0) ? <Image style={styles.button__image} source={image} resizeMode={"contain"} /> : <View />
    }
    // 文本
    const titleContainer = (title?: String) => {
      return (title.length != 0) ? <Text style={styles.button__name}>{title}</Text> : <View />
    }

    return (
      <TouchableOpacity
        key={index}
        style={styles.button}
        activeOpacity={0.8}
        onPress={() => onPress(index, isLeft)}
      >
        {isLeft == true && imageContainer(image)}
        {isLeft == false && titleContainer(title)}
        {(image != null && image.length != 0) ? <View style={styles.button__content_padding} /> : <View />}
        {isLeft == false && imageContainer(image)}
        {isLeft == true && titleContainer(title)}
      </TouchableOpacity>
    )
  }

  const leftButton = () => {
    const buttons = []
    const count = Math.max(buttonTitleLefts.length, buttonImageLefts.length)
    for (let i = 0; i < count; i++) {
      const title = (buttonTitleLefts.length > i) ? buttonTitleLefts[i] : "";
      const image = (buttonImageLefts.length > i) ? buttonImageLefts[i] : "";
      buttons.push(button(i, true, title, image))
      if (i != (count - 1)) {
        buttons.push(<View key={10 + i} style={{ marginLeft: 4 }} />)
      }
    }
    return (
      <View style={styles.content__button}>
        {buttons}
      </View>
    )
  }

  const rightButton = () => {
    const buttons = []
    const count = Math.max(buttonTitleRights.length, buttonImageRights.length)
    for (let i = 0; i < count; i++) {
      const title = (buttonTitleRights.length > i) ? buttonTitleRights[i] : "";
      const image = (buttonImageRights.length > i) ? buttonImageRights[i] : "";
      buttons.push(button(i, false, title, image))
      if (i != (count - 1)) {
        buttons.push(<View key={10 + i} style={{ marginLeft: 4 }} />)
      }
    }

    return (
      <View style={styles.content__button}>
        {buttons}
      </View>
    )
  }

  const line = () => {
    return <Animated.View style={[styles.line, { 
      backgroundColor: Color.kLineColor, 
      display: showBottomLine == true ? "flex" : "none"
    }]} />
  }

  return (
    <Animated.View style={[styles.container, props.style]}>
      <Animated.View style={[styles.background, { 
        backgroundColor: props.backgroundColor
      }]} />
      <View style={styles.content__back}>
        <View style={styles.content}>
          {/* 标题 */}
          {titleContainer()}
          {/* 左按钮 */}
          {leftButton()}
          {/* 右按钮 */}
          {rightButton()}
          {/* 线条 */}
          {line()}
        </View>
      </View>
    </Animated.View>
  )

}

NavigationBar.defaultProps = {
  backgroundColor: Color.kWhiteColor,
  lineColor: Color.kLineColor,
  showBottomLine: true,
  buttonLeftPress: ()=>{},
  buttonRightPress: ()=>{}
};

export default NavigationBar;