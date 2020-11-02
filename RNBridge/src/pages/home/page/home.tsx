import React, {useEffect, useState, useRef} from 'react';
import {
  Animated,
  View,
  Text,
  SectionList,
  ViewProps,
  NativeEventEmitter,
  NativeModules
} from 'react-native';
import {Color} from '~common/colors';
import {Constants, countcoordinatesX} from '~common/screen';
import {NativeManager} from '~common/native';
import {useMappedState, useDispatch} from 'redux-react-hook';
import HomeHeader from '~pages/home/component/homeHeader';
import HomeSwiper from '~pages/home/component/homeSwiper';
import HomeModule from '~pages/home/component/homeModule';
import HomeDay from '~pages/home/component/homeDay';
import HomeHot from '~pages/home/component/homeHot';
import HomeGood from '~pages/home/component/homeGood';
import HomeTop from '~pages/home/component/homeTop';

interface HomeIProps {}

type IProps = HomeIProps & ViewProps;

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionList: {
    width: Constants.kScreenWidth,
    backgroundColor: Color.kDefaultBackGroundColor,
  },
  sectionHeader: {
    marginLeft: countcoordinatesX(15),
    height: countcoordinatesX(70),
    justifyContent: 'center',
  },
  sectionHeaderTitle: {
    fontSize: Constants.kFontNormal(16),
    fontWeight: '600',
    color: Color.kMainTextColor,
  },
};

const DATA = [
  {
    section: 0,
    data: [
      [
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home/0c349607-1cdc-4d62-a42b-9b4d74ec19c1.jpg',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home/45734721-1f2d-47ca-959e-5ca3a054a0a0.jpg',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home/66ce05a8-0a9d-4f8d-9a51-386013c758c7.png',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home/21c209ed-76c8-4166-9174-5f00972ad96f.png',
        },
      ],
    ],
  },
  {
    section: 1,
    data: [
      [
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_module/5bd81907-7e16-4f40-8073-a37b99a7dcb1.png',
          name: '珍稀物品',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_module/8a51becd-23ea-415c-8b83-388df1d6c9b01.png',
          name: '超值品类',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_module/11cdb83a-cdda-4a79-acbb-e110dea1be23.png',
          name: '热销榜单',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_module/ea5047e2-60e4-42bb-8005-c820aa245cf6.png',
          name: '天天打折',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_module/6fff7fbc-2925-481a-9190-0540cf2f8e7b.gif',
          name: '新人专享',
        },
      ],
    ],
  },
  {
    section: 2,
    name: '每日购',
    data: [
      [
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_day/9858c6e7-2c0e-4f1b-8e9a-cd64da705050.jpg',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_day/147679da-d377-4de0-b812-0ed7bbbd5541.jpg',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_day/a63f23cf-6690-432a-ae8a-66d040ed0b4d.jpg',
        },
        {
          icon:
            'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_day/bcf4fff3-5c8a-4737-9d29-07f1c92f40bf.jpg',
        },
      ],
    ],
  },
  {
    title: 'Desserts',
    section: 3,
    name: '大卖特卖',
    data: [
      {
        icon:
          'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/a7a5f813-36f9-455b-9a79-0fa278641aaa.png',
        data: [
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/8cc65bca-d713-4344-96a7-944bbf06ea28.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/8269d5ce-a6cd-4b5e-afea-1bc454eaa4c0.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥6099',
            oldPrice: '¥6299',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/300b425b-2f69-4332-97b0-e35e35a31e59.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥8299',
            oldPrice: '¥8499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/e69eac0f-eac2-4360-ba21-5262aa7b2e3c.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥9099',
            oldPrice: '¥9299',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/8beaec1c-13fa-4d2f-b0fd-e20a40844087.jpg',
            name: '阿迪达斯 Adidasi...',
            price: '¥699',
            oldPrice: '¥1299',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/36bcc141-185b-457d-8218-9f4a2a8edb8d.jpg',
            name: 'Onitsuka Tiger Shoe',
            price: '¥588',
            oldPrice: '¥829',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/dedb2809-c195-4847-b0f9-58f381f5e113.jpg',
            name: '阿迪达斯 Adidasi...',
            price: '¥588',
            oldPrice: '¥829',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/13d80c46-8ea1-4fc9-bb09-13c11ad44ca2.jpg',
            name: 'Apple Airpods',
            price: '¥1659',
            oldPrice: '¥1999',
          },
        ],
      },
      {
        icon:
          'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/47647a99-ee48-4e7c-b779-f872e30e2647.jpg',
        data: [
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/74707a18-7c4e-443d-951f-40b03cbb18ac.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/07e10fcb-3648-424e-bef2-21ec82a46a54.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/4f5d072e-ad2f-4823-be14-46e6ace71b17.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/b68da281-0b8d-4bb8-9a2b-3a9513d8d126.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/201ffd63-b098-4e2c-bdef-90f113e9e682.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/7db8d42d-0c85-4565-99e7-692e187ca250.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/10c3bf04-0d12-4dc7-8574-49bc8785dd0a.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
          {
            icon:
              'https://gitee.com/asdwqeqweasdaswqeqweq/test/raw/master/img/home_hot/835f07de-113e-42f8-bd49-29b2dd75bd0e.jpg',
            name: 'Apple iPhone 11 Pro',
            price: '¥5299',
            oldPrice: '¥5499',
          },
        ],
      },
    ],
  },
  {
    title: 'Desserts2',
    section: 4,
    data: ['Cheese Cake', 'Cheese Cake'],
  },
];

