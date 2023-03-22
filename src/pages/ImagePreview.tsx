import {View, Text, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import {palette, spacing} from '../style';
import {apiendpoints} from '../constans';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList} from '../types';
import BackIcon from '../assets/svgs/BackIcon';

const {width, height} = Dimensions.get('window');

export default function ImagePreview({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'ImagePreview'>) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: palette.gray,
        width: width,
        height: height,
        zIndex: 1,
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          padding: spacing.single,
          // backgroundColor: 'red',
          position: 'absolute',
          top: spacing.single,
          left: spacing.single,
          zIndex: 2,
        }}>
        <BackIcon color={palette.black} />
      </TouchableOpacity>
      <Image
        style={{resizeMode: 'contain', width: '100%', height: '100%'}}
        source={{uri: apiendpoints.profileimg + route.params.image}}
      />
    </View>
  );
}
