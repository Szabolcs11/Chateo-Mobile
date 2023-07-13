import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
import {navigate} from '../../navigation/settings';
import {
  AuthContainer,
  fontSize,
  LandingPageButton,
  LandingPageButtonText,
  LandingPageHeader,
  LandingPageOrLine,
  LandingPageOrLineContainer,
  LandingPageOrText,
  palette,
  spacing,
} from '../../style';
import SmallLogoIcon from '../../assets/svgs/SmallLogoIcon';

import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

export default function LandingPage() {
  return (
    <>
      <LinearGradient
        useAngle={true}
        // angle={270}
        angle={-134}
        colors={['#21988E', '#24786D', '#000000']}
        // start={{x: 0, y: 0}}
        // end={{x: 1, y: 1}}
        style={{
          position: 'absolute',
          width: width,
          height: height,
          // opacity: 0.5,
          // borderRadius: 10000,
          // transform: [{rotate: '-134deg'}],
        }}
      />
      {/* <LinearGradient
        colors={['#43116A', '#0A1832']}
        start={{x: 0, y: 0}}
        // end={{x: 1, y: 1}}
        style={{
          position: 'absolute',
          width: width,
          height: height,
          opacity: 0.5,
          // borderRadius: 10000,
          transform: [{rotate: '134deg'}],
        }}
      /> */}
      <View style={[AuthContainer, {backgroundColor: 'transparent'}]}>
        <View style={LandingPageHeader}>
          <SmallLogoIcon />
          <Text style={{color: palette.white}}>Chateo</Text>
        </View>
        <View style={{marginTop: spacing.quadruple, width: '100%'}}>
          <Text
            style={{
              color: palette.white,
              fontSize: 68,
              width: '90%',
            }}>
            Connect friends
            <Text style={{fontWeight: '600'}}>easily & quickly</Text>
          </Text>
        </View>
        <View
          style={{
            marginTop: spacing.double,
            width: '100%',
          }}>
          <Text
            style={{
              color: palette.gray,
              width: '95%',
              fontSize: fontSize.medium,
            }}>
            Our chat app is the perfect way to stay connected with friends and
            family
          </Text>
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            bottom: 50,
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}>
          {/* <View
          style={[
            LandingPageOrLineContainer,
            {marginVertical: spacing.triple},
          ]}>
          <View style={LandingPageOrLine}></View>
          <View>
            <Text style={LandingPageOrText}>OR</Text>
          </View>
          <View style={LandingPageOrLine}></View>
        </View> */}
          <TouchableOpacity
            style={LandingPageButton}
            onPress={() => navigate('Register', {})}>
            <Text style={LandingPageButtonText}>Sing up with email</Text>
          </TouchableOpacity>
          <View
            style={{
              marginTop: spacing.quadruple,
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <Text
              style={{
                color: palette.gray,
                fontWeight: '400',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              Existing account?{' '}
            </Text>
            <TouchableOpacity onPress={() => navigate('Login', {})}>
              <Text
                style={{
                  color: palette.white,
                  fontWeight: '500',
                }}>
                Log in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Text style>Chatbox</Text> */}
        {/* <TouchableOpacity
        onPress={() => navigate('Login', {})}
        style={{margin: 20, width: 150, height: 100, backgroundColor: 'blue'}}>
        <Text>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigate('Register', {})}
        style={{margin: 20, width: 150, height: 100, backgroundColor: 'green'}}>
        <Text>Register</Text>
      </TouchableOpacity> */}
      </View>
    </>
  );
}
