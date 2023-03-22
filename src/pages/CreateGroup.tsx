import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {StackNavigatorParamsList, UserType} from '../types';
import {
  ChatHeaderTitle,
  ContainerHeaderTitle,
  createGroupBackIcon,
  createGroupContainer,
  createGroupHeaderContainer,
  fontSize,
  InputContainer,
  InputLabel,
  InputStyle,
  LandingPageButton,
  LandingPageButtonText,
  ModalTitle,
  palette,
  spacing,
} from '../style';
import BackIcon from '../assets/svgs/BackIcon';
import {apiendpoints} from '../constans';
import AddMemberIcon from '../assets/svgs/AddMemberIcon';
import axios from 'axios';
import {navigate, navigationRef} from '../navigation/settings';
import AddGroupMembers from '../components/AddGroupMembers';
import {launchImageLibrary} from 'react-native-image-picker';
import {showToast} from '../navigation/toast';
import {getOnlineUsers, getChats} from './TabScreens/Message';

type ModifiedUserType = UserType & {
  isSelected?: boolean;
};

export default function CreateGroup({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'CreateGroup'>) {
  const [user, setUser] = useState<UserType>(route.params.myUser);
  const [groupAvatarURL, setGroupAvatarURL] = useState<string>(
    'DefaultGroupsCover.png',
  );
  const [groupName, setGroupName] = useState<string>('');
  const [allFriend, setAllFriend] = useState<ModifiedUserType[]>([]);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = () => {
    axios
      .post(apiendpoints.getallfriends, {
        myid: user.id,
      })
      .then(res => {
        if (res.data.succes) {
          setAllFriend(res.data.friends);
        }
      });
  };

  const handleChangeGroupAvatar = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
    });
    if (!result.didCancel) {
      if (!result.errorMessage) {
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
              setGroupAvatarURL(res.data.file);
              showToast('success', 'success', 'Succesful upploaded image');
            } else {
              showToast('error', 'error', 'Error during upploading image');
            }
          })
          .catch(err => {
            showToast('error', 'error', 'Error during upploading image');
          });
      } else {
        showToast('error', 'error', result.errorMessage);
      }
    }
  };

  const handleCreateGroup = () => {
    if (groupName.length > 0) {
      const selectedFriends = allFriend.filter(friend => friend.isSelected);
      if (selectedFriends.length > 0) {
        axios
          .post(apiendpoints.creategroup, {
            myid: user.id,
            Name: groupName,
            CoverURL: groupAvatarURL,
            Persons: selectedFriends,
          })
          .then(res => {
            if (res.data.succes) {
              showToast('success', 'success', res.data.message);
              navigation.goBack();
              if (getOnlineUsers) {
                getOnlineUsers();
              }
              if (getChats) {
                getChats();
              }
            } else {
              showToast('error', 'error', res.data.message);
            }
          });
      } else {
        showToast('error', 'error', 'You have to select at least one member');
      }
    } else {
      showToast('error', 'error', 'Group name cannot be empty');
    }
  };

  return (
    // <View style={createGroupContainer}>
    // <ScrollView style={createGroupContainer}>
    <ScrollView style={[createGroupContainer]}>
      <View style={createGroupHeaderContainer}>
        <View style={{alignItems: 'center'}}>
          <Text style={ChatHeaderTitle}>Create Group</Text>
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={createGroupBackIcon}>
          <BackIcon color={palette.black} />
        </TouchableOpacity>
      </View>
      <View style={{marginVertical: spacing.double, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => handleChangeGroupAvatar()}
          style={{width: 125, height: 125}}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 100}}
            source={{uri: apiendpoints.profileimg + groupAvatarURL}}
          />
        </TouchableOpacity>
        <View style={{marginVertical: spacing.single}}>
          <Text style={{fontSize: fontSize.ssmall, color: palette.gray}}>
            Click the Avatar to change it
          </Text>
        </View>
        <View style={InputContainer}>
          <Text style={InputLabel}>Group Name</Text>
          <TextInput
            onChangeText={text => setGroupName(text)}
            style={InputStyle}
          />
        </View>
      </View>
      <View>
        <View
          style={{
            marginVertical: spacing.single,
            marginBottom: spacing.double,
          }}>
          <Text
            style={{
              fontSize: fontSize.medium,
              color: palette.gray,
              fontWeight: '500',
            }}>
            Group Admin
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: spacing.single,
          }}>
          <View
            style={{width: spacing.sixfoldhalf, height: spacing.sixfoldhalf}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                borderRadius: spacing.sixfoldhalf,
              }}
              source={{uri: apiendpoints.profileimg + user.AvatarURL}}
            />
          </View>
          <View>
            <Text
              style={{
                fontSize: fontSize.medium,
                color: palette.black,
                fontWeight: '500',
              }}>
              {user.FullName + ' (You)'}
            </Text>
            <Text style={{color: palette.gray, fontSize: fontSize.ssmall}}>
              Group Admin
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            marginVertical: spacing.triple,
            marginBottom: spacing.double,
          }}>
          <Text
            style={{
              fontSize: fontSize.medium,
              color: palette.gray,
              fontWeight: '500',
            }}>
            Group Members
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{
            flexWrap: 'wrap',
            flexDirection: 'row',
            gap: spacing.single,
          }}>
          {allFriend.map((member, index) => {
            if (member.isSelected) {
              return (
                <View key={member.id} style={{width: 70, height: 70}}>
                  <Image
                    source={{uri: apiendpoints.profileimg + member.AvatarURL}}
                    style={{width: '100%', height: '100%', borderRadius: 70}}
                  />
                </View>
              );
            } else {
              <></>;
            }
          })}
          <TouchableOpacity
            onPress={() => {
              navigate('Modal', {
                title: 'Select Group Members',
                content: () => (
                  <AddGroupMembers
                    allfriends={allFriend}
                    myUser={user}
                    callback={(selectedGroupMembers: UserType[]) => {
                      setAllFriend(selectedGroupMembers);
                    }}
                  />
                ),
              });
            }}>
            <AddMemberIcon />
          </TouchableOpacity>
        </ScrollView>
        <TouchableOpacity
          style={[
            LandingPageButton,
            {
              backgroundColor: palette.primary,
              marginVertical: spacing.double,
              marginTop: spacing.quadruple,
              marginBottom: spacing.double,
            },
          ]}
          onPress={() => {
            handleCreateGroup();
          }}>
          <Text style={[LandingPageButtonText, {color: palette.white}]}>
            Create Group
          </Text>
        </TouchableOpacity>
        <View style={{width: 100, height: 20}}></View>
      </View>
    </ScrollView>
  );
}
