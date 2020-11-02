import React, { useState, useMemo, memo, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import CachedImage from "react-native-fast-image";

const FastImage = memo(
  ({
    renderPlaceholder,
    renderErrorImage,
    imageStyle,
    ...otherProps
  }) => {
    const [isLoading, setLoading] = useState(true);
    const [isErrored, setIsErrored] = useState(false);


    const CachedImageMemoized = () => {
      return (
        <CachedImage
          {...otherProps}
          style={[imageStyle, styles.image]}
          onError={() => {
            setLoading(false);
            setIsErrored(true);
          }}
          onLoad={e => {
            setLoading(false);
          }}
        />
      );
    };

    return (
      <View style={imageStyle}>
        {isLoading && renderPlaceholder()}
        {isErrored && renderErrorImage()}
        {CachedImageMemoized()}
      </View>
    );
  }
);

FastImage.priority = CachedImage.priority;
FastImage.resizeMode = CachedImage.resizeMode;

FastImage.defaultProps = {
  renderPlaceholder: ()=>{},
  renderErrorImage: ()=>{},
  onError: ()=>{},
  onLoad: ()=>{},
  imageStyle: {}
  // Your imageStyle can look like:
  // imageStyle = {width: XYZ, height: XYZ}
};

const styles = StyleSheet.create({
  image: { position: "absolute", zIndex: -1 }
});

export default FastImage;