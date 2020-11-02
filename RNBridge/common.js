//====================== 第三方common库 ======================//
import {} from 'react';
import {
  NativeEventEmitter,
  NativeModules,
  DeviceEventEmitter,
  Platform,
} from 'react-native';
import {} from 'redux';
import {} from 'redux-saga';
import {} from 'redux-react-hook';
// import {} from 'react-native-shadow';
// import {} from '@react-navigation/native';
// import {} from '@react-navigation/stack';
// import {} from "react-native-fast-image";


//====================== 我自己的common库 ======================//
// import {} from '~common/colors'
// import {} from '~common/native'
// import {} from '~common/screen'
// import {} from '~components/cell/tableCell'
// import {} from '~components/fastimage/smartImage'
// import {} from '~components/navigation/navigationBar'
// import {} from '~components/segment/segmentBar'


// //====================== 多bundle打包图片路径修改 ======================//
// import {SmartAssets} from 'react-native-smartassets';
// SmartAssets.initSmartAssets();
// DeviceEventEmitter.addListener('sm-bundle-changed', (bundlePath) => {
//   SmartAssets.setBundlePath(bundlePath);
// });
// // ios
// if (Platform.OS != 'android') {
//   const {RNBridgeEmiter} = NativeModules;
//   const bundleLoadEmitter = new NativeEventEmitter(RNBridgeEmiter);
//   const subscription = bundleLoadEmitter.addListener(
//     'BundleLoad',
//     (bundleInfo) => {
//       SmartAssets.setBundlePath(bundleInfo.path);
//     },
//   );
// }
// require('react-native/Libraries/Core/checkNativeVersion');
