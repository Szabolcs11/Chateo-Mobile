import {useIsFocused, useNavigation} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import axios from 'axios';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
} from 'react-native';
import {RefreshControl} from 'react-native-gesture-handler';
import CloseIcon from '../../assets/svgs/CloseIcon';
import CreateGroupIcon from '../../assets/svgs/CreateGroupIcon';
import SearchIcon from '../../assets/svgs/SearchIcon';
import ChatComponent from '../../components/ChatComponent';
import {apiendpoints} from '../../constans';
import socket from '../../constans/socket';
import {DecodeMessage} from '../../messageProtection';
import {navigate, navigationRef} from '../../navigation/settings';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderIcon,
  ContainerHeaderSearch,
  ContainerHeaderTitle,
  MainSearchBar,
  palette,
  spacing,
  StatusUserContainer,
  StatusUserImageContainer,
  StatusFullName,
  MesseagesContainerHeader,
} from '../../style';
import {
  ChatTabType,
  MessageType,
  StackNavigatorParamsList,
  TabNavigatorParamsList,
  UserType,
} from '../../types';
import {storage} from '../../navigation';

const {width, height} = Dimensions.get('window');

export let reciveNotification: (RoomKey: string) => void;
export let getOnlineUsers: () => void;
export let getChats: () => void;
export let openChate: (id: number | undefined) => void;
export let openChateWithRoomkey: (roomkey: string) => void;

// type FriendType = {
//   UserID: number;
//   Name: string;
//   AvatarURL: string;
//   Status: string;
// };

