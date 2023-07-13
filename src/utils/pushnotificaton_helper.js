import messaging from '@react-native-firebase/messaging';
import {MMKV_KEYS} from '../constans';
import {storage} from '../navigation';
import {navigate} from '../navigation/settings';
import {openChateWithRoomkey} from '../pages/TabScreens/Message';

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFcmToken();
  }
}

async function getFcmToken() {
  let fcmtoken = await storage.getString(MMKV_KEYS.FCMTOKEN);
  console.log('FCM Token old', fcmtoken);
  if (!fcmtoken) {
    try {
      const fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        console.log('FCM Token new', fcmtoken);
        storage.set(MMKV_KEYS.FCMTOKEN, fcmtoken);
      }
    } catch (e) {
      console.log('FCM Token error', e);
    }
  }
}

export const notificationListener = () => {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
    // messaging().removeAllDeliveredNotifications();
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // messaging().removeAllDeliveredNotifications();
    const {notificationId} = remoteMessage.notification;
    if (notificationId) {
      // messaging().removeDeliveredNotification(notificationId);
    }

    // navigation.navigate(remoteMessage.data.type);
  });
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        console.log(remoteMessage);
        // messaging().removeAllDeliveredNotifications();
        // navigation.navigate(remoteMessage.data.type);
        // navigate('Chat', {chatid: 123});
        let storaged = storage.getString(MMKV_KEYS.USER);
        let user;
        if (storaged) {
          user = JSON.parse(storaged);
          openChateWithRoomkey(remoteMessage.data.roomkey);
        } else {
          user = null;
        }
        // navigate('Chat', {chat: 'Py0DGz', myUser: user});
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
  });
};
