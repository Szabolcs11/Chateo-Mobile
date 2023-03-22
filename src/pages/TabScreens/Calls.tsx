import React from 'react';
import {Text, View} from 'react-native';
import {
  ChatsContainer,
  Container,
  ContainerHeader,
  ContainerHeaderSearch,
  ContainerHeaderTitle,
  LargeBlackText,
  palette,
} from '../../style';

export default function Calls() {
  return (
    <View style={Container}>
      <View style={[ContainerHeader, {zIndex: 1}]}>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
        <View style={{justifyContent: 'center'}}>
          <Text style={ContainerHeaderTitle}>Calls</Text>
        </View>
        <View
          style={[
            ContainerHeaderSearch,
            {backgroundColor: palette.primary},
          ]}></View>
      </View>
      {/* <View style={[ChatsContainer, {height: '77%'}]}> */}
      <View style={[ChatsContainer, {height: '80%'}]}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={LargeBlackText}>Coming soon</Text>
        </View>
      </View>
    </View>
  );
}
