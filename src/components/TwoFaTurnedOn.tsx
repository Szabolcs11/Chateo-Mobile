import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  fontSize,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
  palette,
  spacing,
} from '../style';
import axios from 'axios';
import {apiendpoints} from '../constans';
import {UserType} from '../types';
import {handleDisableTwoFa} from './TwofaSettings';

export default function TwoFaTurnedOn() {
  const [code, setCode] = useState<string>('');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{paddingVertical: spacing.double}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: fontSize.ssmall,
            color: palette.gray,
            textAlign: 'center',
          }}>
          To disable Two Factor Authentication enter the current code
        </Text>
      </View>
      <View>
        <View style={InputContainer}>
          <Text style={[InputLabel, {color: palette.primary}]}>
            Current Code
          </Text>
          <TextInput
            onChangeText={text => setCode(text)}
            style={[InputStyle, {borderBottomColor: palette.gray}]}
          />
        </View>
        <TouchableOpacity
          style={[
            LandingPageButton,
            {
              backgroundColor: palette.primary,
              marginVertical: spacing.double,
              marginBottom: spacing.triple,
            },
          ]}
          onPress={() => {
            handleDisableTwoFa(code);
          }}>
          <Text style={[LandingPageButtonText, {color: palette.white}]}>
            Disable Two Factor Authentication
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
