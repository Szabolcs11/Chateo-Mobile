import Clipboard from '@react-native-clipboard/clipboard';
import {useIsFocused} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef, useState, Fragment} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AttachmentIcon from '../assets/svgs/AttachmentIcon';
import BackIcon from '../assets/svgs/BackIcon';
import CallsIcon from '../assets/svgs/CallsIcon';
import CameraIcon from '../assets/svgs/CameraIcon';
import CopyToClipboardIcon from '../assets/svgs/CopyToClipboardIcon';
import SendIcon from '../assets/svgs/SendIcon';
import MessageByMe from '../components/MessageByMe';
import MessageByOther from '../components/MessageByOther';
import MessageDivider from '../components/MessageDivider';
import {apiendpoints, emojis, MMKV_KEYS} from '../constans';
import socket from '../constans/socket';
import {DecodeMessage, EncryptMessage} from '../messageProtection';
import {storage} from '../navigation';
import {showToast} from '../navigation/toast';
import {
  ActiveStatus,
  ChatContainer,
  ChatFooterContainer,
  ChatFooterInput,
  ChatHeaderContainer,
  ChatHeaderTitle,
  ContainerHeaderIcon,
  FooterSendMessageButton,
  FooterSubContainer,
  OfflineStatus,
  palette,
  SmallGrayText,
  spacing,
} from '../style';
import {MessageType, StackNavigatorParamsList, StatusType} from '../types';
import {reciveNotification} from './TabScreens/Message';
import {
  launchCamera,
  launchImageLibrary,
  ImagePickerResponse,
  Asset,
} from 'react-native-image-picker';
import axios from 'axios';
import CloseIcon from '../assets/svgs/CloseIcon';

// export let setImagePreview = (e:string) => void;

const {width, height} = Dimensions.get('window');

type GetRoomMessagesCallbackType = {
  succes: boolean;
  message?: string;
  messagedatas: MessageType[];
};

type SendMessageType = {
  succes: boolean;
  messagedatas: MessageType;
};

type JoinRoomType = {
  succes: boolean;
  messages?: string;
};

// export let changestatus = (status: StatusType) => void;
export let changestatus: (status: StatusType, key: string) => void;

