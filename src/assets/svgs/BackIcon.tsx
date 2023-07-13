import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color: string;
};

export default function BackIcon({color}: Props) {
  return (
    <Svg width="14" height="10" viewBox="0 0 14 10" fill="none">
      <Path
        d="M5 1L1 5M1 5L5 9M1 5L13 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
