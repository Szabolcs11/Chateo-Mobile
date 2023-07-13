import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Path, Svg} from 'react-native-svg';

export default function AccountIcon() {
  return (
    <Svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <Circle cx="22" cy="22" r="22" fill="#F2F8F7" />
      <Path
        d="M25.0312 19.342C25.0312 19.135 24.8633 18.968 24.6562 18.968C24.4492 18.969 24.2812 19.137 24.2812 19.344C24.2812 19.551 24.4492 19.719 24.6562 19.718C24.8633 19.718 25.0312 19.55 25.0312 19.343"
        stroke="#797C7B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M22.499 24.785L21.469 25.817H19.637V27.286H18.172V29.122L16.798 30.5H13.5V27.195L19.223 21.459C18.417 19.365 18.849 16.903 20.534 15.214C22.814 12.929 26.511 12.929 28.791 15.214C31.071 17.499 31.071 21.204 28.791 23.49C27.089 25.194 24.601 25.624 22.499 24.785Z"
        stroke="#797C7B"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
}
