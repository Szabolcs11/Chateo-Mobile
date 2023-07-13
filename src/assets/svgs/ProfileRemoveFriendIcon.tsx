import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';

type Props = {
  color: string;
  backgroundColor: string;
};

export default function ProfileRemoveFriendIcon(props: Props) {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Circle cx="22" cy="22" r="22" fill={props.backgroundColor} />
      <Ellipse
        cx="20"
        cy="27.5"
        rx="7"
        ry="3.5"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Circle
        cx="20"
        cy="17"
        r="4"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        d="M31 21H27"
        stroke={props.color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
