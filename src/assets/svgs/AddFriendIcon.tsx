import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';

type Props = {
  color: string;
};

export default function AddFriendIcon({color}: Props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Ellipse
        cx="10"
        cy="17.5"
        rx="7"
        ry="3.5"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Circle
        cx="10"
        cy="7"
        r="4"
        stroke={color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M21 11H17"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M19 9L19 13"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