export default function Chat({
  navigation,
  route,
}: StackScreenProps<StackNavigatorParamsList, 'Chat'>) {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState<string>('');
  const [status, setStatus] = useState<StatusType>(
    JSON.parse(route.params.chat.Status || ''),
  );
  // console.log('Chat', route.params.chat);
  const [keyboardFocused, setKeyboardFocused] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const scrollViewRef = useRef(null);

  const isFocused = useIsFocused();

  // const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<any>();
  // const [selectedImages, setSelectedImages] = useState<ImagePickerResponse?.assets | Assets | undefined>();
  // const [selectedImages, setSelectedImages] = useState<Asset[] | undefined>();
  // const [selectedImages, setSelectedImages] = useState<ImagePickerResponse | undefined>();

  changestatus = (status: StatusType, key: string) => {
    if (route.params.chat.RoomKey == key) {
      setStatus(status);
    }
  };

  useEffect(() => {
    socket.emit(
      'getroommessages',
      route.params.chat.id,
      (cb: GetRoomMessagesCallbackType) => {
        if (cb.succes) {
          loadMessages(cb.messagedatas, route.params.chat.RoomKey);
        } else {
          // showToast('error', 'error', cb.message!); // No messages
        }
      },
    );
  }, []);

  useEffect(() => {
    socket.emit(
      'joinroom',
      route.params.chat.RoomKey,
      false,
      [],
      route.params.myUser.id,
      false,
      (cb: JoinRoomType) => {
        if (cb.succes) {
          storage.set(MMKV_KEYS.CURRENTROOM, route.params.chat.RoomKey);
        } else {
          showToast('error', 'error', cb.messages!);
        }
      },
    );
  }, []);

  const loadMessages = (messagedatas: MessageType[], roomkey: string) => {
    if (messagedatas) {
      for (let i = 0; i < messagedatas.length; i++) {
        if (messagedatas[i].Text.length) {
          let temp = String(messagedatas[i].ImageIDs);
          messagedatas[i].ImageIDs = temp.split(',');
          messagedatas[i].Text = DecodeMessage(messagedatas[i].Text, roomkey);
        } else if (messagedatas[i].ImageIDs.length) {
          let temp = String(messagedatas[i].ImageIDs);
          messagedatas[i].ImageIDs = temp.split(',');
        }
      }
      setMessages(formatMessages(messagedatas));
    }
  };

  const formatMessages = (mess: MessageType[]) => {
    mess.map((m, index) => {
      if (mess[index - 1]) {
        if (
          new Date(mess[index - 1].Date).getDate() != new Date(m.Date).getDate()
        ) {
          let temp: MessageType = m;
          temp.Divider = true;
          return temp;
        }
      }
      return m;
    });
    return mess;
  };

  const handleTextInputFocus = () => {
    setKeyboardFocused(true);
    setTimeout(() => {
      // @ts-ignore // Neds to fix later
      scrollViewRef.current.scrollToEnd({animated: true});
    }, 5);
  };

  const handleSendMessage = async () => {
    console.log('selectedImages', selectedImages);
    setImageLoading(true);
    if (message != '') {
      console.log('message', message);

      if (selectedImages) {
        console.log('Text and image');
        console.log(selectedImages);
        let UploadedImages: any = [];
        const data = new FormData();
        data.append('file', {
          uri: selectedImages.uri,
          name: selectedImages.fileName,
          type: 'image/jpg',
        });
        axios
          // .post('http://192.168.0.103:2004/upploadimage', data, {
          .post(apiendpoints.upploadimage, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then(res => {
            console.log(res.data);
            UploadedImages.push(res.data.file);
            let encrytedMessage = EncryptMessage(
              message,
              route.params.chat.RoomKey,
            );
            socket.emit(
              'sendmessage',
              route.params.chat.RoomKey,
              encrytedMessage,
              route.params.myUser,
              UploadedImages, // Images
              (cb: SendMessageType) => {
                if (cb.succes) {
                  let messagetext = cb.messagedatas.Text;
                  const {
                    SenderID,
                    AvatarURL,
                    Date,
                    RoomID,
                    RoomKey,
                    Text,
                    FullName,
                    ImageIDs,
                  } = cb.messagedatas;
                  let temp = String(ImageIDs);
                  let newValue = temp.split(',');
                  setMessages(
                    formatMessages([
                      ...messages,
                      {
                        SenderID: SenderID,
                        AvatarURL: AvatarURL,
                        Date: Date,
                        RoomID: RoomID,
                        Text: DecodeMessage(messagetext, RoomKey),
                        FullName: FullName,
                        ImageIDs: newValue,
                      },
                    ] as MessageType[]),
                  );
                  setImageLoading(false);
                  setMessage('');
                  setSelectedImages(null);
                }
              },
            );
          });
      } else {
        let encrytedMessage = EncryptMessage(
          message,
          route.params.chat.RoomKey,
        );
        socket.emit(
          'sendmessage',
          route.params.chat.RoomKey,
          encrytedMessage,
          route.params.myUser,
          [], // Images
          (cb: SendMessageType) => {
            if (cb.succes) {
              let messagetext = cb.messagedatas.Text;
              const {
                SenderID,
                AvatarURL,
                Date,
                RoomID,
                RoomKey,
                Text,
                FullName,
                ImageIDs,
              } = cb.messagedatas;
              let temp = String(ImageIDs);
              let newValue = temp.split(',');
              console.log(newValue);
              setMessages(
                formatMessages([
                  ...messages,
                  {
                    SenderID: SenderID,
                    AvatarURL: AvatarURL,
                    Date: Date,
                    RoomID: RoomID,
                    Text: DecodeMessage(messagetext, RoomKey),
                    FullName: FullName,
                    ImageIDs: newValue,
                  },
                ] as MessageType[]),
              );
              setImageLoading(false);
              setMessage('');
              setSelectedImages(null);
            }
          },
        );
      }
    } else if (selectedImages) {
      console.log('Only image');
      console.log(selectedImages);
      let UploadedImages: any = [];
      const data = new FormData();
      data.append('file', {
        uri: selectedImages.uri,
        name: selectedImages.fileName,
        type: 'image/jpg',
      });
      axios
        .post(apiendpoints.upploadimage, data, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log(res.data);
          UploadedImages.push(res.data.file);
          socket.emit(
            'sendmessage',
            route.params.chat.RoomKey,
            '',
            route.params.myUser,
            UploadedImages, // Images
            (cb: SendMessageType) => {
              if (cb.succes) {
                let messagetext = cb.messagedatas.Text;
                const {
                  SenderID,
                  AvatarURL,
                  Date,
                  RoomID,
                  RoomKey,
                  Text,
                  FullName,
                  ImageIDs,
                } = cb.messagedatas;
                let temp = String(ImageIDs);
                let newValue = temp.split(',');
                console.log(newValue);
                setMessages(
                  formatMessages([
                    ...messages,
                    {
                      SenderID: SenderID,
                      AvatarURL: AvatarURL,
                      Date: Date,
                      RoomID: RoomID,
                      Text: DecodeMessage(messagetext, RoomKey),
                      FullName: FullName,
                      ImageIDs: newValue,
                    },
                  ] as MessageType[]),
                );
                setImageLoading(false);
                setMessage('');
                setSelectedImages(null);
              }
            },
          );
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const createFormData = (photo: any, body: any = {}) => {
    const data = new FormData();

    data.append('photo', {
      name: photo.fileName,
      type: photo.type,
      uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
    });

    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });

    return data;
  };

  useEffect(() => {
    if (socket == null) return;
    if (!isFocused) return;
    socket.on('recivemessage', (data: MessageType) => {
      if (isFocused) {
        if (data.RoomKey == route.params.chat.RoomKey) {
          data.Text = DecodeMessage(data.Text, data.RoomKey);
          let temp = String(data.ImageIDs);
          data.ImageIDs = temp.split(',');
          setMessages(prevMessage => formatMessages([...prevMessage, data]));
        } else {
          reciveNotification(data.RoomKey!);
        }
      } else {
        console.log(
          'If this message is displayed the socket is does not offed properly',
        );
        reciveNotification(data.RoomKey!);
      }
    });
    return () => {
      socket.off('recivemessage');
    };
  }, [socket, isFocused, route.params.chat.RoomKey]);

  const handleCopyToClipboard = async () => {
    const text = await Clipboard.getString();
    setMessage(prev => prev + ' ' + text);
  };

  const openAttachments = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      maxHeight: 1000,
      maxWidth: 1000,
    });
    if (!result.didCancel) {
      setSelectedImages(result.assets![0]);
    }
  };

  const openCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
    });
    console.log(result);
    if (!result.didCancel) {
      setSelectedImages(result.assets![0]);
    }
  };
  return (
    <View style={ChatContainer}>
      {/* {imagePreviewUrl != '' ? (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: palette.gray,
            width: width,
            height: height,
            zIndex: 1,
          }}>
          <Image
            style={{resizeMode: 'contain', width: '100%', height: '100%'}}
            source={{uri: apiendpoints.profileimg + imagePreviewUrl}}
          />
        </View>
      ) : null} */}
      <View style={ChatHeaderContainer}>
        <TouchableOpacity
          style={{
            paddingRight: spacing.single,
            paddingVertical: spacing.single,
            // backgroundColor: palette.red,
            // marginRight: spacing.quintuple,
          }}
          onPress={() => navigation.goBack()}>
          <BackIcon color={palette.black} />
        </TouchableOpacity>
        <View>
          <Image
            style={ContainerHeaderIcon}
            source={{
              uri: apiendpoints.profileimg + route.params.chat.AvatarURL,
            }}
          />
          <View
            style={
              status.Status == 'Online' ? ActiveStatus : OfflineStatus
            }></View>
        </View>
        <View>
          <Text style={ChatHeaderTitle}>{route.params.chat.Name}</Text>
          <Text style={SmallGrayText}>
            {status.Status == 'Online'
              ? 'Active now'
              : status.Status == 'Offline'
              ? 'Offline'
              : ''}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            right: spacing.double,
            top: spacing.single,
          }}>
          <CallsIcon selected={false} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          // @ts-ignore
          scrollViewRef.current.scrollToEnd({animated: true})
        }
        contentContainerStyle={{
          padding: spacing.single,
          paddingBottom: 64,
        }}>
        {/* <MessageByOther  /> */}
        {messages.map((e, i) => {
          if (e.SenderID == route.params.myUser.id) {
            if (messages[i + 1]) {
              if (e.SenderID == messages[i + 1].SenderID) {
                return (
                  <Fragment key={`MESSAGE_BY_ME_${i}`}>
                    {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                    <MessageByMe
                      key={e.MessageID}
                      message={{
                        Text: e.Text,
                        AvatarURL: e.AvatarURL,
                        Date: e.Date,
                        ImageIDs: e.ImageIDs,
                        MessageID: e.MessageID,
                        RoomID: e.RoomID,
                        SenderID: e.SenderID,
                        UserID: e.UserID,
                        FullName: e.FullName,
                      }}
                      last={false}
                    />
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={`MESSAGE_BY_ME_${i}`}>
                    {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                    <MessageByMe
                      key={e.MessageID}
                      message={{
                        Text: e.Text,
                        AvatarURL: e.AvatarURL,
                        Date: e.Date,
                        ImageIDs: e.ImageIDs,
                        MessageID: e.MessageID,
                        RoomID: e.RoomID,
                        SenderID: e.SenderID,
                        UserID: e.UserID,
                        FullName: e.FullName,
                      }}
                      last={true}
                    />
                  </Fragment>
                );
              }
            } else {
              return (
                <Fragment key={`MESSAGE_BY_ME_${i}`}>
                  {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                  <MessageByMe
                    key={e.MessageID}
                    message={{
                      Text: e.Text,
                      AvatarURL: e.AvatarURL,
                      Date: e.Date,
                      ImageIDs: e.ImageIDs,
                      MessageID: e.MessageID,
                      RoomID: e.RoomID,
                      SenderID: e.SenderID,
                      UserID: e.UserID,
                      FullName: e.FullName,
                    }}
                    last={true}
                  />
                </Fragment>
              );
            }
          } else {
            if (messages[i + 1]) {
              if (e.SenderID == messages[i + 1].SenderID) {
                return (
                  <Fragment key={`MESSAGE_BY_OTHER_${i}`}>
                    {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                    <MessageByOther
                      key={e.MessageID}
                      message={{
                        Text: e.Text,
                        AvatarURL: e.AvatarURL,
                        Date: e.Date,
                        ImageIDs: e.ImageIDs,
                        MessageID: e.MessageID,
                        RoomID: e.RoomID,
                        SenderID: e.SenderID,
                        UserID: e.UserID,
                        FullName: e.FullName,
                      }}
                      last={false}
                    />
                  </Fragment>
                );
              } else {
                return (
                  <Fragment key={`MESSAGE_BY_OTHER_${i}`}>
                    {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                    <MessageByOther
                      key={e.MessageID}
                      message={{
                        Text: e.Text,
                        AvatarURL: e.AvatarURL,
                        Date: e.Date,
                        ImageIDs: e.ImageIDs,
                        MessageID: e.MessageID,
                        RoomID: e.RoomID,
                        SenderID: e.SenderID,
                        UserID: e.UserID,
                        FullName: e.FullName,
                      }}
                      last={true}
                    />
                  </Fragment>
                );
              }
            } else {
              return (
                <Fragment key={`MESSAGE_BY_OTHER_${i}`}>
                  {e.Divider ? <MessageDivider Date={e.Date} /> : null}
                  <MessageByOther
                    key={e.MessageID}
                    message={{
                      Text: e.Text,
                      AvatarURL: e.AvatarURL,
                      Date: e.Date,
                      // ImageIDs: e.ImageIDs ? e.ImageIDs.splice(',') : [],
                      // ImageIDs: e.ImageIDs ? e.ImageIDs.split(',') : [],
                      // ImageIDs: e.ImageIDs ? message.split(',') : [],
                      // ImageIDs: e.ImageIDs ? e.ImageIDs.split(',') : [],
                      ImageIDs: e.ImageIDs,
                      MessageID: e.MessageID,
                      RoomID: e.RoomID,
                      SenderID: e.SenderID,
                      UserID: e.UserID,
                      FullName: e.FullName,
                    }}
                    last={true}
                  />
                </Fragment>
              );
            }
          }
        })}
      </ScrollView>

      <View style={ChatFooterContainer}>
        {/* <View style={{width: 100, height: 100, backgroundColor: 'red'}}></View> */}
        <TouchableOpacity onPress={() => openAttachments()}>
          <AttachmentIcon />
        </TouchableOpacity>
        <View style={FooterSubContainer}>
          <View style={{width: '70%'}}>
            {selectedImages ? (
              <View
                style={{
                  position: 'absolute',
                  top: -110,
                  width: '100%',
                  height: 100,
                  backgroundColor: palette.gray,
                  borderRadius: spacing.single,
                  padding: spacing.single,
                }}>
                <View style={{width: 100 - spacing.single, height: '100%'}}>
                  <TouchableOpacity
                    onPress={() => setSelectedImages(null)}
                    style={{
                      position: 'absolute',
                      zIndex: 1,
                      top: -3,
                      right: -3,
                    }}>
                    <CloseIcon />
                  </TouchableOpacity>
                  <Image
                    style={{width: '100%', height: '100%'}}
                    source={{uri: selectedImages.uri}}
                  />
                </View>
              </View>
            ) : null}
            <TextInput
              placeholder="Write your message"
              onFocus={handleTextInputFocus}
              onBlur={() => setKeyboardFocused(false)}
              style={ChatFooterInput}
              onChangeText={text => setMessage(text)}
              value={message}
            />
            <TouchableOpacity
              onPress={() => handleCopyToClipboard()}
              style={{position: 'absolute', right: 5, top: spacing.single}}>
              <CopyToClipboardIcon />
            </TouchableOpacity>
          </View>
          {!keyboardFocused && message == '' && selectedImages == null ? (
            <TouchableOpacity onPress={() => openCamera()}>
              <CameraIcon />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              // onPress={() => (!imageLoading ? handleSendMessage() : null)}
              onPress={() => {
                if (imageLoading) {
                  return;
                }
                handleSendMessage();
              }}
              style={FooterSendMessageButton}>
              {imageLoading ? (
                <ActivityIndicator size={'large'} color={palette.white} />
              ) : (
                <SendIcon />
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}
