import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {UserType} from '../types';
import {apiendpoints} from '../constans';
import {
  fontSize,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
  palette,
  SmallGrayText,
  spacing,
} from '../style';
import {launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
import {showToast} from '../navigation/toast';
import {changeUserStorage} from '../navigation';
import {settingsUserDataChanged} from '../pages/TabScreens/Settings';

type AccuntSettingsType = {
  user: UserType;
};

export default function AccountSettings(props: AccuntSettingsType) {
  const [avatarURL, setAvatarURL] = useState<string>(
    apiendpoints.profileimg + props.user.AvatarURL,
  );
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const scrollViewRef = useRef(null);

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

  const handleTextInputFocus = (value: number) => {
    setTimeout(() => {
      if (value == 0) {
        // @ts-ignore // Neds to fix later
        scrollViewRef.current.scrollToEnd({animated: true});
      } else {
        // @ts-ignore // Neds to fix later
        scrollViewRef.current.scrollTo({y: value, animated: true});
      }
    }, 100);
  };

  const handleAvatarChange = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      // maxHeight: 1000,
      // maxWidth: 1000,
    });
    if (!result.didCancel) {
      const data = new FormData();
      data.append('file', {
        uri: result.assets![0].uri,
        name: result.assets![0].fileName,
        type: 'image/jpg',
      });
      axios
        .post(apiendpoints.upploadimage, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          if (res.data.succes) {
            axios
              .post(apiendpoints.changeuseravatar, {
                myid: props.user.id,
                avatarurl: res.data.file,
              })
              .then(result => {
                if (result.data.succes) {
                  setAvatarURL(apiendpoints.profileimg + res.data.file);
                  let user = props.user;
                  user.AvatarURL = res.data.file;
                  settingsUserDataChanged(user);
                  changeUserStorage(user);
                  showToast('success', 'success', result.data.message);
                } else {
                  showToast('error', 'error', result.data.message);
                }
              });
          } else {
            showToast('error', 'error', res.data.message);
          }
        })
        .catch(err => {
          showToast('error', 'error', 'Error during upploading image');
        });
    }
  };

  const handleChangePassword = () => {
    if (currentPassword && newPassword && confirmPassword) {
      if (newPassword == confirmPassword) {
        axios
          .post(apiendpoints.changepassword, {
            myid: props.user.id,
            currpass: currentPassword,
            newpass: newPassword,
            newpassagn: confirmPassword,
          })
          .then(res => {
            if (res.data.succes) {
              showToast('success', 'success', res.data.message);
              changeUserStorage(null);
            } else {
              showToast('error', 'error', res.data.message);
            }
          })
          .catch(err => {
            showToast('error', 'error', 'Error during changing password');
          });
      } else {
        showToast('error', 'error', 'New Passwords are not the same');
      }
    } else {
      showToast('error', 'error', 'Please fill all fields');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
      style={{flex: 1}}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
        }}
        style={{
          width: '100%',
          paddingVertical: spacing.double,
        }}>
        <TouchableOpacity
          onPress={() => handleAvatarChange()}
          style={{width: 125, height: 125}}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 100}}
            source={{uri: avatarURL}}
          />
        </TouchableOpacity>
        <View style={{marginVertical: spacing.single}}>
          <Text style={{fontSize: fontSize.ssmall, color: palette.gray}}>
            Click the Avatar to change it
          </Text>
        </View>
        <View style={{width: '100%'}}>
          <View style={InputContainer}>
            <Text style={[InputLabel, {color: palette.primary}]}>
              Current Password
            </Text>
            <TextInput
              onFocus={() => handleTextInputFocus(100)}
              onChangeText={text => setCurrentPassword(text)}
              style={[InputStyle, {borderBottomColor: palette.gray}]}
              secureTextEntry={true}
            />
          </View>
          <View style={InputContainer}>
            <Text style={[InputLabel, {color: palette.primary}]}>
              New Password
            </Text>
            <TextInput
              onFocus={() => handleTextInputFocus(200)}
              onChangeText={text => setNewPassword(text)}
              style={[InputStyle, {borderBottomColor: palette.gray}]}
              secureTextEntry={true}
            />
          </View>
          <View style={InputContainer}>
            <Text style={[InputLabel, {color: palette.primary}]}>
              New Password Again
            </Text>
            <TextInput
              onFocus={() => handleTextInputFocus(0)}
              onChangeText={text => setConfirmPassword(text)}
              style={[InputStyle, {borderBottomColor: palette.gray}]}
              secureTextEntry={true}
            />
          </View>
        </View>
        <TouchableOpacity
          style={[
            LandingPageButton,
            {
              backgroundColor: palette.primary,
              marginVertical: spacing.double,
              //   marginBottom: spacing.triple,
              marginBottom: isKeyboardVisible ? 100 : spacing.triple,
            },
          ]}
          onPress={() => {
            handleChangePassword();
          }}>
          <Text style={[LandingPageButtonText, {color: palette.white}]}>
            Change Password
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
