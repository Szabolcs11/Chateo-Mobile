import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function GPlusIcon() {
  return (
    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <Path
        d="M15 8H1"
        stroke="#20A090"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M8 1L8 15"
        stroke="#20A090"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
