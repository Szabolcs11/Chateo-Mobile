import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import AddFriendIcon from '../../assets/svgs/AddFriendIcon';
import CloseIcon from '../../assets/svgs/CloseIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';
import {apiendpoints} from '../../constans';
import {generateRandomString} from '../../constans/globalFunctions';
import {navigate} from '../../navigation/settings';
import {showToast} from '../../navigation/toast';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderSearch,
  ContainerHeaderTitle,
  MainSearchBar,
  palette,
  spacing,
} from '../../style';
import {TabNavigatorParamsList, UserType} from '../../types';

export let getContacts: () => void;

type FriendType = {
  id: number;
  FullName: string;
  AvatarURL: string;
};

export default function Contacts({
  navigation,
  route,
}: StackScreenProps<TabNavigatorParamsList, 'Contacts'>) {
  const [user, setUser] = useState<UserType>(route.params?.user);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [contacts, setContacts] = useState<FriendType[]>([]);
  const [allUsers, setAllUsers] = useState<FriendType[]>([]);
  const [isAddFriend, setIsAddFriend] = useState<boolean>(false);
  const [searchedContent, setSearchedContent] = useState<FriendType[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getContacts();
  }, []);

  getContacts = () => {
    axios
      .post(apiendpoints.getallfriends, {
        myid: user.id,
      })
      .then(res => {
        if (res.data.succes) {
          setSearchedContent(res.data.friends);
          setContacts(res.data.friends);
        }
      });
    axios
      .post(apiendpoints.getalluser, {
        myid: user.id,
      })
      .then(res => {
        if (res.data.succes) {
          setAllUsers(res.data.users);
        }
      });
  };

  const handleSendFriendRequest = (id: number) => {
    axios
      .post(apiendpoints.sendfriendrequest, {
        myid: user.id,
        targetid: id,
      })
      .then(res => {
        if (res.data.succes) {
          showToast('success', 'success', res.data.message);
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  return (
    <View style={Container}>
      <View style={ContainerHeader}>
        {searching ? (
          <View style={MainSearchBar}>
            <View style={{width: '10%'}}>
              <SearchIcon color={palette.black} />
            </View>
            <View style={{width: '80%'}}>
              <TextInput
                onChangeText={text => setSearchText(text)}
                style={{padding: 0}}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSearching(false);
                setSearchText('');
              }}
              style={{width: '10%'}}>
              <CloseIcon />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => setSearching(true)}
            style={ContainerHeaderSearch}>
            <SearchIcon color={palette.gray} />
          </TouchableOpacity>
        )}
        <View style={{justifyContent: 'center'}}>
          <Text style={ContainerHeaderTitle}>
            {isAddFriend ? 'Add Friends' : 'Contacts'}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setIsAddFriend(prev => !prev);
            setSearchedContent(!isAddFriend ? allUsers : contacts);
          }}
          style={ContainerHeaderSearch}>
          {isAddFriend ? (
            <CloseIcon color={palette.white} />
          ) : (
            <AddFriendIcon color={palette.white} />
          )}
        </TouchableOpacity>
      </View>
      {/* <View style={[ChatsContainer, {height: '77%'}]}> */}
      <View style={[ChatsContainer, {height: '82%'}]}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <FlatList
          data={searchedContent.filter(e =>
            e.FullName.toLocaleLowerCase().includes(
              searchText.toLocaleLowerCase(),
            ),
          )}
          showsVerticalScrollIndicator={false}
          refreshing={isRefreshing}
          onRefresh={() => {
            if (isAddFriend) return;
            setIsRefreshing(true);
            getContacts();
            setTimeout(() => {
              setIsRefreshing(false);
            }, 500);
          }}
          renderItem={({item: e}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => navigate('ViewProfile', {userID: e.id})}
                  key={e.id + generateRandomString(4)}
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
                  {isAddFriend ? (
                    <TouchableOpacity
                      onPress={() => handleSendFriendRequest(e.id)}>
                      <AddFriendIcon color={palette.primary} />
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              </>
            );
          }}
        />
      </View>
    </View>
  );
}

{
  /* <View style={[ChatsContainer, {height: '77%'}]}>
        <ScrollView showsVerticalScrollIndicator={false}> 
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchedContent
            .filter(e =>
              e.FullName.toLocaleLowerCase().includes(
                searchText.toLocaleLowerCase(),
              ),
            )
            .map(e => {
              return (
                <TouchableOpacity
                  onPress={() => navigate('ViewProfile', {userID: e.id})}
                  key={e.id + generateRandomString(4)}
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
                  {isAddFriend ? (
                    <TouchableOpacity
                      onPress={() => handleSendFriendRequest(e.id)}>
                      <AddFriendIcon color={palette.primary} />
                    </TouchableOpacity>
                  ) : null}
                </TouchableOpacity>
              );
            })}
        </ScrollView> */
}
