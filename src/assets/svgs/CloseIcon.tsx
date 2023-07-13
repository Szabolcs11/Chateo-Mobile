import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color?: string;
};

export default function CloseIcon({color}: Props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 7.00006L7 17M17 16.9999L7 7"
        stroke={color ? color : '#000E08'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
