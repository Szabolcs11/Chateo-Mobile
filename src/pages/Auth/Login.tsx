import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AppleIcon from '../../assets/svgs/AppleIcon';
import BackIcon from '../../assets/svgs/BackIcon';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import {handleLogin} from '../../navigation';
import {navigate} from '../../navigation/settings';
import {showToast} from '../../navigation/toast';
import {
  AuthContainer,
  fontSize,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
  LandingPageOrLine,
  LandingPageOrLineContainer,
  LandingPageOrText,
  LoginWithSocialContainer,
  palette,
  spacing,
} from '../../style';
import {StackNavigatorParamsList} from '../../types';

import {
  GoogleSigninButton,
  GoogleSignin,
  statusCodes,
  NativeModuleError,
} from '@react-native-google-signin/google-signin';

const {width, height} = Dimensions.get('window');

export default function Login({
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'Login'>) {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  // useEffect(() => {
  //   console.log('username', username);
  //   if (username != null) {
  //     if (username.length < 5) {
  //       setUsernameError('Must be at least 5 characters');
  //     } else {
  //       setUsernameError('');
  //     }
  //   }
  // }, [username]);

  // useEffect(() => {
  //   if (password != null) {
  //     if (password.length < 5) {
  //       setPasswordError('Must be at least 5 characters');
  //     } else {
  //       setPasswordError('');
  //     }
  //   }
  // }, [password]);

  const handlePreLogin = () => {
    if (email == null || password == null || email == '' || password == '') {
      showToast('error', 'Error', 'Please fill all fields');
      return;
    }
    handleLogin({Email: email!, Password: password!});
  };

  const handleFacebookLogin = () => {
    console.log('fblogin');
  };

  const handleGoogleSignIn = async () => {
    GoogleSignin.configure({
      webClientId:
        '430482036483-ripkbbensp6nhg1fao80fmo16bre0sj7.apps.googleusercontent.com',
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      // this.setState({userInfo, error: undefined});
    } catch (error) {
      console.log('error', error);
      const typedError = error as NativeModuleError;

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.log('Cancelled');
          // sign in was cancelled
          // Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          console.log('in progress');
          // operation (eg. sign in) already in progress
          // Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log('play services not available');
          // android only
          // Alert.alert('play services not available or outdated');
          break;
        default:
          console.log('default', typedError.toString());
        // Alert.alert('Something went wrong', typedError.toString());
        // this.setState({
        //   error: typedError,
        // });
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[AuthContainer, {backgroundColor: palette.white}]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          // left: spacing.single,
          left: 0,
          // top: spacing.single,
          top: 0,
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
              width: spacing.sixfold,
              backgroundColor: palette.paleprimary,
            }}></View>
          <Text
            style={{
              fontSize: fontSize.mmedium,
              color: palette.black,
              fontWeight: '600',
            }}>
            Log in to Chateo
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
            {/* Welcome back! Sign in using your email to continue us */}
            Welcome back! Sign in using your social account or email to continue
            us
          </Text>
        </View>
        {/* <View>
          <GoogleSigninButton onPress={() => handleGoogleSignIn()} />
        </View> */}
        {/* <View style={LoginWithSocialContainer}> */}
        {/* <TouchableOpacity onPress={() => handleFacebookLogin()}>
            <FacebookIcon />
          </TouchableOpacity> */}
        {/* <TouchableOpacity>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity>
            <AppleIcon />
          </TouchableOpacity> */}
        {/* </View> */}
        {/* <View style={LandingPageOrLineContainer}>
          <View style={LandingPageOrLine}></View>
          <View>
            <Text style={LandingPageOrText}>OR</Text>
          </View>
          <View style={LandingPageOrLine}></View>
        </View> */}
        <View style={{width: '100%'}}>
          <View style={InputContainer}>
            <Text
              style={[
                InputLabel,
                {color: emailError ? palette.red : palette.primary},
              ]}>
              Your email
            </Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              style={[
                InputStyle,
                {borderBottomColor: emailError ? palette.red : palette.gray},
              ]}
            />
            {emailError && !Keyboard.isVisible() ? (
              <View style={{marginVertical: spacing.single}}>
                <Text style={{textAlign: 'right', color: palette.red}}>
                  {emailError}
                </Text>
              </View>
            ) : null}
          </View>
          <View style={InputContainer}>
            <Text
              style={[
                InputLabel,
                {color: passwordError ? palette.red : palette.primary},
              ]}>
              Password
            </Text>
            <TextInput
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={[
                InputStyle,
                {borderBottomColor: passwordError ? palette.red : palette.gray},
              ]}
            />
            {passwordError ? (
              <View style={{marginVertical: spacing.single}}>
                <Text style={{textAlign: 'right', color: palette.red}}>
                  {passwordError}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 65,
            // backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={[
              LandingPageButton,
              {
                backgroundColor: palette.primary,
                marginVertical: spacing.double,
              },
            ]}
            onPress={() => {
              handlePreLogin();
            }}>
            <Text style={[LandingPageButtonText, {color: palette.white}]}>
              Log in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: palette.primary,
                fontWeight: '500',
                fontSize: fontSize.ssmall,
              }}>
              Forgot password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
