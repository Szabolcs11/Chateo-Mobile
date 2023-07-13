import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function SmallPlusIcon() {
  return (
    <Svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <Path
        d="M5 2.08337V7.91671"
        stroke="#362F34"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M2.08301 5H7.91634"
        stroke="#362F34"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
