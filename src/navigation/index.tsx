import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator, StackScreenProps} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {MMKV} from 'react-native-mmkv';
import {
  StackNavigatorParamsList,
  TabNavigatorParamsList,
  TestUser,
  UserType,
} from '../types';
import {basicScreenPreset, modalOption, navigationRef} from './settings';
import Message from '../pages/TabScreens/Message';
import {
  ModalCloseIcon,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  palette,
} from '../style';
import Calls from '../pages/TabScreens/Calls';
import Contacts from '../pages//TabScreens/Contacts';
import Settings from '../pages/TabScreens/Settings';
import {apiendpoints, apiurl, MMKV_KEYS, SCREENS} from '../constans';
import MessageIcon from '../assets/svgs/MessageIcon';
import CallsIcon from '../assets/svgs/CallsIcon';
import ContactsIcon from '../assets/svgs/ContactsIcon';
import SettingsIcon from '../assets/svgs/SettingsIcon';
import Chat from '../pages/Chat';
import CloseIcon from '../assets/svgs/CloseIcon';

import io, {Socket, connect} from 'socket.io-client';
import TestComponent from '../TestComponent';
import LandingPage from '../pages/Auth/LandingPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {showToast} from './toast';
import axios from 'axios';
import ViewProfile from '../pages/ViewProfile';
import ImagePreview from '../pages/ImagePreview';
import TwoFaLogin from '../pages/Auth/TwoFaLogin';
import CreateGroup from '../pages/CreateGroup';

export const storage = new MMKV();
const Tab = createBottomTabNavigator<TabNavigatorParamsList>();
const Stack = createStackNavigator<StackNavigatorParamsList>();

const Modal = ({
  route,
  navigation,
}: StackScreenProps<StackNavigatorParamsList, 'Modal'>) => {
  const {content, title} = route.params;
  const windowHeight = Dimensions.get('window').height;

  return (
    // <View
    //   style={{
    //     marginTop: windowHeight - (windowHeight - 100),
    //     backgroundColor: 'white',
    //     height: '100%',
    //     borderTopLeftRadius: 30,
    //     borderTopRightRadius: 30,
    //   }}>
    //   <Text>{title}</Text>
    //   <ScrollView>{content()}</ScrollView>
    // </View>

    <View style={ModalContainer}>
      <View style={ModalHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={ModalCloseIcon}>
          <CloseIcon />
          {/* <Icon
            name="arrow-back-ios"
            type="MaterialIcons"
            size={24}
            color={palette.primary}
            style={{transform: [{rotate: '-90deg'}]}}
          /> */}
        </TouchableOpacity>
        <Text style={ModalTitle}>{title}</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{height: '85%'}}
        style={{width: '100%', height: '100%'}}>
        {content()}
      </ScrollView>
    </View>
  );
};

type handleRegisterType = {
  FullName: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
};

type handleLoginType = {
  Email: string;
  Password: string;
};

export let handleRegister: (data: handleRegisterType) => void;
export let handleLogin: (data: handleLoginType) => void;
export let handleLogout: () => void;
export let handleVerifyTwoFaCode: (Token: string, Code: string) => void;

export let changeUserStorage: (user: UserType | null) => void;

