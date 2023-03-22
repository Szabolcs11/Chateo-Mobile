import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';
import {palette} from '../../style';

type Props = {
  selected: boolean;
};

export default function MessageIcon({selected}: Props) {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M19.5031 15.7623C20.2939 14.354 20.75 12.7312 20.75 11C20.75 5.61475 16.3853 1.25 11 1.25C5.61475 1.25 1.25 5.61475 1.25 11C1.25 16.3853 5.61475 20.75 11 20.75C12.7312 20.75 14.354 20.2939 15.7623 19.5031L20.75 20.75L19.5031 15.7623Z"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.8085 11.3499C10.9147 11.2438 11.0858 11.2438 11.192 11.3499C11.2982 11.4561 11.2982 11.6273 11.192 11.7334C11.0858 11.8396 10.9147 11.8396 10.8085 11.7334C10.7034 11.6273 10.7034 11.4561 10.8085 11.3499"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.47451 11.3499C6.58068 11.2438 6.75184 11.2438 6.85801 11.3499C6.96418 11.4561 6.96418 11.6273 6.85801 11.7334C6.75184 11.8396 6.58068 11.8396 6.47451 11.7334C6.36943 11.6273 6.36943 11.4561 6.47451 11.3499"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.1415 11.3499C15.2477 11.2438 15.4188 11.2438 15.525 11.3499C15.6312 11.4561 15.6312 11.6273 15.525 11.7334C15.4188 11.8396 15.2477 11.8396 15.1415 11.7334C15.0364 11.6273 15.0364 11.4561 15.1415 11.3499"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
