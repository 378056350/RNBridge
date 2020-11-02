import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Button, Image, TouchableOpacity, ViewProps } from 'react-native';
import { useMappedState, useDispatch } from 'redux-react-hook';
import { Color } from '~common/colors';
import { Constants, countcoordinatesX } from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import { NativeManager } from '~common/native';
import SegmentBar from '~components/segment/segmentBar';
import PlaceHolder, { PlaceHolderModes } from '~components/placeholder/placeholder'
import HUD from '~components/hud/hud'
import {orderNormalAction, orderHeaderAction} from '~pages/order/store/action/orderAction'

const styles = {
  container: {
    flex: 1,
    backgroundColor: Color.kDefaultBackGroundColor
  },
  placeholder: {
    position: "absolute",
    left: 0,
    top: Constants.kNavigationHeight + countcoordinatesX(80),
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - (Constants.kNavigationHeight + countcoordinatesX(80)),
    backgroundColor: Color.kDefaultBackGroundColor
  },
  hud: {
    position: "absolute",
    left: 0,
    top: Constants.kNavigationHeight + countcoordinatesX(80),
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - Constants.kNavigationHeight
  }
};

interface OrderIProps { }

type IProps = OrderIProps & ViewProps;

const Order = (props: IProps) => {

  const [index, setIndex] = useState(0);
  const mode = useMappedState((state) => state.orderReducer.mode);
  const hud = useMappedState((state) => state.orderReducer.hud);
  const dispatch = useDispatch();


  useEffect(() => {
    const action = orderNormalAction();
    dispatch(action);
  }, []);

  const onBarPress = (number)=>{
    if (index != number) {
      const action = orderNormalAction();
      dispatch(action);
      setIndex(number)
    }
  }

  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  const onButtonPress = ()=>{
    const action = orderHeaderAction();
    dispatch(action);
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={"我的订单"}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
      />
      <SegmentBar
        names={['待支付', '待收货', '待评价', '待退货', '已完成']}
        chooseIcon={[false, false, false, false]}
        icon={[
          [],
          [],
          [],
          []
        ]}
        onPress={onBarPress}
      />
      {mode != PlaceHolderModes.None && (
        <PlaceHolder mode={mode} style={styles.placeholder} onButtonPress={onButtonPress} />
      )}
      <HUD style={styles.hud} show={hud} />
    </View>
  );
};

export default Order;
