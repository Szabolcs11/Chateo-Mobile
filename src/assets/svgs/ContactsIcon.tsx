import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {palette} from '../../style';

type Props = {
  selected: boolean;
};

export default function ContactsIcon({selected}: Props) {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <Circle
        cx="13.0003"
        cy="13"
        r="10.8333"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Path
        d="M18.4163 18.4167C16.8115 17.0361 14.9648 16.25 12.9997 16.25C11.0346 16.25 9.18785 17.0361 7.58301 18.4167"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle
        cx="3.25"
        cy="3.25"
        r="3.25"
        transform="matrix(1 0 0 -1 9.75 13)"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
