import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {UserType} from '../types';
import {
  LandingPageButton,
  LandingPageButtonText,
  palette,
  spacing,
} from '../style';
import {apiendpoints} from '../constans';
import GPlusIcon from '../assets/svgs/GPlusIcon';
import MinusIcon from '../assets/MinusIcon';
import {navigate, navigationRef} from '../navigation/settings';
import {useIsFocused} from '@react-navigation/native';

type AddGroupMembersType = {
  myUser: UserType;
  allfriends: UserType[];
  //   selectedGroupMembers: UserType[];
  callback: (selectedGroupMembers: UserType[]) => void;
};

type ModifiedUserType = UserType & {
  isSelected?: boolean;
};

export default function AddGroupMembers({
  allfriends,
  myUser,
  //   selectedGroupMembers,
  callback,
}: AddGroupMembersType) {
  const [original, setOriginal] = useState<ModifiedUserType[]>(allfriends);

  const [everyFriend, setEveryFriend] =
    useState<ModifiedUserType[]>(allfriends);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      callback(everyFriend);
    }
  }, [isFocused]);

  return (
    <View>
      <ScrollView>
        {everyFriend.map((e: ModifiedUserType, i) => {
          return (
            <View
              key={e.id}
              style={{
                marginVertical: spacing.single,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: spacing.single,
                  alignItems: 'center',
                }}>
                <View style={{width: 50, height: 50}}>
                  <Image
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 50,
                    }}
                    source={{uri: apiendpoints.profileimg + e.AvatarURL}}
                  />
                </View>
                <View>
                  <Text>{e.FullName}</Text>
                </View>
              </View>
              <View style={{marginRight: spacing.singlehalf}}>
                {e.isSelected ? (
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      e.isSelected = false;
                      setEveryFriend([...everyFriend]);
                    }}>
                    <MinusIcon />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      width: 20,
                      height: 20,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    onPress={() => {
                      e.isSelected = true;
                      setEveryFriend([...everyFriend]);
                    }}>
                    <GPlusIcon />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={[
          LandingPageButton,
          {
            backgroundColor: palette.primary,
            marginVertical: spacing.double,
            marginTop: spacing.quadruple,
          },
        ]}
        onPress={() => {
          callback(everyFriend);
          navigationRef.current?.goBack();
        }}>
        <Text style={[LandingPageButtonText, {color: palette.white}]}>
          Next
        </Text>
      </TouchableOpacity>
    </View>
  );
}
