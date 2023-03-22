import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderSearch,
  fontSize,
  palette,
  spacing,
} from '../style';
import SearchIcon from '../assets/svgs/SearchIcon';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList, UserType} from '../types';
import BackIcon from '../assets/svgs/BackIcon';
import ProfileMessageIcon from '../assets/svgs/ProfileMessageIcon';
import ProfileRemoveFriendIcon from '../assets/svgs/ProfileRemoveFriendIcon';
import ProfileCallIcon from '../assets/svgs/ProfileCallIcon';
import ProfileAddFriendIcon from '../assets/svgs/ProfileAddFriendIcon';
import axios from 'axios';
import {apiendpoints} from '../constans';
import {showToast} from '../navigation/toast';
import {getChats, getOnlineUsers, openChate} from './TabScreens/Message';
import {getContacts} from './TabScreens/Contacts';
import {navigate, navigationRef} from '../navigation/settings';

const {width, height} = Dimensions.get('window');

export default function ViewProfile({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'ViewProfile'>) {
  const [isMyFriend, setIsMyFriend] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profile, setProfile] = useState<UserType>();

  useEffect(() => {
    axios
      .post(apiendpoints.getuser, {
        userid: route.params?.userID,
        myid: route.params.myUser?.id,
      })
      .then(res => {
        if (res.data.succes) {
          setProfile(res.data.user);
          setIsMyFriend(res.data.ismyfriend);
          setIsLoading(false);
        }
      });
  }, []);

  const handleSendFriendRequest = () => {
    axios
      .post(apiendpoints.sendfriendrequest, {
        myid: route.params.myUser?.id,
        targetid: route.params?.userID,
      })
      .then(res => {
        if (res.data.succes) {
          showToast('success', 'success', res.data.message);
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  const handleRemoveFriend = () => {
    axios
      .post(apiendpoints.removefriend, {
        myid: route.params.myUser?.id,
        partnerid: route.params?.userID,
      })
      .then(res => {
        if (res.data.succes) {
          showToast('success', 'success', res.data.message);
          setIsMyFriend(false);
          if (getChats) {
            getChats();
          }
          if (getOnlineUsers) {
            getOnlineUsers();
          }
          if (getContacts) {
            getContacts();
          }
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  if (isLoading) {
    return (
      <View style={Container}>
        <View
          style={[
            ContainerHeader,
            {justifyContent: 'center', alignItems: 'center', height: '35%'},
          ]}>
          <ActivityIndicator size={'large'} color={palette.black} />
        </View>
        <View
          style={[
            ChatsContainer,
            {
              height: '65%',
              position: 'absolute',
              bottom: 24,
              right: 0,
              justifyContent: 'center',
              alignItems: 'center',
            },
          ]}>
          <ActivityIndicator size={'large'} color={palette.black} />
        </View>
      </View>
    );
  }

  return (
    <View style={Container}>
      <View style={ContainerHeader}>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            marginTop: spacing.double,
            gap: spacing.double,
          }}>
          <TouchableOpacity
            // style={{position: 'absolute', left: 0}}
            style={{
              position: 'absolute',
              left: -spacing.double,
              padding: spacing.double,
            }}
            onPress={() => navigation.goBack()}>
            <BackIcon color={palette.white} />
          </TouchableOpacity>
          <View style={{width: 82, height: 82}}>
            <Image
              style={{width: '100%', height: '100%', borderRadius: 82}}
              source={{
                uri: apiendpoints.profileimg + profile?.AvatarURL,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: fontSize.xlarge,
              fontWeight: '600',
              color: palette.white,
            }}>
            {profile?.FullName}
          </Text>
          <View style={{flexDirection: 'row', gap: spacing.double}}>
            {isMyFriend ? (
              <>
                {/* @ts-ignore */}
                <TouchableOpacity
                  onPress={() => {
                    openChate(profile?.id || undefined);
                  }}>
                  <ProfileMessageIcon />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleRemoveFriend()}>
                  <ProfileRemoveFriendIcon
                    color={palette.white}
                    backgroundColor={palette.black}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <ProfileCallIcon
                    color={palette.white}
                    backgroundColor={palette.black}
                  />
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity onPress={() => handleSendFriendRequest()}>
                <ProfileAddFriendIcon />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
      <View
        style={[
          ChatsContainer,
          {
            // height: '65%',
            height: height > 610 ? '65%' : '55%',
            position: 'absolute',
            bottom: 24,
            right: 0,
          },
        ]}>
        <View>
          <View style={{marginVertical: spacing.single}}>
            <Text
              style={{
                fontSize: fontSize.ssmall,
                color: palette.gray,
                fontWeight: '400',
              }}>
              Display Name
            </Text>
            <Text
              style={{
                fontSize: fontSize.mmedium,
                color: palette.black,
                fontWeight: '500',
              }}>
              {profile?.FullName}
            </Text>
          </View>
          <View style={{marginVertical: spacing.single}}>
            <Text
              style={{
                fontSize: fontSize.ssmall,
                color: palette.gray,
                fontWeight: '400',
              }}>
              Email Address
            </Text>
            <Text
              style={{
                fontSize: fontSize.mmedium,
                color: palette.black,
                fontWeight: '500',
              }}>
              {profile?.Email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
