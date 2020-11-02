import {NativeModules} from 'react-native';

const RNBridgeNativeEmiter = NativeModules.RNBridgeNativeEmiter;

export enum NativeManagerUnInstall {
  // 未知
  Unkonw = 0,
  // 返回
  Pop = 1,
  // 不显示
  Disappear = 2
}

export const NativeManager = {
  /**
   * 跳转控制器
   * @param name 加载库
   * @param preloading 预加载库
   * @param props 参数
   */
  push: ({name, props}) => {
    RNBridgeNativeEmiter.push(name, props)
  },
  /**
   * 返回控制器
   */
  pop: ()=>{
    RNBridgeNativeEmiter.pop()
  },
  /**
   * 隐藏键盘
   */
  hideKeyboard: ()=>{
    RNBridgeNativeEmiter.hideKeyboard()
  },
  /**
   * 跳转Tabbar
   */
  setSelectedIndex: (index)=>{
    RNBridgeNativeEmiter.setSelectedIndex(index)
  },
  /**
   * 添加预加载库
   */
  addPrebundles: (prebundles)=>{
    RNBridgeNativeEmiter.addPrebundles(prebundles)
  },
  /**
   * 读取plist文件
   */
  loadPlist: async (pathName)=>{
    const data = await RNBridgeNativeEmiter.loadPlist(pathName)
    return data
  },
  /**
   * 添加地址
   */
  insertAddress: async (param)=>{
    await RNBridgeNativeEmiter.insertAddress(param)
  },
  /**
   * 修改地址
   */
  updateAddress: async (param)=>{
    await RNBridgeNativeEmiter.updateAddress(param)
  },
  /**
   * 删除地址
   */
  deleteAddress: async (param)=>{
    await RNBridgeNativeEmiter.deleteAddress(param)
  },
  /**
   * 获取地址
   */
  selectAddress: async ()=>{
    return await RNBridgeNativeEmiter.selectAddress()
  }
  
};
