import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {
  MessageByMeContainer,
  MessageByMeMessageContainer,
  MessageByMeText,
  spacing,
} from '../style';
import {ComponentMessageType, MessageType} from '../types';
import {formatDate} from '../constans/globalFunctions';
import {apiendpoints} from '../constans';
import {navigate} from '../navigation/settings';

export default function MessageByMe({message, last}: ComponentMessageType) {
  // console.log('me');
  // console.log(message.ImageIDs[0]);
  return (
    <View style={{marginBottom: last ? spacing.double : spacing.half}}>
      <View
        style={[
          MessageByMeContainer,
          // {marginBottom: last ? spacing.half : spacing.half},
        ]}>
        <View
          style={[
            MessageByMeMessageContainer,
            {borderTopRightRadius: !last ? spacing.singlehalf : 0},
          ]}>
          {message.Text != '' ? (
            <Text
              style={[
                MessageByMeText,
                {paddingBottom: message.ImageIDs[0] != '' ? spacing.single : 0},
              ]}>
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
                // console.log(e);
                // console.log(apiendpoints.image + e);
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
                        backgroundColor: 'white',
                      }}
                      source={{
                        uri: apiendpoints.image + e,
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
        <View style={{alignItems: 'flex-end', marginRight: spacing.singlehalf}}>
          {/* <Text style={{}}>{new Date(message.Date).toLocaleDateString()}</Text> */}
          <Text>
            {formatDate(new Date(message.Date).getHours()) +
              ':' +
              formatDate(new Date(message.Date).getMinutes())}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
