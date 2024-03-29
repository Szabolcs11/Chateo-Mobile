import {View, Text} from 'react-native';
import React from 'react';
import {Circle, Ellipse, Path, Svg} from 'react-native-svg';

export default function CreateGroupIcon() {
  return (
    <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <Circle cx="32" cy="32" r="32" fill="#20A090" />
      <Ellipse
        cx="29.3333"
        cy="39.3334"
        rx="9.33333"
        ry="4.66667"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Circle
        cx="29.3333"
        cy="25.3333"
        r="5.33333"
        stroke="white"
        stroke-width="1.5"
        stroke-linejoin="round"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M35.892 29.9149C35.5525 30.3999 35.1607 30.8456 34.7246 31.2436C35.1304 31.3564 35.558 31.4167 35.9996 31.4167C38.623 31.4167 40.7496 29.29 40.7496 26.6667C40.7496 24.2417 38.9325 22.2412 36.5856 21.9525C36.8326 22.4815 37.0234 23.042 37.1505 23.6263C38.3774 24.091 39.2496 25.2769 39.2496 26.6667C39.2496 28.4616 37.7946 29.9167 35.9996 29.9167C35.9636 29.9167 35.9277 29.9161 35.892 29.9149Z"
        fill="white"
      />
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M41.3193 39.6848C41.2724 40.2927 41.1043 40.8813 40.8295 41.4416C41.2254 41.3248 41.5985 41.1936 41.9448 41.0493C42.723 40.7251 43.4016 40.32 43.8972 39.8318C44.3954 39.341 44.7495 38.7215 44.7495 38C44.7495 37.2785 44.3954 36.659 43.8972 36.1682C43.4016 35.68 42.723 35.2749 41.9448 34.9507C40.7401 34.4487 39.2113 34.1052 37.5254 33.9749C38.4767 34.5183 39.2833 35.1553 39.9057 35.8618C40.4446 35.9954 40.9357 36.1552 41.3679 36.3353C42.0375 36.6143 42.5305 36.9274 42.8445 37.2368C43.1559 37.5436 43.2495 37.801 43.2495 38C43.2495 38.199 43.1559 38.4564 42.8445 38.7632C42.5305 39.0726 42.0375 39.3857 41.3679 39.6647C41.3518 39.6714 41.3356 39.6781 41.3193 39.6848Z"
        fill="white"
      />
      <Path
        d="M47 32H43"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <Path
        d="M45 30L45 34"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </Svg>
  );
}
