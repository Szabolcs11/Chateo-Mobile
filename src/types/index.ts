import {ReactElement} from 'react';

export type StackNavigatorParamsList = {
  TabNavigator: {};
  Chat: {
    chat: ChatTabType;
    myUser: UserType;
  };
  Modal: {
    content: () => JSX.Element;
    title: string;
  };
  ViewProfile: {
    userID: number;
    myUser?: UserType;
  };
  ImagePreview: {
    image: string;
  };
  CreateGroup: {
    myUser: UserType;
  };
  // Auth
  Landing: {};
  Login: {};
  Register: {};
  TwoFaLogin: {Token: string};
};

export type TabNavigatorParamsList = {
  Message: {
    content: () => JSX.Element;
    user: UserType;
  };
  Calls: {};
  Contacts: {
    user: UserType;
  };
  Settings: {
    user: UserType;
  };
};

export type UserType = {
  id: number;
  Password: string;
  FullName: string;
  Name?: string;
  Email: string;
  Rank: string;
  AvatarURL: string;
  Flag: string;
  Secret: string;
};

export let TestUser: UserType = {
  id: 0,
  Email: '',
  FullName: 'Guest',
  Password: '',
  Rank: '',
  AvatarURL: '',
  Flag: '',
  Secret: '',
};

// Incorrect useage of types, FullName, SenderID should be User: UserType
export type MessageType = {
  UserID: number;
  FullName: string;
  AvatarURL: string;
  MessageID: number;
  SenderID: number;
  Text: string;
  RoomID: number;
  Date: Date;
  ImageIDs: string[];
  // ImageIDs: string;
  Divider?: boolean;
  RoomKey?: string;
};
// Same mistake as above
// export type ChatType = {
//   RoomKey: string;
//   ChatName: string;
//   ChatAvatar: string;
//   ChatStatus: string;
//   UserID?: number;
//   ChatMessages: string[];
//   Status: string;
// };

export type ChatType = {
  id: number;
  userID: number;
  Status: string;
  Name: string;
  AvatarURL: string;
  RoomKey: string;
  Notification: number;
  LastMessage: string;
};

export type ChatTabType = {
  id: number;
  UserID: number;
  Status: string;
  Name: string;
  AvatarURL: string;
  RoomKey: string;
  Notification: number;
  isGroup: boolean;
  LastMessage?: LastMessage;
  callback?: (data: ChatTabType) => void;
};

type LastMessage = {
  Text: string;
  Date: Date;
  SenderID: number;
  SenderName: string;
  ImageIDs: string;
};

export type StatusType = {
  Status: 'Online' | 'Offline' | 'Not Available' | string;
  LastUpdate: string;
};

export type ComponentMessageType = {
  message: MessageType;
  last: boolean;
};

export type AccountTabComponentType = {
  callback: () => void;
  Title: 'Account' | 'Friend requests' | 'Security' | 'Logout';
  Subtitle: string;
  Notification?: number;
  Icon: JSX.Element;
};
