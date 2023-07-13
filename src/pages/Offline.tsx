import {View, Text} from 'react-native';
import React from 'react';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderSearch,
  ContainerHeaderTitle,
  LargeBlackText,
  palette,
} from '../style';

export default function Offline() {
  return (
    <View style={Container}>
      <View style={[ContainerHeader, {zIndex: 1}]}>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
        <View style={{justifyContent: 'center'}}>
          <Text style={ContainerHeaderTitle}>Offline</Text>
        </View>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
      </View>
      <View style={[ChatsContainer]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={LargeBlackText}>You are currently offline</Text>
        </View>
      </View>
    </View>
  );
}
