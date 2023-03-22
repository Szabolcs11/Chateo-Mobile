import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {handleEnableTwoFa} from './TwofaSettings';
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

export default function TwoFaTurnedOff() {
  const [code, setCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');
  const [qrocdeUrl, setQrCodeUrl] = useState<string>('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const func = async () => {
      const res = await axios.get(apiendpoints.generateqrcode);
      setQrCodeUrl(res.data.qrcodedeurl);
      setSecret(res.data.seecret);
    };
    func();
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleTextInputFocus = () => {
    setTimeout(() => {
      // @ts-ignore // Neds to fix later
      //   scrollViewRef.current.scrollTo({y: value, animated: true});
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 100);
  };

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    //   keyboardVerticalOffset={100}
    //   style={{flex: 1}}>
    <ScrollView
      ref={scrollViewRef}
      showsVerticalScrollIndicator={false}
      style={{paddingVertical: spacing.double}}>
      <View style={{alignItems: 'center'}}>
        <Text
          style={{
            fontSize: fontSize.ssmall,
            color: palette.gray,
            textAlign: 'center',
          }}>
          To enable Two Factor Authentication Scan This QR code with your phone
          and enter the code
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          marginVertical: spacing.double,
        }}>
        <View
          style={{
            width: 170,
            height: 170,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{uri: qrocdeUrl}}
            style={{width: '100%', height: '100%'}}
          />
        </View>
      </View>
      <View>
        <View style={InputContainer}>
          <Text style={[InputLabel, {color: palette.primary}]}>
            Current Code
          </Text>
          <TextInput
            onFocus={() => handleTextInputFocus()}
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
              marginBottom: isKeyboardVisible
                ? spacing.eightfold + spacing.double
                : spacing.double,
            },
          ]}
          onPress={() => {
            handleEnableTwoFa(code, secret);
          }}>
          <Text style={[LandingPageButtonText, {color: palette.white}]}>
            Enable Two Factor Authentication
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
