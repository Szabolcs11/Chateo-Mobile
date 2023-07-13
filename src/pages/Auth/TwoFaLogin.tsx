import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  AuthContainer,
  fontSize,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
  palette,
  spacing,
} from '../../style';
import {navigationRef} from '../../navigation/settings';
import BackIcon from '../../assets/svgs/BackIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList} from '../../types';
import {handleVerifyTwoFaCode} from '../../navigation';

export default function TwoFaLogin({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'TwoFaLogin'>) {
  const [code, setCode] = useState('');

  return (
    <View style={[AuthContainer, {backgroundColor: palette.white}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          // top: spacing.double,
          // left: spacing.double,
          top: 0,
          left: 0,
          padding: spacing.double,
        }}>
        <BackIcon color={palette.black} />
      </TouchableOpacity>
      <View
        style={{
          alignItems: 'center',
          width: '100%',
          marginTop: spacing.quadruple,
          height: '100%',
        }}>
        <View style={{position: 'relative'}}>
          <View
            style={{
              position: 'absolute',
              height: 8,
              bottom: 0,
              right: -2,
              width: spacing.quintuplehalf,
              backgroundColor: palette.paleprimary,
            }}></View>
          <Text
            style={{
              fontSize: fontSize.mmedium,
              color: palette.black,
              fontWeight: '600',
            }}>
            Enter 2FA Code
          </Text>
        </View>
        <View
          style={{
            marginTop: spacing.double,
            width: '100%',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              width: '80%',
              fontSize: fontSize.ssmall,
              lineHeight: spacing.double,
            }}>
            Welcome back! Enter your Two Factor Authentication code to Login!
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <View style={InputContainer}>
            <Text style={[InputLabel, {color: palette.primary}]}>
              Your code
            </Text>
            <TextInput
              onChangeText={text => setCode(text)}
              secureTextEntry={true}
              style={[InputStyle, {borderBottomColor: palette.gray}]}
            />
          </View>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity
            onPress={() => handleVerifyTwoFaCode(route.params.Token, code)}
            style={[
              LandingPageButton,
              {
                backgroundColor: palette.primary,
                marginVertical: spacing.double,
              },
            ]}>
            <Text style={[LandingPageButtonText, {color: palette.white}]}>
              Verify code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
