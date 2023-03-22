import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {ChatTabType, StatusType, UserType} from '../types';
import {apiendpoints, apiurl} from '../constans';
import {
  ActiveStatus,
  ChatTabContainer,
  ChatTabName,
  ChatTabProfileImage,
  NotificationContainer,
  NotificationText,
  OfflineStatus,
} from '../style';
import socket from '../constans/socket';
import {useIsFocused} from '@react-navigation/native';
import {changestatus} from '../pages/Chat';

type ChatComponentType = {
  Chat: ChatTabType;
  myUser: UserType;
};

export default function ChatComponent(props: ChatComponentType) {
  const isFocused = useIsFocused();
  // if (props.Chat.Name == 'Apelda Ember') {
  //   console.log('------');
  //   console.log('ChatComponent');
  //   console.log(props.Chat.Status, props.Chat.Name);
  //   console.log(props.myUser.FullName);
  // }
  const [online, setOnline] = useState<StatusType>(
    JSON.parse(props.Chat?.Status || ''),
  );
  // const [online, setOnline] = useState<StatusType>({
  //   Status: 'Offline',
  //   LastUpdate: '',
  // });
  let [mainChat, setMainChat] = useState<ChatTabType>(props.Chat);
  // useEffect(() => {
  //   console.log('getStatus', props.Chat.Status);
  //   let tempp = JSON.parse(props.Chat.Status);
  //   setOnline(tempp);
  // }, []);

  useEffect(() => {
    if (socket == null) return;
    // if (!isFocused) return;
    socket.on(
      'userdisconencted',
      (status: string, name: string, roomkey: string, changerid: number) => {
        if (roomkey == props.Chat.RoomKey) {
          console.log('userdisconencted', status, name, roomkey, changerid);
          let temp = {
            Status: status,
            LastUpdate: new Date().toISOString(),
          };
          setOnline(temp);
          props.Chat.Status = JSON.stringify(temp);
          console.log(props.Chat);
          setMainChat(prevStatus => ({
            ...prevStatus,
            Status: JSON.stringify(temp),
          }));
          if (changestatus) {
            changestatus(temp, props.Chat.RoomKey);
          }
          // let temp = chats;
          // temp.map((e) => {
          //   if (e.UserID == changerid) {
          //     e.Status = status;
          //   }
          // })
        }
      },
    );
    return () => {
      socket.off('userdisconencted');
    };
  }, [socket]);

  // console.log('state', props.Chat?.Status);
  // console.log('state', online);
  // const [online, setOnline] = useState('Offline');

  return (
    <TouchableOpacity
      style={ChatTabContainer}
      // onPress={() => props.Chat.callback!(props.Chat)}>
      onPress={() => props.Chat.callback!(mainChat)}>
      <View style={{position: 'relative'}}>
        <Image
          style={ChatTabProfileImage}
          source={{uri: apiendpoints.profileimg + props.Chat.AvatarURL}}
        />
        <Text>
          {/* {online.Status}
          {props.Chat.Status} */}
        </Text>
        <View
          style={
            online?.Status == 'Online' ? ActiveStatus : OfflineStatus
          }></View>
      </View>
      <View>
        <View>
          <Text style={ChatTabName}>{props.Chat.Name}</Text>
        </View>
        <View>
          <Text>
            {props.Chat.LastMessage?.Text != ''
              ? props.Chat.isGroup
                ? props.Chat.LastMessage?.SenderName +
                  ': ' +
                  props.Chat.LastMessage?.Text
                : props.Chat.LastMessage?.SenderID == props.myUser.id
                ? 'You: ' + props.Chat.LastMessage?.Text
                : props.Chat.LastMessage?.Text
              : props.Chat.LastMessage.ImageIDs != ''
              ? props.Chat.LastMessage.SenderID == props.myUser.id
                ? 'You: Sent an Image'
                : props.Chat.LastMessage.SenderName + ': Sent an Image'
              : 'No message yet'}
            {/* : props.Chat.LastMessage.ImageIDs != "" ? "Image" : "No Messages"} */}
          </Text>
        </View>
      </View>
      {props.Chat.Notification != 0 ? (
        <View style={NotificationContainer}>
          <Text style={NotificationText}>{props.Chat.Notification}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

// function getStatus(text: string) {
//   console.log('getStatus', text);
//   let tempp = JSON.parse(text);
//   return tempp;
// }
