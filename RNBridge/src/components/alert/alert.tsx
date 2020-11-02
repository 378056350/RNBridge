import React, {useEffect, useState, useRef, useImperativeHandle} from 'react';
import {
  View,
  Text,
  Easing,
  Animated,
  ViewProps,
  TouchableOpacity,
} from 'react-native';
import {Constants, countcoordinatesX} from '~common/screen';
import {Color} from '~common/colors';

interface AlertIProps {
  onPress: ()=>{}
  button: string
}

type IProps = AlertIProps & ViewProps;

const styles = {
  container: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: countcoordinatesX(300)
  },
  content: {
    backgroundColor: "white",
    width: Constants.kScreenWidth / 3 * 2,
    borderRadius: countcoordinatesX(10)
  },
  name: {
    paddingTop: countcoordinatesX(30),
    paddingBottom: countcoordinatesX(30),
    paddingLeft: countcoordinatesX(15),
    paddingRight: countcoordinatesX(15),
    fontSize: Constants.kFontNormal(12),
    fontWeight: "400",
    color: Color.kMainTextColor,
    textAlign: "center",
    lineHeight: 18,
    borderBottomColor: Color.kLineColor,
    borderBottomWidth: countcoordinatesX(1),
  },
  buttonTouch: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: countcoordinatesX(20),
    paddingBottom: countcoordinatesX(20)
  },
  button: {
    color: Color.kMainColor,
    fontSize: Constants.kFontNormal(14),
    fontWeight: "400",
    textAlign: "center",
    lineHeight: 18
  }
};

const Alert = React.forwardRef((props: IProps, ref) => {

  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [opacityAnim, setOpacityAnim] = useState(new Animated.Value(0));

  useImperativeHandle(ref, () => ({
    show: (name) => {
      setShow(true)
      setName(name)
    },
    hide: ()=>{
      Animated.timing(opacityAnim, {
        toValue: 0,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true
      }).start(()=>{
        setShow(false)
      });
    }
  }));

  useEffect(() => {
    if (show == true) {
      Animated.timing(opacityAnim, {
        toValue: 1,
        easing: Easing.linear,
        duration: 100,
        useNativeDriver: true
      }).start();
    }
  }, [show])

  if (show) {
    return (
      <Animated.View 
        style={[styles.container, props.style, {
          opacity: opacityAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        }]}>
        <View style={styles.content}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity style={styles.buttonTouch} onPress={props.onPress} activeOpacity={0.9}>
            <Text style={styles.button}>{props.button}</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  } else {
    return (
      <></>
    )
  }
  
});

Alert.defaultProps = {
  onPress: ()=>{},
  button: "好的"
};

export default Alert;
