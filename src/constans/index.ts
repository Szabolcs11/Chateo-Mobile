// export const apiurl = 'http://192.168.0.103:2004/';
// export const apiurl = 'https://oyster-app-nnxja.ondigitalocean.app/';
// export const apiurl = 'https://dev.api.chateo.kekenj-sabolc.me/';
export const apiurl = 'https://dev.koki10.online/';
// export const socketapiurl = 'https://oyster-app-nnxja.ondigitalocean.app/';
export const socketapiurl = 'https://squid-app-ixfgr.ondigitalocean.app/';

export const apiendpoints = {
  authenticate: apiurl + 'authenticate',
  profileimg: apiurl + 'UsersProfileImg/',
  image: apiurl + 'Images/',
  login: apiurl + 'login',
  register: apiurl + 'register',
  getfriends: apiurl + 'getfriends',
  getonlinefriends: apiurl + 'getonlinefriends',
  upploadimage: apiurl + 'upploadimage',
  getallfriends: apiurl + 'getallfriends',
  getalluser: apiurl + 'getalluser',
  sendfriendrequest: apiurl + 'addfriend',
  getuser: apiurl + 'getuser',
  removefriend: apiurl + 'deletefriend',
  logout: apiurl + 'logout',
  verifytwofa: apiurl + 'verifytwofa',
  changeuseravatar: apiurl + 'changeuseravatar',
  changepassword: apiurl + 'changepassword',
  getincomingfriendrequest: apiurl + 'getincomingfriendrequest',
  handlefriendrequest: apiurl + 'handlefriendrequest',
  turnofftwofa: apiurl + 'turnofftwofa',
  turnontwofa: apiurl + 'turnontwofa',
  gettwofastatus: apiurl + 'gettwofastatus',
  generateqrcode: apiurl + 'generateqrcode',
  creategroup: apiurl + 'creategroup',
};

export const SCREENS = {
  AUTHENTICATE: 'Authenticate',
  MESSAGE: 'Message',
  CALLS: 'Calls',
  CONTACTS: 'Contacts',
  SETTINGS: 'Settings',
  VIEWPROFILE: 'ViewProfile',
};

export const MMKV_KEYS = {
  USER: 'USER',
  WATCHEDLANDINGPAGE: 'WATCHEDLANDINGPAGE',
  TOKEN: 'TOKEN',
  CURRENTROOM: 'CURRENTROOM',
  FCMTOKEN: 'FCMTOKEN',
};

export const emojis = [
  ['😀', ':D'],
  ['😄', ':SmileyCEOM:'],
  ['😁', ':SmileyCETM:'],
  ['😆', ':Smiley>EOM:'],
  ['😅', ':SmileyCEOMCW:'],
  ['😂', ':SmileyCEOMT:'],
  ['🤣', ':SmileyCEOMT45:'],
  ['😇', ':SmileyCECMA:'],
  ['🙂', ':SmileySECM:'],
  ['🙃', ':SmileySECM180:'],
  ['🤑', ':Smiley$E$M$'],
  ['❤️', '<3'],
  ['🤠', ':SmileyCECMCH:'],
  ['💩', ':$hit:'],
  ['😍', ':Smiley<>3EOM:'],
  ['🥰', ':Smiley3x<>3CM:'],
  ['😘', ':Smiley<>3KISS>:'],
  ['💻', ':OELaptop:'],
  ['⌨️', ':OEKeyboard:'],
  ['👍', ':HandLike:'],
];
