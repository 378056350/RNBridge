import React, { useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Color } from '~common/colors';
import { Constants, countcoordinatesX } from '~common/screen';
import { NativeManager, NativeManagerUnInstall } from '~common/native';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import PlaceHolder, {
  PlaceHolderModes,
} from '~components/placeholder/placeholder';
import {couponRequestAction, couponAgainRequestAction} from '~pages/coupon/store/action/couponAction'
import HUD from '~components/hud/hud'

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.kDefaultBackGroundColor,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingBottom: Constants.kSafeAreaBottomHeight + countcoordinatesX(40),
    justifyContent: "space-between",
  },
  placeholder: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - Constants.kNavigationHeight
  },
  hud: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - Constants.kNavigationHeight,
    backgroundColor: "red"
  }
};

const Coupon = () => {


  const mode = useMappedState((state) => state.couponReducer.mode);
  const hud = useMappedState((state) => state.couponReducer.hud);
  const dispatch = useDispatch();

  useEffect(() => {
    const action = couponRequestAction();
    dispatch(action);
  }, []);

  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  const onButtonPress = ()=>{
    const action = couponAgainRequestAction();
    dispatch(action);
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'优惠券'}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
      />
      <View style={styles.content}>
        {mode != PlaceHolderModes.None && (
          <PlaceHolder mode={mode} style={styles.placeholder} onButtonPress={onButtonPress}/>
        )}
        <HUD style={styles.hud} show={hud}/>
      </View>
    </View>
  );
};

export default Coupon;
