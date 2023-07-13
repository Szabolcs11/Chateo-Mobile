import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

type Props = {
  color: string;
};

export default function SearchIcon({color}: Props) {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Path
        d="M16.958 16.9584L20.1663 20.1667M19.2497 10.5417C19.2497 5.73223 15.3508 1.83337 10.5413 1.83337C5.73186 1.83337 1.83301 5.73223 1.83301 10.5417C1.83301 15.3512 5.73186 19.25 10.5413 19.25C15.3508 19.25 19.2497 15.3512 19.2497 10.5417Z"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
