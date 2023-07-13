import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

export default function AddMemberIcon() {
  return (
    <Svg width="70" height="70" viewBox="0 0 70 70" fill="none">
      <Circle
        cx="35"
        cy="35"
        r="34.5"
        stroke="#CFD3D2"
        stroke-linecap="square"
        strokeDasharray="7 7"
      />
      <Path
        d="M35 28V42"
        stroke="#CFD3D2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M28 35H42"
        stroke="#CFD3D2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
