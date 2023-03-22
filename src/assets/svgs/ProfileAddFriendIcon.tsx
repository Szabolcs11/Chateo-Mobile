import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';

export default function ProfileAddFriendIcon() {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Circle cx="22" cy="22" r="22" fill="#051D13" />
      <Ellipse
        cx="20"
        cy="27.5"
        rx="7"
        ry="3.5"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Circle
        cx="20"
        cy="17"
        r="4"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M31 21H27"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M29 19L29 23"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
