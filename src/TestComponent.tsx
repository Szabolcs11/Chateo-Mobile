import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import BackIcon from './assets/svgs/BackIcon';
import {palette} from './style';
import SearchIcon from './assets/svgs/SearchIcon';
import MessageIcon from './assets/svgs/MessageIcon';
import CallsIcon from './assets/svgs/CallsIcon';
import ContactsIcon from './assets/svgs/ContactsIcon';
import PlayIcon from './assets/svgs/PlayIcon';
import MicrophoneIcon from './assets/svgs/MicrophoneIcon';
import CameraIcon from './assets/svgs/CameraIcon';
import MoreIcon from './assets/svgs/MoreIcon';
import CopyToClipboardIcon from './assets/svgs/CopyToClipboardIcon';
import AttachmentIcon from './assets/svgs/AttachmentIcon';
import SendIcon from './assets/svgs/SendIcon';
import SettingsIcon from './assets/svgs/SettingsIcon';
import {navigate} from './navigation/settings';
import Contacts from './pages/Contacts';

export default function TestComponent() {
  return (
    <View>
      <Text>App</Text>
      <BackIcon color={palette.black} />
      <View style={{backgroundColor: 'black'}}>
        <SearchIcon color={palette.primary} />
      </View>
      <MessageIcon selected={false} />
      <MessageIcon selected={true} />
      <CallsIcon selected={true} />
      <CallsIcon selected={false} />
      <ContactsIcon selected={true} />
      <ContactsIcon selected={false} />
      <SettingsIcon selected={true} />
      <SettingsIcon selected={false} />
      <View style={{backgroundColor: 'black'}}>
        <SendIcon />
      </View>
      <AttachmentIcon />
      <CopyToClipboardIcon />
      <View style={{backgroundColor: 'black'}}>
        <MoreIcon />
      </View>
      <CameraIcon />
      <MicrophoneIcon />
      <View style={{backgroundColor: 'black'}}>
        <PlayIcon />
      </View>
      <View style={{margin: 20}}>
        <View>
          <Text>Message</Text>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'red',
              margin: 10,
            }}
            onPress={() => navigate('Chat', {chatid: 'asd'})}>
            <Text>Stack</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'red',
              margin: 10,
            }}
            onPress={() =>
              navigate('Modal', {title: 'asd', content: () => <Contacts />})
            }>
            <Text>Modal</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
