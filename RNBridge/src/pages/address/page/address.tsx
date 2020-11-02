import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  NativeEventEmitter,
  NativeModules,
} from 'react-native';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import PlaceHolder, {
  PlaceHolderModes,
} from '~components/placeholder/placeholder';
import {NativeManager} from '~common/native';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import RefreshListView from 'react-native-refresh-list-view';
import Item from '~pages/address/component/item';
import HiddenItem from '~components/hiddenItem/hiddenItem';
import {addressNormalAction, addressHeaderAction, addressDeleteAction} from '~pages/address/store/action/addressAction';
import HUD from '~components/hud/hud'

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingBottom: Constants.kSafeAreaBottomHeight,
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
  },
  placeholder: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - Constants.kNavigationHeight,
    backgroundColor: Color.kDefaultBackGroundColor,
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

interface AddressIProps {}

type IProps = AddressIProps & ViewProps;

const Address = (props: IProps) => {
  // 数据
  const mode = useMappedState((state) => state.addressReducer.mode);
  const hud = useMappedState((state) => state.addressReducer.hud);
  const data = useMappedState((state) => state.addressReducer.data);
  const dispatch = useDispatch();

  const {RNBridgeNativeEmiter} = NativeModules;
  const rnBridgeNativeEmiter = new NativeEventEmitter(RNBridgeNativeEmiter);

  // 将要进入
  const subscription1 = rnBridgeNativeEmiter.addListener(
    'rn_viewWillAppear',
    (reminder) => {
      if (reminder === props.uuid) {
        const action = addressHeaderAction();
        dispatch(action);
      }
    },
  );

  // 已经进入
  const subscription2 = rnBridgeNativeEmiter.addListener(
    'rn_viewDidLoad',
    async (reminder) => {
      if (reminder === props.uuid) {
        NativeManager.addPrebundles(['addAddress']);
      }
    },
  );

  useEffect(() => {
    const action = addressNormalAction();
    dispatch(action);
  }, []);

  useEffect(() => {
    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  });

  // 返回
  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  // 跳转详情页
  const onPress = (item) => {
    NativeManager.push({
      name: 'addAddress',
      preloading: [],
      props: {
        id: item.Id,
        user: item.user,
        phone: item.phone,
        province: item.province,
        city: item.city,
        area: item.area,
        detail: item.detail,
        isDefault: item.isDefault,
      },
    });
  };

  // 添加新地址
  const buttonRightPress = () => {
    NativeManager.push({name: 'addAddress', preloading: []});
  };

  // 网络失败
  const onButtonPress = ()=>{
    const action = addressHeaderAction();
    dispatch(action);
  }

  //======================================== UI ========================================//
  // 控件
  const renderItem = (data, rowMap) => {
    return <Item data={data} onPress={onPress} />;
  };

  const onRemovePress = (data)=>{
    const action = addressDeleteAction(data);
    dispatch(action);
  }

  const renderHiddenItem = (data, rowMap) => {
    return (
      <HiddenItem 
        rightNames={['删除']} 
        rightColors={[Color.kMainColor]} 
        onPress={()=>onRemovePress(data.item)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'我的地址'}
        showBottomLine={true}
        buttonImageLefts={[require('~assets/img/back_arrow.png')]}
        buttonLeftPress={buttonLeftPress}
        buttonTitleRights={['添加新地址']}
        buttonRightPress={buttonRightPress}
      />
      <View style={styles.content}>
        <SwipeListView
          data={data}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-countcoordinatesX(140)}
        />
        {mode != PlaceHolderModes.None && (
          <PlaceHolder mode={mode} style={styles.placeholder} onButtonPress={onButtonPress}/>
        )}
        <HUD style={styles.hud} show={hud}/>
      </View>
    </View>
  );
};

export default Address;
