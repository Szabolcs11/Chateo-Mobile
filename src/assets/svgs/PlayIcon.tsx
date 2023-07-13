import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';

export default function PlayIcon() {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Circle cx="11" cy="11" r="11" fill="white" />
      <Path
        d="M15.6278 12.7365L9.99228 15.9568C8.65896 16.7187 7 15.756 7 14.2203V11V7.7797C7 6.24405 8.65896 5.28132 9.99228 6.04321L15.6278 9.26352C16.9714 10.0313 16.9714 11.9687 15.6278 12.7365Z"
        fill="#20A090"
      />
    </Svg>
  );
}
