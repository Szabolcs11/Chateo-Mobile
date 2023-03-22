import {View, Text} from 'react-native';
import React from 'react';
import {Circle, ClipPath, Defs, G, Path, Rect, Svg} from 'react-native-svg';

export default function LogoutIcon() {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Circle cx="22" cy="22" r="22" fill="#F2F8F7" />
      <G clip-path="url(#clip0_774_1958)">
        <Path
          d="M24 18V16C24 15.4696 23.7893 14.9609 23.4142 14.5858C23.0391 14.2107 22.5304 14 22 14H15C14.4696 14 13.9609 14.2107 13.5858 14.5858C13.2107 14.9609 13 15.4696 13 16V28C13 28.5304 13.2107 29.0391 13.5858 29.4142C13.9609 29.7893 14.4696 30 15 30H22C22.5304 30 23.0391 29.7893 23.4142 29.4142C23.7893 29.0391 24 28.5304 24 28V26"
          stroke="#797C7B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <Path
          d="M17 22H31M31 22L28 19M31 22L28 25"
          stroke="#797C7B"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_774_1958">
          <Rect
            width="24"
            height="24"
            fill="white"
            transform="translate(10 10)"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
