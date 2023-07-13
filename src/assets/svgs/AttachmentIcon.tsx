import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function AttachmentIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M13.8791 8.375L8.39309 13.861C7.56709 14.687 7.56709 16.027 8.39309 16.853V16.853C9.21909 17.679 10.5591 17.679 11.3851 16.853L18.6171 9.621C20.1321 8.106 20.1321 5.65 18.6171 4.135V4.135C17.1021 2.62 14.6461 2.62 13.1311 4.135L5.89909 11.367C3.69509 13.571 3.69509 17.143 5.89909 19.347V19.347C8.10309 21.551 11.6751 21.551 13.8791 19.347L18.2681 14.958"
        stroke="#0F0C22"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
