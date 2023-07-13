import {View, Text} from 'react-native';
import React from 'react';
import Svg, {
  Path,
  Defs,
  LinearGradient,
  Ellipse,
  G,
  Stop,
} from 'react-native-svg';

export default function Boarding() {
  return (
    <Svg width="375" height="515" viewBox="0 0 375 515" fill="none">
      <G opacity="0.63" filter="url(#filter0_f_603_8805)">
        <Ellipse
          cx="228.953"
          cy="143.115"
          rx="288.654"
          ry="122.26"
          transform="rotate(134.23 228.953 143.115)"
          fill="url(#paint0_linear_603_8805)"
        />
      </G>
      <Defs>
        <filter
          id="filter0_f_603_8805"
          x="-138.683"
          y="-228.669"
          width="735.271"
          height="743.568"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="74"
            result="effect1_foregroundBlur_603_8805"
          />
        </filter>
        <LinearGradient
          id="paint0_linear_603_8805"
          x1="308.715"
          y1="127.731"
          x2="-100.812"
          y2="107.022"
          gradientUnits="userSpaceOnUse">
          <Stop stop-color="#43116A" />
          <Stop offset="1" stop-color="#0A1832" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}
