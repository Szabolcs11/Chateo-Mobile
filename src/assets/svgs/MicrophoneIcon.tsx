import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path} from 'react-native-svg';

export default function MicrophoneIcon() {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 11V12C19 15.866 15.866 19 12 19M5 11V12C5 15.866 8.13401 19 12 19M12 19V22M12 22H15M12 22H9M12 16C9.79086 16 8 14.2091 8 12V6C8 3.79086 9.79086 2 12 2C14.2091 2 16 3.79086 16 6V12C16 14.2091 14.2091 16 12 16Z"
        stroke="#000E08"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
