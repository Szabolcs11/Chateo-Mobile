import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {apiendpoints} from '../constans';
import {ComponentMessageType, MessageType} from '../types';
import {
  MessageByOtherAvatar,
  MessageByOtherAvatarContainer,
  MessageByOtherContainer,
  MessageByOtherContainerMessageContainer,
  MessageByOtherDateContainer,
  spacing,
} from '../style';
import {navigate} from '../navigation/settings';

// type MessageByOtherType = {
//   message: MessageType;
//   last: boolean;
// };

export default function MessageByOther({message, last}: ComponentMessageType) {
  return (
    <View style={{marginBottom: last ? spacing.triple : spacing.half}}>
      <View
        style={[
          MessageByOtherContainer,
          // {marginBottom: last ? spacing.single : spacing.half},
        ]}>
        <View style={MessageByOtherAvatarContainer}>
          {last ? (
            <Image
              style={MessageByOtherAvatar}
              source={{uri: apiendpoints.profileimg + message.AvatarURL}}
            />
          ) : null}
        </View>
        <View style={MessageByOtherContainerMessageContainer}>
          {message.Text != '' ? (
            <Text
              style={{
                paddingBottom: message.ImageIDs[0] != '' ? spacing.single : 0,
              }}>
              {message.Text}
            </Text>
          ) : null}
          {message.ImageIDs[0] != '' ? (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                gap: spacing.single,
                flexWrap: 'wrap',
                padding: 0, // Remove any padding around the container
                margin: 0, // Remove any margin around the container
              }}>
              {message.ImageIDs.map((e, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigate('ImagePreview', {image: e});
                    }}
                    style={{width: '100%', height: 200}}
                    key={index}>
                    <Image
                      style={{
                        flex: 1,
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                        padding: 0,
                        margin: 0,
                        gap: spacing.single,
                        borderRadius: spacing.single,
                      }}
                      source={{
                        uri: apiendpoints.profileimg + e,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : null}
        </View>
      </View>
      {last ? (
        <View style={MessageByOtherDateContainer}>
          <Text>{new Date(message.Date).toLocaleDateString()}</Text>
        </View>
      ) : null}
    </View>
  );
}
