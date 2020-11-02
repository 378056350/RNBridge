import React, { useEffect, useState, useImperativeHandle } from 'react';
import {
  Animated,
  Easing,
  View,
  Text,
  Image,
  ActivityIndicator,
  ViewProps
} from 'react-native';
import { Constants, countcoordinatesX } from '~common/screen'
import {Color} from '~common/colors';

const styles = {
  container: {
    backgroundColor: "rgba(0,0,0,0.05)",
    justifyContent: "center",
    alignItems: "center"
  },
  hud: {
    padding: countcoordinatesX(30),
    backgroundColor: "rgba(0,0,0,0.8)",
    borderRadius: countcoordinatesX(5),
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    width: countcoordinatesX(80),
    height: countcoordinatesX(80),
    backgroundColor: "orange"
  },
  name: {
    fontSize: Constants.kFontNormal(12),
    fontWeight: "400",
    color: "white"
  }
}

interface HUDIProps {
  name: string
  showShadow: boolean
  show: boolean
}

type IProps = HUDIProps & ViewProps

const HUD = React.forwardRef((props: IProps, ref) => {

  const [display, setDisplay] = useState(props.show);
  const [opacityAnim, setOpacityAnim] = useState(new Animated.Value(1));

  const show = () => {
    setDisplay(true)
    Animated.timing(opacityAnim, {
      toValue: 1,
      easing: Easing.linear,
      duration: 100,
      useNativeDriver: true
    }).start();
  }
  
  const hide =  ()=>{
    Animated.timing(opacityAnim, {
      toValue: 0,
      easing: Easing.linear,
      duration: 100,
      useNativeDriver: true
    }).start(()=>{
      setDisplay(false)
    });
  }

  useEffect(() => {
    if (props.show == true) {
      show()
    } else {
      hide()
    }
  }, [props.show]);

  return (
    <Animated.View 
      style={[props.style, styles.container, {
        backgroundColor: props.showShadow == true ? "rgba(0,0,0,0.05)" : "transparent",
        display: display == true ? "flex" : "none",
        opacity: opacityAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1]
        })
      }]}
    >
      <Animated.View style={styles.hud}>
        {props.name.length == 0 && <ActivityIndicator size="large" color={Color.kWhiteColor} />}
        {props.name.length != 0 && <Text style={styles.name}>{props.name}</Text>}
      </Animated.View>
    </Animated.View>
  )
})

HUD.defaultProps = {
  name: "",
  showShadow: true,
  show: false,
};

export default HUD;