// export default function Message(props: any) {
export default function Message({
  navigation,
  route,
}: StackScreenProps<TabNavigatorParamsList, 'Message'>) {
  const [user, setUser] = useState<UserType>(route.params?.user);
  const [onlineUsers, setOnlineUsers] = useState<ChatTabType[]>([]);
  const [chats, setChats] = useState<ChatTabType[]>([]);
  const [searchedChates, setSearchedChates] = useState<ChatTabType[]>([]);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [autoOpenChat, setAutoOpenChat] = useState<string | undefined>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // This useEffect is need to be changed to function like useState(getFriends())
  // useEffect(() => {
  useLayoutEffect(() => {
    // console.log('res');
    // console.log(height, width, user.FullName);
    // console.log(height < 750);
    getChats();
  }, []);

  openChate = (id: number | undefined) => {
    if (Number(id) && Number(id) > 0) {
      chats.map(e => {
        if (e.UserID == id) {
          navigate('Chat', {chat: e, myUser: user});
          // navigate('Chat', {user: user,chat: chats,});
        }
      });
    }
  };

  useEffect(() => {
    if (isLoaded) {
      console.log('autoopenchat', autoOpenChat);
      if (autoOpenChat) {
        setTimeout(() => {
          openChateWithRoomkey(autoOpenChat);
        }, 1000);
      }
    }
  }, [isLoaded]);

  openChateWithRoomkey = async (roomkey: string) => {
    if (isLoaded) {
      chats.map(e => {
        if (e.RoomKey == roomkey) {
          openChate(e.UserID);
        }
      });
    } else {
      setAutoOpenChat(roomkey);
    }
    // axios
    //   .post(apiendpoints.getfriends, {
    //     myid: user.id,
    //   })
    //   .then(res => {
    //     console.log('GetChats Inside2');
    //     // console.log(res.data.chats);
    //     res.data.chats.map(e => {
    //       if (e.RoomKey == roomkey) {
    //         // console.log(e.RoomKey, roomkey);
    //         console.log(e);
    //         navigate('Chat', {chat: e, myUser: user});
    //       }
    //     });
    //   });
  };

  getChats = () => {
    console.log('GetChats');
    console.log(apiendpoints.getfriends, user.id);
    axios
      .post(apiendpoints.getfriends, {
        myid: user.id,
      })
      .then(res => {
        console.log(res.data.chats.length);
        setChats(res.data.chats);
        setSearchedChates(res.data.chats);
        joinallroom(res.data.chats);
        setIsLoaded(true);
      });
  };

  getOnlineUsers = () => {
    axios
      .post(apiendpoints.getonlinefriends, {
        myid: user.id,
      })
      .then(res => {
        setOnlineUsers(res.data.chats);
      });
  };

  useEffect(() => {
    getOnlineUsers();
  }, []);

  const joinallroom = (chats: ChatTabType[]) => {
    chats.map(e => {
      // console.log(e.RoomKey);
      socket.emit(
        'joinroom',
        e.RoomKey,
        true,
        chats,
        route.params.user.id,
        !e.isGroup,
        (cb: any) => {},
      );
    });
  };

  const isFocused = useIsFocused();

  const [recivedMessageData, setRecivedMessageData] = useState<MessageType>();

  useEffect(() => {
    if (socket == null) return;
    if (!isFocused) return;
    socket.on('recivemessage', (data: MessageType) => {
      console.log('recived message');
      reciveNotification(data.RoomKey!);
    });
    return () => {
      socket.off('recivemessage');
    };
  }, [socket, isFocused]);

  // useEffect(() => {
  //   if (socket == null) return;
  //   if (!isFocused) return;
  //   socket.on(
  //     'userdisconencted',
  //     (status: string, name: string, roomkey: string, changerid: number) => {
  //       if (changerid != user.id) {
  //         console.log('userdisconencted', status, name, roomkey, changerid);
  //         // let temp = chats;
  //         // temp.map((e) => {
  //         //   if (e.UserID == changerid) {
  //         //     e.Status = status;
  //         //   }
  //         // })
  //         setChats(prevChates => {
  //           return prevChates.map(chat => {
  //             if (chat.UserID == changerid) {
  //               let temp = {
  //                 Status: status,
  //                 LastUpdate: new Date().toLocaleDateString(),
  //               };
  //               chat.Status = JSON.stringify(temp);
  //               return chat;
  //             } else {
  //               return chat;
  //             }
  //           });
  //         });
  //         setSearchedChates(prevChates => {
  //           return prevChates.map(chat => {
  //             if (chat.UserID == changerid) {
  //               let temp = {
  //                 Status: status,
  //                 LastUpdate: new Date().toLocaleDateString(),
  //               };
  //               chat.Status = JSON.stringify(temp);
  //               return chat;
  //             } else {
  //               return chat;
  //             }
  //           });
  //         });
  //       }
  //     },
  //   );
  //   return () => {
  //     socket.off('userdisconencted');
  //   };
  // }, [socket, isFocused]);

  reciveNotification = (RoomKey: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.RoomKey === RoomKey) {
          return {
            ...chat,
            Notification: chat.Notification + 1,
          };
        } else {
          return chat;
        }
      });
    });
    setSearchedChates(prevChats => {
      return prevChats.map(chat => {
        if (chat.RoomKey === RoomKey) {
          return {
            ...chat,
            Notification: chat.Notification + 1,
          };
        } else {
          return chat;
        }
      });
    });
  };

  const clearNotifications = (RoomKey: string) => {
    setChats(prevChats => {
      return prevChats.map(chat => {
        if (chat.RoomKey === RoomKey) {
          return {
            ...chat,
            Notification: 0,
          };
        } else {
          return chat;
        }
      });
    });
    setSearchedChates(prevChats => {
      return prevChats.map(chat => {
        if (chat.RoomKey === RoomKey) {
          return {
            ...chat,
            Notification: 0,
          };
        } else {
          return chat;
        }
      });
    });
  };

  useEffect(() => {
    if (searchText === '') {
      setSearchedChates(chats);
    } else {
      setSearchedChates(
        chats.filter(chat => {
          return chat.Name.toLowerCase().includes(searchText.toLowerCase());
        }),
      );
    }
  }, [searchText]);

  return (
    <View style={Container}>
      <View style={MesseagesContainerHeader}>
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
                setSearchedChates(chats);
              }}
              style={{width: '10%'}}>
              <CloseIcon />
            </TouchableOpacity>
            {/* <TextInput style={{}} /> */}
          </View>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setSearching(true)}
              style={ContainerHeaderSearch}>
              <SearchIcon color={palette.gray} />
            </TouchableOpacity>
          </>
        )}
        <View style={{justifyContent: 'center'}}>
          <Text style={ContainerHeaderTitle}>Home</Text>
        </View>
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigate('Settings')}>
          <Image
            style={ContainerHeaderIcon}
            source={{uri: apiendpoints.profileimg + user.AvatarURL}}
          />
        </TouchableOpacity>
      </View>
      <View style={{height: !searching ? '15%' : 0}}>
        {!searching ? (
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            style={{width: '100%'}}>
            <TouchableOpacity style={{alignItems: 'center'}}>
              <Image
                style={StatusUserImageContainer}
                source={{uri: apiendpoints.profileimg + user.AvatarURL}}
              />
              <Text style={StatusFullName}>{user.FullName.split(' ')[0]}</Text>
              {/* <Text style={StatusFullName}>My status</Text> */}
            </TouchableOpacity>
            {onlineUsers.map(e => {
              return (
                <TouchableOpacity
                  onPress={() => navigate('ViewProfile', {userID: e.UserID})}
                  style={StatusUserContainer}
                  key={e.UserID}>
                  <Image
                    style={StatusUserImageContainer}
                    source={{
                      uri: apiendpoints.profileimg + e.AvatarURL,
                    }}
                  />
                  <Text style={StatusFullName}>
                    {e.Name.split(' ')[0]}
                    {''}
                    {/*This need to be changed to FullName => Surname, or Last Name*/}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : null}
      </View>
      {/* <View style={[ChatsContainer], {height: !searching ? '65%' : "80%"}}> */}
      {/* <View style={[ChatsContainer, {height: !searching ? '65%' : '80%'}]}> */}
      <View
        style={[
          ChatsContainer,
          {
            height: !searching ? '70%' : '85%',
            // height: height < 700 ? '80%' : !searching ? '65%' : '80%',
            // backgroundColor: height < 950 ? palette.red : palette.green,
            // height: !searching ? (height < 750 ? '80%' : '65%') : '80%',
          },
        ]}>
        {/* <View style={[ChatsContainer, {height: '80%'}]}> */}
        {chats.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: spacing.single,
            }}>
            <Text style={{fontSize: 20, color: palette.gray}}>
              No Chats Found
            </Text>
          </View>
        )}
        <FlatList
          refreshing={isRefreshing}
          onRefresh={() => {
            getChats();
            getOnlineUsers();
            setIsRefreshing(true);
            setTimeout(() => {
              setIsRefreshing(false);
            }, 500);
          }}
          data={searchedChates}
          renderItem={i => {
            let e = i.item;
            return (
              <>
                <ChatComponent
                  key={e.id}
                  Chat={{
                    id: e.id,
                    RoomKey: e.RoomKey,
                    Status: e?.Status || '{}',
                    UserID: e.UserID,
                    AvatarURL: e.AvatarURL,
                    Name: e.Name,
                    isGroup: e.isGroup,
                    LastMessage: {
                      Text:
                        e.LastMessage?.Text != null
                          ? DecodeMessage(e.LastMessage?.Text, e.RoomKey)
                          : '' || '',
                      SenderID: e.LastMessage?.SenderID || 0,
                      Date: e.LastMessage?.Date!,
                      SenderName: e.LastMessage?.SenderName || '',
                      ImageIDs: e.LastMessage?.ImageIDs || '',
                    },
                    Notification: e.Notification,
                    callback: data => {
                      let temp = clone(data);
                      delete temp.callback;
                      clearNotifications(e.RoomKey);
                      // console.log('temp', temp);
                      navigate('Chat', {chat: temp, myUser: user});
                    },
                  }}
                  myUser={user}
                />
              </>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigate('CreateGroup', {myUser: user})}
          style={{
            position: 'absolute',
            right: 0,
            bottom: spacing.quadruple,
          }}>
          <CreateGroupIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function clone(obj: any) {
  if (null == obj || 'object' != typeof obj) return obj;

  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }

  return copy;
}

{
  /* <View style={[ChatsContainer, {height: !searching ? '65%' : '80%'}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {searchedChates.map(e => {
            return (
              <ChatComponent
                key={e.id}
                Chat={{
                  id: e.id,
                  RoomKey: e.RoomKey,
                  Status: e?.Status || '{}',
                  UserID: e.UserID,
                  AvatarURL: e.AvatarURL,
                  Name: e.Name,
                  isGroup: e.isGroup,
                  LastMessage: {
                    Text:
                      e.LastMessage?.Text != null
                        ? DecodeMessage(e.LastMessage?.Text, e.RoomKey)
                        : '' || '',
                    SenderID: e.LastMessage?.SenderID || 0,
                    Date: e.LastMessage?.Date!,
                    SenderName: e.LastMessage?.SenderName || '',
                    ImageIDs: e.LastMessage?.ImageIDs || '',
                  },
                  Notification: e.Notification,
                  callback: data => {
                    let temp = clone(data);
                    delete temp.callback;
                    clearNotifications(e.RoomKey);
                    navigate('Chat', {chat: temp, myUser: user});
                  },
                }}
                myUser={user}
              />
            );
          })}
        </ScrollView>
      </View> */
}
