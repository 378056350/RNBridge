import React, {useEffect, useState, useRef} from 'react';
import {View, Text, Image, TextInput, ScrollView} from 'react-native';
import {Color} from '~common/colors';
import {useMappedState, useDispatch} from 'redux-react-hook';
import {Constants, countcoordinatesX} from '~common/screen';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import {NativeManager} from '~common/native';
import LoginHeader from '~pages/login/component/loginHeader'
import Button from '~components/button/button';
import HUD from '~components/hud/hud';
import Alert from '~components/alert/alert';
import {loginAction} from '~pages/login/store/action/loginAction';

const styles = {
  container: {
    flex: 1,
  },
  input: {
    width: Constants.kScreenWidth - countcoordinatesX(40) * 2,
    height: countcoordinatesX(90),
    marginLeft: countcoordinatesX(40),
    marginTop: countcoordinatesX(30),
    borderBottomColor: Color.kLineColor,
    borderBottomWidth: countcoordinatesX(1),
    color: Color.kMainTextColor
  },
  button: {
    width: Constants.kScreenWidth - countcoordinatesX(40) * 2,
    height: countcoordinatesX(70),
    marginLeft: countcoordinatesX(40),
    marginTop: countcoordinatesX(80),
    borderRadius: countcoordinatesX(35),
  },
  hud: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight
  },
  alert: {
    position: "absolute",
    left: 0,
    top: 0,
    width: Constants.kScreenWidth,
    height: Constants.kScreenHeight,
  }
};

const Login = () => {

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const hud = useMappedState((state) => state.loginReducer.hud);
  const name = useMappedState((state) => state.loginReducer.name);
  const alertRef = useRef();
  const dispatch = useDispatch();
  
  const onSavePress = ()=>{
    if (user.length != 11) {
      const name = "请输入11位的手机号码"
      alertRef.current.show(name)
    }
    else if (pass.length < 4 || pass.length > 20) {
      const name = "密码长度需要在4-20个字符之间, 不能包含特殊字符"
      alertRef.current.show(name)
    }
    else {
      const action = loginAction(user, pass);
      dispatch(action);
    }
  }

  const onAlertPress = ()=>{
    alertRef.current.hide()
  }

  return (
    <ScrollView style={styles.container} scrollEnabled={false}>
      <LoginHeader/>
      <TextInput 
        style={styles.input} 
        placeholder={"请输入手机号"}
        selectionColor={Color.kMainColor}
        keyboardType={'number-pad'}
        maxLength={11}
        value={user}
        onChangeText={(value)=>setUser(value)}
      />
      <TextInput 
        style={styles.input} 
        placeholder={"请输入密码"}
        selectionColor={Color.kMainColor}
        secureTextEntry={true}
        maxLength={23}
        value={pass}
        onChangeText={(value)=>setPass(value)}
      />
      <Button style={styles.button} name={'登录'} onPress={onSavePress} />
      <Alert 
        ref={alertRef} 
        style={styles.alert}
        button={"好的"}
        onPress={onAlertPress}
      />
      <HUD style={styles.hud} show={hud} showShadow={false} name={name}/>
    </ScrollView>
  );
};

export default Login;
