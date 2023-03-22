import {View, Text} from 'react-native';
import React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {palette} from '../../style';

type Props = {
  selected: boolean;
};

export default function SettingsIcon({selected}: Props) {
  return (
    <Svg width="26" height="26" viewBox="0 0 26 26" fill="none">
      <Path
        d="M13.9189 4.33331H12.0805C11.0652 4.33331 10.2421 5.10935 10.2421 6.06665C10.2421 7.16212 9.06998 7.8586 8.10782 7.33484L8.01009 7.28164C7.1308 6.80299 6.00646 7.08704 5.4988 7.91608L4.57961 9.4172C4.07195 10.2462 4.37322 11.3063 5.2525 11.785C6.21512 12.309 6.21512 13.691 5.2525 14.215C4.37321 14.6936 4.07195 15.7537 4.5796 16.5828L5.4988 18.0839C6.00646 18.9129 7.1308 19.197 8.01009 18.7183L8.10782 18.6651C9.06997 18.1414 10.2421 18.8378 10.2421 19.9333C10.2421 20.8906 11.0652 21.6666 12.0805 21.6666H13.9189C14.9342 21.6666 15.7573 20.8906 15.7573 19.9333C15.7573 18.8378 16.9294 18.1414 17.8915 18.6651L17.9892 18.7183C18.8685 19.197 19.9929 18.9129 20.5005 18.0839L21.4197 16.5828C21.9274 15.7537 21.6261 14.6936 20.7468 14.215C19.7842 13.691 19.7842 12.309 20.7468 11.785C21.6261 11.3063 21.9274 10.2462 21.4197 9.41721L20.5005 7.9161C19.9929 7.08706 18.8685 6.80301 17.9892 7.28165L17.8915 7.33485C16.9294 7.85861 15.7573 7.16213 15.7573 6.06665C15.7573 5.10935 14.9342 4.33331 13.9189 4.33331Z"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <Circle
        cx="13"
        cy="13"
        r="3.25"
        stroke={selected ? palette.primary : palette.black}
        strokeWidth="2"
      />
    </Svg>
  );
}