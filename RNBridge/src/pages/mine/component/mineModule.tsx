import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager, NativeManagerUnInstall} from '~common/native';
import NavigationBar, {
  NavigationBarModes,
} from '~components/navigation/navigationBar';
import TableCell from '~components/cell/tableCell';
import {BoxShadow} from 'react-native-shadow';

const width = Constants.kScreenWidth - countcoordinatesX(15) * 2;
const styles = {
  container: {
    width: width,
    marginLeft: countcoordinatesX(15),
    marginTop: countcoordinatesX(20),
    flexWrap: 'wrap',
  },
  content: {
    overflow: 'hidden',
    borderRadius: countcoordinatesX(10),
  },
  item: {
    width: width,
    height: countcoordinatesX(100),
    flexDirection: 'row',
  },
};

interface MineModuleIProps {
  onPress: (index: number) => {};
}

type IProps = MineModuleIProps & ViewProps;

const MineModule = (props: IProps) => {
  const shadowOpt = {
    width: width,
    height: countcoordinatesX(100) * 2,
    color: Color.kShadowColor,
    border: 3,
    radius: countcoordinatesX(10),
    opacity: 0.1,
    x: 0,
    y: 0,
  };

  const items = () => {
    const array = [];
    const names = [
      {
        name: '我的收藏',
      },
      {
        name: '地址管理',
      },
      {
        name: '我的优惠券',
      },
      {
        name: '关于我们',
      }
    ];
    for (let i = 0; i < names.length; i++) {
      array.push(
        <TableCell
          key={i}
          style={styles.item}
          name={names[i].name}
          detail={names[i].detail}
          onPress={() => {
            props.onPress(i);
          }}
          next={require('~assets/img/next_icon.png')}
        />,
      );
    }

    return array;
  };

  return (
    <View style={styles.container}>
      <BoxShadow setting={shadowOpt}>
        <View style={styles.content}>{items()}</View>
      </BoxShadow>
    </View>
  );
};

export default MineModule;
