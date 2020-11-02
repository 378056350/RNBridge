//
//  UIImage+Image.h
//  BasicFramework
//
//  Created by 郑业强 on 2019/10/11.
//  Copyright © 2019 nko. All rights reserved.
//

#import <UIKit/UIKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface UIImage (Image)


#pragma mark take image to this size
- (UIImage *)scaleToSize:(CGSize)size;
#pragma mark restore image to befor
- (UIImage *)restoreMyimage;
#pragma mark color -> image
+ (UIImage *)createImageWithColor:(UIColor*)color;
+ (UIImage *)createImageWithColor:(UIColor *)color size:(CGSize)size;
#pragma mark image -> color
- (UIImage *)imageWithColor:(UIColor *)color;
#pragma mark - Set the image rotation Angle
- (UIImage *)image_RotatedByAngle:(CGFloat)Angle;
#pragma mark - image from view
+ (UIImage *)imageFromView:(UIView *)theView;
#pragma mark - image from scrollView
+ (UIImage *)imageFromScrollView:(UIScrollView *)scrollView;

/**
 *  识别图片中的二维码
 */
- (BOOL)HaveQRCode;
/**
 *  图片的压缩方法
 *
 *  @param sourceImg   要被压缩的图片
 *  @param defineWidth 要被压缩的尺寸(宽)
 *
 *  @return 被压缩的图片
 */
+ (UIImage *)IMGCompressed:(UIImage *)sourceImg targetWidth:(CGFloat)defineWidth;
/**
 *  @brief  取图片某一点的颜色
 *
 *  @param point 某一点
 *
 *  @return 颜色
 */
- (UIColor *)colorAtPoint:(CGPoint )point;
//more accurate method ,colorAtPixel 1x1 pixel
/**
 *  @brief  取某一像素的颜色
 *
 *  @param point 一像素
 *
 *  @return 颜色
 */
- (UIColor *)colorAtPixel:(CGPoint)point;
/**
 *  @brief  获得灰度图
 *
 *  @param sourceImage 图片
 *
 *  @return 获得灰度图片
 */
+ (UIImage*)covertToGrayImageFromImage:(UIImage*)sourceImage;


// 获取BundleIMG
+ (UIImage *)imageNamed:(NSString *)IMGName InBundleNamed:(NSString *)BundleName;


//聊天的文字气泡拉伸
+ (UIImage *)resizedImage:(NSString *)name;
//调整图片大小
+ (UIImage *)resizedImage:(NSString *)name left:(CGFloat)left top:(CGFloat)top;

/* 裁剪圆形图片 例如：头像 */
+ (UIImage *)clipImage:(UIImage *)image;



#pragma mark - blur image
- (UIImage *)lightImage;
- (UIImage *)extraLightImage;
- (UIImage *)darkImage;
- (UIImage *)tintedImageWithColor:(UIColor *)tintColor;

- (UIImage *)blurredImageWithRadius:(CGFloat)blurRadius;
- (UIImage *)blurredImageWithSize:(CGSize)blurSize;
- (UIImage *)blurredImageWithSize:(CGSize)blurSize
                        tintColor:(UIColor *)tintColor
            saturationDeltaFactor:(CGFloat)saturationDeltaFactor
                        maskImage:(UIImage *)maskImage;

#pragma mark - Blur
- (UIImage *)blurryImage:(UIImage *)image withBlurLevel:(CGFloat)blur;



@end

NS_ASSUME_NONNULL_END
