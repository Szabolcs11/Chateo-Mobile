import {View, Text} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function MinusIcon() {
  return (
    <Svg width="16" height="2" viewBox="0 0 16 2" fill="none">
      <Path
        d="M15 1H1"
        stroke="#FF2D1B"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
