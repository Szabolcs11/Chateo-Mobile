import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {UserType} from '../types';
import {LargeBlackText, palette, spacing} from '../style';
import axios from 'axios';
import {apiendpoints} from '../constans';
import AddFriendIcon from '../assets/svgs/AddFriendIcon';
import ProfileRemoveFriendIcon from '../assets/svgs/ProfileRemoveFriendIcon';
import {showToast} from '../navigation/toast';
import {getChats, getOnlineUsers} from '../pages/TabScreens/Message';
import {getContacts} from '../pages/TabScreens/Contacts';

type AccuntSettingsType = {
  user: UserType;
};

type FriendRequestType = {
  accepted: boolean;
  id: number;
};

export default function FriendRequestsSettings(props: AccuntSettingsType) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pendingFriendRequests, setPendingFriendRequests] = useState<
    UserType[] | []
  >([]);

  useEffect(() => {
    axios
      .post(apiendpoints.getincomingfriendrequest, {
        myid: props.user.id,
      })
      .then(res => {
        if (res.data.succes) {
          setPendingFriendRequests(res.data.users);
        }
      })
      .catch(error => {
        showToast('error', 'Error', 'Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleAddFriend = (data: FriendRequestType) => {
    axios
      .post(apiendpoints.handlefriendrequest, {
        myid: props.user.id,
        data: data,
      })
      .then(res => {
        if (res.data.succes) {
          showToast('success', 'success', res.data.message);
          let temp = pendingFriendRequests;
          temp = temp.filter((item: UserType) => item.id != data.id);
          setPendingFriendRequests(temp);
          if (getOnlineUsers) {
            getOnlineUsers();
          }
          if (getChats) {
            getChats();
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

  if (pendingFriendRequests == null || pendingFriendRequests.length == 0) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={LargeBlackText}>No pending friend requests</Text>
      </View>
    );
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{width: '100%', marginTop: spacing.double}}
      contentContainerStyle={{alignItems: 'center'}}>
      {pendingFriendRequests.map((user, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={{
              width: '100%',
              //   backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: spacing.single,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.single,
              }}>
              <View
                style={{
                  width: spacing.sixfoldhalf,
                  height: spacing.sixfoldhalf,
                }}>
                <Image
                  source={{uri: apiendpoints.profileimg + user.AvatarURL}}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: spacing.sixfold,
                  }}
                />
              </View>
              <Text>{user.FullName}</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: spacing.single,
              }}>
              <TouchableOpacity
                onPress={() => handleAddFriend({accepted: true, id: user.id})}>
                <AddFriendIcon color={palette.primary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleAddFriend({accepted: false, id: user.id})}>
                <ProfileRemoveFriendIcon
                  color={palette.red}
                  backgroundColor={palette.white}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
