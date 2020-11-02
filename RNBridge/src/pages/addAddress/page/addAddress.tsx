import React, {useEffect, useState, useRef, useContext} from 'react';
import { View, FlatList, ViewProps } from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import Item from '~pages/addAddress/component/item';
import Button from '~components/button/button';
import HUD from '~components/hud/hud';
import {uuid} from '~common/util';
import Alert from '~components/alert/alert';
import AddressHUD from '~pages/addAddress/component/addressHUD';


interface AddAddressIProps {
  name: string;
}

type IProps = AddAddressIProps & ViewProps;

const styles = {
  container: {
    flex: 1,
  },
  content: {
    backgroundColor: Color.kDefaultBackGroundColor,
    flex: 1,
    paddingBottom: Constants.kSafeAreaBottomHeight + countcoordinatesX(40),
    justifyContent: 'space-between',
  },
  button: {
    marginLeft: countcoordinatesX(30),
    marginRight: countcoordinatesX(30),
    marginTop: countcoordinatesX(70),
  },
  alert: {
    position: "absolute",
    left: 0,
    top: Constants.kNavigationHeight,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight - Constants.kNavigationHeight,
  },
  area: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight,
  }
};



const AddAddress = (props: IProps, {initialProps}) => {


  const [alertName, setAlertName] = useState("");

  const [show, setShow] = useState(false);
  const [user, setUser] = useState('');
  const [phone, setPhone] = useState('');
  const [province, setProvince] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [detail, setDetail] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const alertRef = useRef();
  const addressRef = useRef();

  const DATA = [
    {
      name: '收货人    ',
      placeholder: '收货人',
      hasInput: true,
      hasNext: false,
      hasSwitch: false,
      canEdit: true,
      multiLine: false,
      keyboardType: 'default',
      maxLength: 30,
      value: user
    },
    {
      name: '手机号码',
      placeholder: '手机号码',
      hasInput: true,
      hasNext: false,
      hasSwitch: false,
      canEdit: true,
      multiLine: false,
      keyboardType: 'number-pad',
      maxLength: 11,
      value: phone
    },
    {
      name: '所在地区',
      placeholder: '所在地区',
      hasInput: true,
      hasNext: true,
      hasSwitch: false,
      canEdit: false,
      multiLine: false,
      keyboardType: 'default',
      maxLength: 30,
      value: (province.length != 0 && city.length != 0 && area.length != 0 ) ? (province + " " + city + " " + area) : ""
    },
    {
      name: '详细地址',
      placeholder: '详细地址: 如道路、门牌号、小区、楼栋号、单元室等',
      hasInput: true,
      hasNext: false,
      hasSwitch: false,
      canEdit: true,
      multiLine: true,
      keyboardType: 'default',
      maxLength: 200,
      value: detail
    },
    {
      name: '设为默认地址',
      placeholder: '',
      hasInput: false,
      hasNext: false,
      hasSwitch: true,
      canEdit: false,
      multiLine: false,
      keyboardType: 'default',
      maxLength: 0,
    },
  ];

  useEffect(() => {
    setUser(props.user)
    setPhone(props.phone)
    setProvince(props.province)
    setCity(props.city)
    setArea(props.area)
    setDetail(props.detail)
    setIsDefault(props.isDefault)
    
  }, []);

  const buttonLeftPress = () => {
    NativeManager.pop();
  };

  // 所在地区
  const onInputPress = () => {
    addressRef.current.show()
  };

  // 默认地址
  const onValueChange = (value) => {
    setIsDefault(value);
  };

  // 修改内容
  const onChangeText = ({index, value}) => {
    if (index == 0) {
      setUser(value);
    } else if (index == 1) {
      setPhone(value);
    } else if (index == 2) {
      setArea(value);
    } else if (index == 3) {
      setDetail(value);
    }
  };

  // 点击省
  const onProvincePress = (province)=>{
    setProvince(province)
  }

  // 点击市
  const onCityPress = (city)=>{
    setCity(city)
  }

  // 点击区
  const onAreaPress = (area)=>{
    setArea(area)
    addressRef.current.hide()
  }

  // 重新选择
  const onTreePress = (index)=>{
    // 省
    if (index == 0) {
      setProvince("");
      setCity("");
      setArea("");
    }
    // 市
    else if (index == 1) {
      setCity("");
      setArea("");
    }
    // 区
    else if (index == 2) {
      setArea("");
    }
  }

  // 保存
  const onSavePress = async () => {
    if (user.length < 2 || user.length > 25) {
      const name = "收货人姓名长度需要在2-25个字符之间，不能包含特殊字符"
      alertRef.current.show(name)
    }
    else if (phone.length != 11) {
      const name = "请输入11位的手机号码"
      alertRef.current.show(name)
    }
    else if (province.length == 0) {
      const name = "请选择所在地区"
      alertRef.current.show(name)
    }
    else if (detail.length < 5 || detail.length > 120) {
      const name = "详细地址长度需要在5-120个字符之间, 不能包含特殊字符"
      alertRef.current.show(name)
    }
    else {
      // 修改
      if (props.id != undefined) {
        setShow(true)
        NativeManager.updateAddress({
          Id: props.id,
          user: user,
          phone: phone,
          province: province,
          city: city,
          area: area,
          detail: detail,
          isDefault: isDefault
        }).then(()=>{
          setShow(false)
          NativeManager.pop()
        })
      }
      // 添加
      else {
        setShow(true)
        NativeManager.insertAddress({
          Id: uuid(),
          user: user,
          phone: phone,
          province: province,
          city: city,
          area: area,
          detail: detail,
          isDefault: isDefault
        }).then(()=>{
          setShow(false)
          NativeManager.pop()
        })
      }
    }
  };

  const renderItem = ({index, item}) => {
    return (
      <Item
        item={item}
        isOn={isDefault}
        onInputPress={onInputPress}
        onValueChange={onValueChange}
        onChangeText={(value) => onChangeText({index, value})}
        value={item.value}
      />
    );
  };

  const ListFooterComponent = () => {
    return <Button style={styles.button} name={'保存'} onPress={onSavePress} />;
  };

  const onAlertPress = ()=>{
    alertRef.current.hide()
  }

  return (
    <View style={styles.container}>
      <NavigationBar
        title={'添加收货地址'}
        showBottomLine={true}
        mode={NavigationBarModes.Back}
        buttonLeftPress={buttonLeftPress}
      />
      <View style={styles.content}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={ListFooterComponent}
        />
      </View>
      <AddressHUD 
        ref={addressRef}
        style={styles.area}
        province={province}
        city={city}
        area={area}
        onProvincePress={onProvincePress}
        onCityPress={onCityPress}
        onAreaPress={onAreaPress}
        onTreePress={onTreePress}
      />
      <Alert 
        ref={alertRef} 
        style={styles.alert}
        name={alertName}
        button={"好的"}
        onPress={onAlertPress}
      />
      <HUD
        showShadow={true}
        show={show}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
    </View>
  );
};

AddAddress.defaultProps = {
  name: '',
  phone: '',
  province: '',
  city: '',
  area: '',
  detail: '',
  isDefault: true
};

export default AddAddress;