const Home = (props: HomeIProps) => {
  const offsetAnimY = new Animated.Value(0);
  let listRef;

  const {RNBridgeNativeEmiter} = NativeModules;
  const rnBridgeNativeEmiter = new NativeEventEmitter(RNBridgeNativeEmiter);


  // 已经进入
  const subscription2 = rnBridgeNativeEmiter.addListener(
    'rn_viewDidLoad',
    async (reminder) => {
      if (reminder === props.uuid) {
        NativeManager.addPrebundles(["search", "hot", "day", "good", "login"])
      }
    },
  );

  useEffect(() => {
    return () => {
      subscription2.remove();
    };
  });

  // 点击分类
  const onSortPress = () => {
    NativeManager.setSelectedIndex(1);
  };

  // 点击登录
  const onLoginPress = () => {
    NativeManager.push({name: 'login', props: {}});
  };

  // 点击轮播图
  const onSwiperPress = (index) => {
    console.log(index);
  };

  // 点击功能
  const onModulePress = (index) => {};

  // 点击搜索
  const onSearchPress = () => {
    NativeManager.push({name: 'search', props: {}});
  };

  // 每日购
  const onDayPress = () => {
    NativeManager.push({name: 'day', props: {}});
  };

  // 大卖特卖
  const onHotImagePress = () => {
    NativeManager.push({name: 'hot', props: {}});
  };

  const onHotPress = () => {
    NativeManager.push({name: 'good', props: {}});
  };

  // 返回顶部
  const onTopPress = () => {
    listRef.scrollToLocation({
      animated: true,
      itemIndex: 0,
      viewOffset: 0,
      sectionIndex: 0,
    });
  };

  // 点击商品
  const onGoodPress = () => {
    NativeManager.push({name: 'good', props: {}});
  };

  const Item = ({section, item, index}) => {
    // 轮播图
    if (section == 0) {
      return <HomeSwiper onPress={onSwiperPress} item={item} />;
    }
    // 功能
    else if (section == 1) {
      return <HomeModule onPress={onModulePress} item={item} />;
    }
    // 功能
    else if (section == 2) {
      return <HomeDay onPress={onDayPress} item={item} />;
    }
    // 热门
    else if (section == 3) {
      return (
        <HomeHot
          onPress={onHotPress}
          onImagePress={onHotImagePress}
          item={item}
        />
      );
    }

    return <HomeGood onPress={onGoodPress} />;
  };

  const renderSectionHeader = ({section: {section, name}}) => {
    if (section != 2 && section != 3) {
      return <View />;
    }
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderTitle}>{name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        ref={(ref) => (listRef = ref)}
        onScroll={(event) => {
          NativeManager.hideKeyboard();
          offsetAnimY.setValue(event.nativeEvent.contentOffset.y);
        }}
        showsVerticalScrollIndicator={false}
        style={styles.sectionList}
        sections={DATA}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({section: {section}, item, index}) =>
          Item({section, item, index})
        }
      />
      <HomeHeader
        style={{
          transform: [
            {
              translateY: offsetAnimY.interpolate({
                inputRange: [-1, 0, countcoordinatesX(80), 9999],
                outputRange: [
                  1,
                  0,
                  -countcoordinatesX(80),
                  -countcoordinatesX(80),
                ], // 0 : 150, 0.5 : 75, 1 : 0
              }),
            },
          ],
          opacity: offsetAnimY.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [0, 0, 1], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }}
        onLoginPress={onLoginPress}
        onSortPress={onSortPress}
        onSearchPress={onSearchPress}
      />
      <HomeTop
        onPress={onTopPress}
        style={{
          opacity: offsetAnimY.interpolate({
            inputRange: [
              0,
              Constants.kScreenHeight,
              Constants.kScreenHeight + 1,
            ],
            outputRange: [0, 0, 1], // 0 : 150, 0.5 : 75, 1 : 0
          }),
        }}
      />
    </View>
  );
};

export default Home;
