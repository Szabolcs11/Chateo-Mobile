import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  fontSize,
  MediumBlackText,
  NotificationContainer,
  NotificationText,
  SmallGrayText,
  spacing,
} from '../style';
import AccountIcon from '../assets/svgs/AccountIcon';
import {AccountTabComponentType} from '../types';

export default function SettingsTabComponent(props: AccountTabComponentType) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.callback();
      }}
      style={{
        flexDirection: 'row',
        paddingVertical: spacing.single,
        gap: spacing.single,
        alignItems: 'center',
      }}>
      <View>{props.Icon}</View>
      <View>
        <Text style={MediumBlackText}>{props.Title}</Text>
        {props.Subtitle != '' ? (
          <Text style={[SmallGrayText, {lineHeight: fontSize.medium}]}>
            {props.Subtitle}
          </Text>
        ) : null}
      </View>
      {props.Notification ? (
        <View style={NotificationContainer}>
          <Text style={NotificationText}>1</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
