import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderSearch,
  ContainerHeaderTitle,
  fontSize,
  LargeBlackText,
  MediumBlackText,
  NotificationContainer,
  NotificationText,
  palette,
  RoundedImage,
  SettingsHeaderContainer,
  SmallGrayText,
  spacing,
} from '../../style';
import CloseIcon from '../../assets/svgs/CloseIcon';
import {TabNavigatorParamsList, UserType} from '../../types';
import {StackScreenProps} from '@react-navigation/stack';
import {apiendpoints} from '../../constans';
import AccountIcon from '../../assets/svgs/AccountIcon';
import SettingsTabComponent from '../../components/SettingsTabComponent';
import FriendsIcon from '../../assets/svgs/FriendsIcon';
import SecurityIcon from '../../assets/svgs/SecurityIcon';
import LogoutIcon from '../../assets/svgs/LogoutIcon';
import {handleLogout} from '../../navigation';
import {navigationRef} from '../../navigation/settings';
import AccountSettings from '../../components/AccountSettings';
import FriendRequestsSettings from '../../components/FriendRequestsSettings';
import TwofaSettings from '../../components/TwofaSettings';

export let settingsUserDataChanged: (user: UserType) => void;

export default function Settings({
  navigation,
  route,
}: StackScreenProps<TabNavigatorParamsList, 'Settings'>) {
  const [user, setUser] = useState(route.params?.user);
  const [avatarURL, setAvatarURL] = useState(
    apiendpoints.profileimg + user.AvatarURL,
  );
  settingsUserDataChanged = (user: UserType) => {
    setUser(user);
    setAvatarURL(apiendpoints.profileimg + user.AvatarURL);
  };

  return (
    <View style={Container}>
      <View style={[ContainerHeader, {zIndex: 1}]}>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
        <View style={{justifyContent: 'center'}}>
          <Text style={ContainerHeaderTitle}>Settings</Text>
        </View>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
      </View>
      {/* <View style={[ChatsContainer, {height: '77%'}]}> */}
      <View style={[ChatsContainer, {height: '82%'}]}>
        <View style={SettingsHeaderContainer}>
          <View style={{width: 60, height: 60}}>
            <Image style={RoundedImage} source={{uri: avatarURL}} />
          </View>
          <View style={{justifyContent: 'center'}}>
            <View>
              <Text style={LargeBlackText}>{user.FullName}</Text>
            </View>
            <View>
              <Text style={SmallGrayText}>{user.Email}</Text>
            </View>
          </View>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <SettingsTabComponent
            Icon={<AccountIcon />}
            Title="Account"
            Subtitle="Change Password, Avatar"
            callback={() => {
              navigationRef.current?.navigate('Modal', {
                content: () => <AccountSettings user={user} />,
                title: 'Account',
              });
            }}
          />
          <SettingsTabComponent
            Icon={<FriendsIcon />}
            Title="Friend requests"
            Subtitle="Watch friend requests"
            callback={() => {
              navigationRef.current?.navigate('Modal', {
                content: () => <FriendRequestsSettings user={user} />,
                title: 'Incoming Friend Requests',
              });
            }}
          />
          <SettingsTabComponent
            Icon={<SecurityIcon />}
            Title="Security"
            Subtitle="Manage Two Factor Verification"
            callback={() => {
              navigationRef.current?.navigate('Modal', {
                content: () => <TwofaSettings user={user} />,
                title: 'Security',
              });
            }}
          />
          <SettingsTabComponent
            Icon={<LogoutIcon />}
            Title="Logout"
            Subtitle=""
            callback={() => {
              handleLogout();
            }}
          />
        </ScrollView>
      </View>
    </View>
  );
}
