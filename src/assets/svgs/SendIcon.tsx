import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function SendIcon() {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.23977 4.62665L20.8379 11.9239C21.2456 12.1276 21.5032 12.5442 21.5032 13C21.5032 13.4558 21.2456 13.8724 20.8379 14.0761L6.23977 21.3733C5.81675 21.5849 5.30903 21.5291 4.94212 21.2306C4.57521 20.9321 4.41715 20.4464 4.53814 19.9892L6.38939 13L4.53814 6.01079C4.41715 5.55356 4.57521 5.06785 4.94212 4.7694C5.30903 4.47094 5.81675 4.41509 6.23977 4.62665Z"
        fill="white"
      />
      <Path
        d="M11.8828 13.0001H6.38965"
        stroke="#20A090"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