export default function index() {
  const [user, setUser] = useState<UserType | null>(getUserFromMMKV());
  // const [user, setUser] = useState(null);
  // useEffect(() => {
  //   setUser(null);
  // }, []);

  // useEffect(() => {
  //   storage.clearAll();
  // });

  changeUserStorage = (user: UserType | null) => {
    setUser(user);
    storage.delete(MMKV_KEYS.USER);
    storage.set(MMKV_KEYS.USER, JSON.stringify(user));
  };

  handleLogin = (data: handleLoginType) => {
    axios
      .post(apiendpoints.login, {
        Email: data.Email,
        Password: data.Password,
      })
      .then(res => {
        if (res.data.succes) {
          if (res.data.twofalogin) {
            navigationRef.current?.navigate('TwoFaLogin', {
              Token: res.data.Token,
            });
          } else {
            setUser(res.data.user);
            storage.set(MMKV_KEYS.USER, JSON.stringify(res.data.user));
            storage.set(MMKV_KEYS.TOKEN, res.data.token);
            showToast('success', 'success', res.data.message);
            return 'asd';
          }
        } else {
          showToast('error', 'error', res.data.message);
          return 'asd';
        }
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
        console.log(err.data);
        console.log(err.message);
        console.log(err.body);
      });
  };

  handleRegister = (data: handleRegisterType) => {
    axios
      .post(apiendpoints.register, {
        FullName: data.FullName,
        Email: data.Email,
        Password: data.Password,
      })
      .then(res => {
        if (res.data.succes) {
          showToast('success', 'success', res.data.message);
          navigationRef.current?.navigate('Login', {});
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  handleLogout = () => {
    axios
      .post(apiendpoints.logout, {
        myid: user?.id,
      })
      .then(res => {
        if (res.data.succes) {
          setUser(null);
          storage.delete(MMKV_KEYS.USER);
          storage.delete(MMKV_KEYS.TOKEN);
          showToast('success', 'success', res.data.message);
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  handleVerifyTwoFaCode = (Token, Code) => {
    axios
      .post(apiendpoints.verifytwofa, {
        key: Token,
        token: Code,
      })
      .then(res => {
        if (res.data.succes) {
          setUser(res.data.user);
          storage.set(MMKV_KEYS.USER, JSON.stringify(res.data.user));
          storage.set(MMKV_KEYS.TOKEN, res.data.token);
          showToast('success', 'success', res.data.message);
        } else {
          showToast('error', 'error', res.data.message);
        }
      });
  };

  useEffect(() => {
    axios
      .post(apiendpoints.authenticate, {
        Token: storage.getString(MMKV_KEYS.TOKEN) || '',
      })
      .then(res => {
        if (res.data.succes) {
        } else {
          // showToast('error', 'error', res.data.message);
          // handleLogout();
          setUser(null);
          storage.delete(MMKV_KEYS.USER);
          storage.delete(MMKV_KEYS.TOKEN);
        }
      });
  }, []);

  const renderTabIcon = (
    route: any,
    focused: boolean,
    color: string,
    size: number,
  ) => {
    let iconName = 'home';
    let element: JSX.Element;
    switch (route.name) {
      case SCREENS.MESSAGE:
        element = <MessageIcon selected={focused} />;
        break;
      case SCREENS.CALLS:
        element = <CallsIcon selected={focused} />;
        break;
      case SCREENS.CONTACTS:
        element = <ContactsIcon selected={focused} />;
        break;
      case SCREENS.SETTINGS:
        element = <SettingsIcon selected={focused} />;
        break;
      default:
        element = <MessageIcon selected={focused} />;
        break;
    }
    return element;
  };

  const renderTabNavigation = useCallback((a: any) => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) =>
            renderTabIcon(route, focused, color, size),
          tabBarActiveTintColor: palette.primary,
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name={'Message'}
          component={Message}
          initialParams={{user: a.route.params.user}}
          // initialParams={{user: user!}}
        />
        <Tab.Screen name={'Calls'} component={Calls} />
        <Tab.Screen
          name={'Contacts'}
          component={Contacts}
          initialParams={{user: a.route.params.user}}
          // initialParams={{user: user!}}
        />
        <Tab.Screen
          name={'Settings'}
          component={Settings}
          initialParams={{user: a.route.params.user}}
          // initialParams={{user: user!}}
        />
      </Tab.Navigator>
    );
  }, []);

  return (
    <>
      <NavigationContainer ref={navigationRef}>
        {user ? (
          <Stack.Navigator screenOptions={basicScreenPreset}>
            <Stack.Screen
              name="TabNavigator"
              component={renderTabNavigation}
              initialParams={{user}}
            />
            <Stack.Screen
              options={{gestureEnabled: false}}
              name="Chat"
              component={Chat}
            />
            <Stack.Screen
              name="ViewProfile"
              component={ViewProfile}
              initialParams={{myUser: user}}
            />
            <Stack.Screen name="ImagePreview" component={ImagePreview} />
            <Stack.Screen
              name="Modal"
              options={modalOption}
              component={Modal}
            />
            <Stack.Screen
              name="CreateGroup"
              component={CreateGroup}
              initialParams={{myUser: user}}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator screenOptions={basicScreenPreset}>
            <Stack.Screen name="Landing" component={LandingPage} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="TwoFaLogin" component={TwoFaLogin} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      <Toast />
    </>
  );
}

function getUserFromMMKV() {
  let storaged = storage.getString(MMKV_KEYS.USER);
  if (storaged) {
    let user = JSON.parse(storaged) as UserType;
    return user;
  } else {
    return null;
  }
}
