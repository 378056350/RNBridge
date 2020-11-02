import { Dimensions, PixelRatio, Platform } from "react-native";

const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window')


// 是否是iPhoneX
function isIphoneX(): Boolean {
    // iPhoneX
    const X_WIDTH = 375;
    const X_HEIGHT = 812;
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    )
}

// 是否是iPhoneX
function isIphoneXR(): Boolean {
    // iPhoneX
    const X_WIDTH = 414;
    const X_HEIGHT = 896;
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    )
}

// 是否是iPhoneX
function isIphone11(): Boolean {
    // iPhoneX
    const X_WIDTH = 828;
    const X_HEIGHT = 1792;
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    )
}

// 是否是iPhoneX
function isIphone11Pro(): Boolean {
    // iPhoneX
    const X_WIDTH = 1125;
    const X_HEIGHT = 2436;
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    )
}

// 是否是iPhoneX
function isIphone11ProMax(): Boolean {
    // iPhoneX
    const X_WIDTH = 1242;
    const X_HEIGHT = 2688;
    return (
        Platform.OS === 'ios' &&
        ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
            (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))
    )
}



// 纵向计算距离
export function countcoordinatesX(designWidth: number): number {
    if (designWidth == 0) {
        return 0;
    }
    return (designWidth / 750.0) * D_WIDTH;
}

// 横向计算距离
export function countcoordinatesY(designHeight: number): number {
    if (designHeight == 0) {
        return 0;
    }
    return (designHeight / 1334.0) * D_HEIGHT;
}

// 字体适配
export function adjustFontSize(size: number): number {
    // 字体大小缩放比例
    var fontScale = PixelRatio.getFontScale();
    // 设备像素密度
    var pixelRatio = PixelRatio.get();
    const w2 = 750 / 2;
    const h2 = 1334 / 2;
    var scaleWidth = D_WIDTH / w2;
    var scaleHeight = D_HEIGHT / h2;
    var scale = Math.min(scaleWidth, scaleHeight);
    size = Math.round((size * scale + 0.5) * pixelRatio / fontScale);
    return size / PixelRatio.get();
}

export const Constants = {
    // 屏幕宽
    kScreenWidth: D_WIDTH,
    // 屏幕高
    kScreenHeight: D_HEIGHT,
    // 状态栏高
    kStatusBarHeight: (isIphoneX() || isIphoneXR() || isIphone11() || isIphone11Pro() || isIphone11ProMax()) ? 44 : 20,
    // 底部安全区域
    kSafeAreaBottomHeight: (isIphoneX() || isIphoneXR() || isIphone11() || isIphone11Pro() || isIphone11ProMax()) ? 34 : 0,
    // 导航栏高度
    kNavigationHeight: 44 + ((isIphoneX() || isIphoneXR() || isIphone11() || isIphone11Pro() || isIphone11ProMax()) ? 44 : 20),
    // Tabbar高度
    kTabBarHeight: 49 + ((isIphoneX() || isIphoneXR() || isIphone11() || isIphone11Pro() || isIphone11ProMax()) ? 34 : 0),
    // 字体
    kFontNormal: (fontSize) => adjustFontSize(fontSize)
}


