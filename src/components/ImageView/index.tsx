import React, { memo } from 'react';
import { Image, View, ImageBackground } from 'react-native';
import colours from '@src/utils/colours';
import FastImage from 'react-native-fast-image';
import { imageSource } from '@src/utils/images';

interface ImageViewIProps {
  name?: string;
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
  background?: boolean;
  remoteAssetFullUri?: string;
}

const ImageView = ({
  name,
  style,
  resizeMode = 'cover',
  background = false,
  remoteAssetFullUri,
  ...rest
}: ImageViewIProps) => {
  if (remoteAssetFullUri && remoteAssetFullUri?.length > 0) {
    return <FastImage style={style} resizeMode={resizeMode || 'cover'} source={{ uri: remoteAssetFullUri }} />;
  }

  const source = name && imageSource(name);
  return source !== undefined && source !== null ? (
    background ? (
      <ImageBackground source={source} style={style} resizeMode={resizeMode || 'cover'} {...rest} />
    ) : (
      <Image source={source} style={style} resizeMode={resizeMode || 'cover'} {...rest} />
    )
  ) : (
    <View style={style} {...rest} />
  );
};

// export default memo(ImageView, (prev, next) => {
//   const memoize = next && prev.name === next.name && prev.resizeMode === next.resizeMode;
//   return memoize;
// });

export default ImageView;
