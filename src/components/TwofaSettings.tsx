import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {UserType} from '../types';
import axios from 'axios';
import {apiendpoints} from '../constans';
import {
  palette,
  fontSize,
  spacing,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
} from '../style';
import {showToast} from '../navigation/toast';
import {changeUserStorage} from '../navigation';
import TwoFaTurnedOn from './TwoFaTurnedOn';
import TwoFaTurnedOff from './TwoFaTurnedOff';
type AccuntSettingsType = {
  user: UserType;
};

export let handleDisableTwoFa: (code: string) => void;
export let handleEnableTwoFa: (code: string, secret: string) => void;

export default function TwofaSettings(props: AccuntSettingsType) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [turnedOn, setTurnOn] = useState<boolean>(false);

  const [turnOffCode, setTurnOffCode] = useState<string>('');

  const [turnOnCode, setTurnOnCode] = useState<string>('');
  const [secret, setSecret] = useState<string>('');

  const scrollViewRef = useRef(null);

  useEffect(() => {
    axios
      .post(apiendpoints.gettwofastatus, {
        myid: props.user.id,
      })
      .then(res => {
        if (res.data.succes) {
          setTurnOn(res.data.secret);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  handleEnableTwoFa = (code: string, secret: string) => {
    if (code && secret) {
      axios
        .post(apiendpoints.turnontwofa, {
          key: turnOnCode,
          secret: secret,
          myid: props.user.id,
        })
        .then(res => {
          if (res.data.succes) {
            setTurnOn(true);
            showToast('success', 'Success', res.data.message);
          } else {
            showToast('error', 'Error', res.data.message);
          }
        });
    }
  };

  handleDisableTwoFa = (code: string) => {
    if (code) {
      axios
        .post(apiendpoints.turnofftwofa, {
          myid: props.user.id,
          key: code,
        })
        .then(res => {
          if (res.data.succes) {
            setTurnOn(false);
            showToast('success', 'Success', res.data.message);
            let temp = props.user;
            temp.Secret = '';
            changeUserStorage(temp);
          } else {
            showToast('error', 'Error', res.data.message);
          }
        })
        .catch(error => {
          showToast('error', 'Error', error || 'Something went wrong');
        });
    }
  };

  const handleTextInputFocus = () => {
    setTimeout(() => {
      // @ts-ignore // Neds to fix later
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 100);
  };

  if (isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size={'large'} color={palette.black} />
      </View>
    );
  }

  if (turnedOn) {
    return (
      <TwoFaTurnedOn />
      //   <ScrollView
      //     ref={scrollViewRef}
      //     showsVerticalScrollIndicator={false}
      //     style={{paddingVertical: spacing.double}}>
      //     <View style={{alignItems: 'center'}}>
      //       <Text
      //         style={{
      //           fontSize: fontSize.ssmall,
      //           color: palette.gray,
      //           textAlign: 'center',
      //         }}>
      //         To disable Two Factor Authentication enter the current code
      //       </Text>
      //     </View>
      //     <View>
      //       <View style={InputContainer}>
      //         <Text style={[InputLabel, {color: palette.primary}]}>
      //           Current Code
      //         </Text>
      //         <TextInput
      //           onFocus={() => handleTextInputFocus()}
      //           onChangeText={text => setTurnOffCode(text)}
      //           style={[InputStyle, {borderBottomColor: palette.gray}]}
      //         />
      //       </View>
      //       <TouchableOpacity
      //         style={[
      //           LandingPageButton,
      //           {
      //             backgroundColor: palette.primary,
      //             marginVertical: spacing.double,
      //             marginBottom: spacing.triple,
      //             //   marginBottom: isKeyboardVisible ? 100 : spacing.triple,
      //           },
      //         ]}
      //         onPress={() => {
      //           handleDisableTwoFa();
      //         }}>
      //         <Text style={[LandingPageButtonText, {color: palette.white}]}>
      //           Disable Two Factor Authentication
      //         </Text>
      //       </TouchableOpacity>
      //     </View>
      //   </ScrollView>
    );
  }

  if (!turnedOn) {
    return <TwoFaTurnedOff />;
  }

  return (
    <View>
      <Text>TwofaSettings</Text>
    </View>
  );
}
