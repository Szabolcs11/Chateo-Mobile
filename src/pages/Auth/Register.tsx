import {
  View,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
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
import axios from 'axios';
import {apiendpoints, apiurl} from '../../constans';
import {showToast} from '../../navigation/toast';
import {handleRegister} from '../../navigation';
import AppleIcon from '../../assets/svgs/AppleIcon';
import GoogleIcon from '../../assets/svgs/GoogleIcon';
import FacebookIcon from '../../assets/svgs/FacebookIcon';
import BackIcon from '../../assets/svgs/BackIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList} from '../../types';

const {width, height} = Dimensions.get('window');

export default function Register({
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'Register'>) {
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmpassword, setConfirmPassword] = useState<string>('');

  const handlePreRegister = () => {
    if (
      fullName === '' ||
      email === '' ||
      password === '' ||
      confirmpassword === ''
    ) {
      showToast('error', 'Error', 'Please fill all fields');
      return;
    }
    if (email.includes('@') === false) {
      showToast('error', 'Error', 'Please enter a valid email!');
      return;
    }
    if (password.length < 8) {
      showToast(
        'error',
        'Error',
        'Password must be at least 8 characters long!',
      );
      return;
    }
    if (hasNumber(password) === false) {
      showToast('error', 'Error', 'Password must contain at least one number!');
      return;
    }
    if (password !== confirmpassword) {
      showToast('error', 'Error', 'Passwords do not match!');
      return;
    }
    handleRegister({
      FullName: fullName,
      Email: email,
      Password: password,
      ConfirmPassword: confirmpassword,
    });
  };

  const hasNumber = (myString: string) => {
    return /\d/.test(myString);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        AuthContainer,
        // {backgroundColor: palette.white, height: undefined},
        {backgroundColor: palette.white},
      ]}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          position: 'absolute',
          // left: spacing.double,
          top: 0,
          left: 0,
          // top: spacing.double,
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
        <View>
          <View style={{position: 'relative'}}>
            <View
              style={{
                position: 'absolute',
                height: 8,
                right: 0,
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
              Sign up with Email
            </Text>
          </View>
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
            Get chatting with friends and family today by signing up for our
            chat app!
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            marginTop: spacing.quadruple,
            // backgroundColor: 'red',
          }}>
          <View style={InputContainer}>
            <Text style={InputLabel}>Your name</Text>
            <TextInput
              onChangeText={text => setFullName(text)}
              style={InputStyle}
            />
          </View>
          <View style={InputContainer}>
            <Text style={InputLabel}>Your email</Text>
            <TextInput
              onChangeText={text => setEmail(text)}
              style={InputStyle}
            />
          </View>
          <View style={InputContainer}>
            <Text style={InputLabel}>Password</Text>
            <TextInput
              onChangeText={text => setPassword(text)}
              secureTextEntry={true}
              style={InputStyle}
            />
          </View>
          <View style={InputContainer}>
            <Text style={InputLabel}>Confirm Password</Text>
            <TextInput
              onChangeText={text => setConfirmPassword(text)}
              secureTextEntry={true}
              style={InputStyle}
            />
          </View>
        </View>
        <View
          style={{
            width: '100%',
            // position: 'absolute',
            // bottom: 65,
          }}>
          <TouchableOpacity
            style={[
              LandingPageButton,
              {
                backgroundColor: palette.primary,
                marginVertical: spacing.double,
                marginBottom: spacing.double,
              },
            ]}
            onPress={() => {
              handlePreRegister();
            }}>
            <Text style={[LandingPageButtonText, {color: palette.white}]}>
              Create an account
            </Text>
          </TouchableOpacity>
          <View style={{width: 100, height: 20}}>{/* <Text>asd</Text> */}</View>
        </View>
      </View>
    </ScrollView>
  );
}

{
  /* <View style={{width, height, backgroundColor: palette.black}}>
      <Text style={{color: palette.white}}>Register</Text>
      <TextInput
        placeholderTextColor={'white'}
        style={{color: 'white', borderColor: 'white', borderWidth: 1}}
        placeholder="Username"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        placeholderTextColor={'white'}
        style={{color: 'white', borderColor: 'white', borderWidth: 1}}
        placeholder="Email"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholderTextColor={'white'}
        style={{color: 'white', borderColor: 'white', borderWidth: 1}}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry={true}
      />
      <TouchableOpacity
        onPress={() => handlePreRegister()}
        style={{
          alignItems: 'center',
          backgroundColor: palette.primary,
          margin: 20,
          padding: 5,
        }}>
        <Text style={{color: 'white'}}>Register</Text>
      </TouchableOpacity>
    </View> */
}
