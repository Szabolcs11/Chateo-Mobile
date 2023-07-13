import {Dimensions, TextStyle, ViewStyle} from 'react-native';
import {ImageStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
const {width, height} = Dimensions.get('window');

export const palette = {
  // primary: '#24786D',
  primary: '#20A090',
  paleprimary: '#58C3B6',
  black: '#000000',
  white: '#FFFFFF',
  green: '#0FE16D', //Status
  orange: '#F04A4C', //Notification
  gray: '#B9C1BE',
  red: '#FF2D1B',
  darkgray: '#797C7B',
  palegray: '#F2F7FB',
  palewhite: '#F8F8FB',
};

export const spacing = {
  half: 4,
  single: 8,
  singlehalf: 12,
  double: 16,
  doublehalf: 20,
  triple: 24,
  quadruple: 32,
  quintuple: 40,
  quintuplehalf: 44,
  sixfold: 48,
  sixfoldhalf: 52,
  sevenfold: 56,
  eightfold: 64,
  ninefold: 72,
  tenfold: 80,
};
export const fontSize = {
  small: 12,
  ssmall: 14,
  medium: 16,
  mmedium: 18,
  mmmedium: 20,
  large: 24,
  xlarge: 26,
  xxlarge: 32,
  xxxlarge: 68,
};

export const ModalContainer: ViewStyle = {
  height: '100%',
  width: '100%',
  backgroundColor: palette.white,
  marginTop: height * 0.15,
  borderTopLeftRadius: spacing.triple,
  borderTopRightRadius: spacing.triple,
  padding: spacing.double,
};

export const ModalHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'center',
  // borderBottomColor: palette.primary,
  // borderBottomWidth: 2,
  paddingBottom: spacing.double,
};

export const ModalCloseIcon: ViewStyle = {
  position: 'absolute',
  left: 0,
  height: '100%',
  justifyContent: 'center',
};

export const ModalTitle: TextStyle = {
  textAlign: 'center',
  // fontSize: fontSize.large,
  fontSize: fontSize.mmmedium,
  color: palette.black,
  fontWeight: '800',
  // textTransform: 'uppercase',
};

export const LandingPageHeader: ViewStyle = {
  position: 'absolute',
  top: 20,
  width: '100%',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'center',
  gap: spacing.single,
};

export const LandingPageOrLineContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
};

export const LandingPageOrLine: ViewStyle = {
  width: '45%',
  height: 1,
  backgroundColor: palette.gray,
};

export const LandingPageOrText: TextStyle = {
  color: palette.darkgray,
};

export const LandingPageButton: ViewStyle = {
  backgroundColor: palette.white,
  padding: spacing.double,
  width: '100%',
  borderRadius: spacing.double,
  alignItems: 'center',
};

export const LandingPageButtonText: TextStyle = {
  color: palette.black,
  fontWeight: '500',
  fontSize: fontSize.medium,
};

export const AuthContainer: ViewStyle = {
  backgroundColor: palette.black,
  width,
  height,
  padding: spacing.double,
  alignItems: 'center',
};

export const LoginWithSocialContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  gap: spacing.double,
  marginVertical: spacing.quadruple,
};

export const InputContainer: ViewStyle = {
  width: '100%',
  marginVertical: spacing.double,
  // backgroundColor: 'red',
};

export const InputLabel: TextStyle = {
  color: palette.primary,
  fontWeight: '500',
  fontSize: fontSize.ssmall,
};

export const InputStyle: ViewStyle | TextStyle = {
  borderBottomColor: palette.gray,
  borderBottomWidth: 1,
  width: '100%',
  paddingVertical: spacing.single,
  // backgroundColor: 'red',
  paddingHorizontal: 0,
  fontSize: fontSize.medium,
  fontWeight: '400',
};

export const Container: ViewStyle = {
  width,
  height,
  backgroundColor: palette.primary,
  padding: spacing.double,
};

export const MesseagesContainerHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  // marginVertical: spacing.single,
  // marginBottom: spacing.quintuple,
  height: '10%',
  // backgroundColor: 'red',
};

export const ContainerHeader: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginVertical: spacing.single,
  marginBottom: spacing.quintuple,
  // height: '10%',
  // backgroundColor: 'red',
};

export const ContainerHeaderSearch: ViewStyle = {
  backgroundColor: palette.black,
  width: spacing.quintuplehalf,
  height: spacing.quintuplehalf,
  borderRadius: 25,
  alignItems: 'center',
  justifyContent: 'center',
};

export const ContainerHeaderTitle: TextStyle = {
  fontSize: fontSize.mmmedium,
  fontWeight: '500',
  color: palette.white,
};

export const ContainerHeaderIcon: ImageStyle = {
  width: spacing.quintuplehalf,
  height: spacing.quintuplehalf,
  borderRadius: spacing.quintuplehalf,
};

export const StatusUserContainer: ViewStyle = {
  alignItems: 'center',
  marginLeft: spacing.double,
};

export const StatusUserImageContainer: ImageStyle = {
  width: spacing.sixfoldhalf,
  height: spacing.sixfoldhalf,
  borderRadius: spacing.sixfoldhalf,
};

export const StatusFullName: TextStyle = {
  marginTop: spacing.single,
  fontSize: fontSize.ssmall,
  color: palette.white,
  fontWeight: '400',
};

export const ChatsContainer: ViewStyle = {
  width,
  height: '70%',
  backgroundColor: palette.white,
  // backgroundColor: 'blue',
  // marginTop: spacing.quadruple,
  marginLeft: -spacing.double,
  borderTopLeftRadius: spacing.quadruple,
  borderTopRightRadius: spacing.quadruple,
  padding: spacing.double,
};

export const ChatTabContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.singlehalf,
  marginVertical: spacing.double,
};

export const ChatTabProfileImage: ImageStyle = {
  width: spacing.sixfoldhalf,
  height: spacing.sixfoldhalf,
  borderRadius: spacing.sixfoldhalf,
};

export const ChatTabName: TextStyle = {
  fontSize: fontSize.mmmedium,
  fontWeight: '500',
  color: palette.black,
};

export const ActiveStatus: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: spacing.double,
  height: spacing.double,
  borderRadius: spacing.double,
  backgroundColor: palette.green,
};

export const OfflineStatus: ViewStyle = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  width: spacing.double,
  height: spacing.double,
  borderRadius: spacing.double,
  backgroundColor: palette.gray,
};

export const NotificationContainer: ViewStyle = {
  width: spacing.triple,
  height: spacing.triple,
  borderRadius: spacing.double,
  backgroundColor: palette.orange,
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  right: spacing.single,
};

export const NotificationText: TextStyle = {
  color: palette.white,
};

// Chat

export const ChatContainer: ViewStyle = {
  flex: 1,
  width,
  height,
  backgroundColor: palette.white,
  padding: spacing.double,
};

export const ChatHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: spacing.single,
  // paddingVertical: spacing.double,
  paddingBottom: spacing.double,
  gap: spacing.singlehalf,
  // backgroundColor: 'red',
};

export const ChatHeaderTitle: TextStyle = {
  fontSize: fontSize.medium,
  fontWeight: '500',
  color: palette.black,
};

export const SmallGrayText: TextStyle = {
  fontSize: fontSize.small,
  color: palette.gray,
};

export const ChatFooterContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: palette.white,
  width: width,
  // height: spacing.tenfold,
  position: 'absolute',
  // bottom: spacing.single / 5,
  bottom: 0,
  // right: 0,
  paddingVertical: spacing.double,
  paddingHorizontal: spacing.triple,
  gap: spacing.double,
  borderTopColor: palette.primary,
  borderTopWidth: 1,
  // borderBottomColor: palette.primary,
  // borderBottomWidth: 1,
};

export const ChatFooterInput: ViewStyle | TextStyle = {
  backgroundColor: palette.gray,
  borderRadius: spacing.singlehalf,
  width: '100%',
  height: 40,
  paddingRight: spacing.quadruple,
  color: palette.darkgray,
};

export const FooterSubContainer: ViewStyle = {
  backgroundColor: 'white',
  height: 40,
  width: '100%',
  flexDirection: 'row',
  alignItems: 'center',
  gap: spacing.double,
};

export const FooterSendMessageButton: ViewStyle = {
  width: 40,
  height: 40,
  backgroundColor: palette.primary,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 40,
};

// Message \\

export const MessageByOtherContainer: ViewStyle = {
  flexDirection: 'row',
  // backgroundColor: 'red',
  // marginVertical: spacing.single,
  gap: spacing.single,
  alignItems: 'flex-end',
};

export const MessageByOtherAvatarContainer: ViewStyle = {
  width: spacing.quintuple,
  height: spacing.quintuple,
};

export const MessageByOtherAvatar: ImageStyle = {
  width: '100%',
  height: '100%',
  borderRadius: spacing.quintuple,
};

export const MessageByOtherContainerMessageContainer: ViewStyle = {
  backgroundColor: palette.palegray,
  // alignItems: 'center',
  // justifyContent: 'center',
  maxWidth: '65%',
  padding: spacing.singlehalf,
  borderRadius: spacing.singlehalf,
  // marginVertical: spacing.single,
  // borderBottomLeftRadius: 0,
};

export const MessageByOtherDateContainer: ViewStyle = {
  // justifyContent: 'center',
  // alignItems: 'center',
  marginLeft: spacing.sixfold + spacing.singlehalf,
};

export const MessageByMeContainer: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'flex-end',
  // backgroundColor: palette.paleprimary,
  // marginVertical: spacing.single,
  // marginBottom: spacing.single,
  marginBottom: spacing.half,
  // padding: spacing.singlehalf,
};

export const MessageByMeMessageContainer: ViewStyle = {
  backgroundColor: palette.primary,
  padding: spacing.singlehalf,
  borderRadius: spacing.singlehalf,
  borderTopRightRadius: 0,
  maxWidth: '65%',
};

export const MessageByMeText: TextStyle = {
  color: palette.white,
  fontSize: fontSize.ssmall,
  fontWeight: '400',
};

export const MainSearchBar: ViewStyle = {
  position: 'absolute',
  left: 0,
  width: '100%',
  backgroundColor: palette.palegray,
  zIndex: 1,
  borderRadius: spacing.singlehalf,
  padding: spacing.double,
  paddingVertical: spacing.singlehalf,
  flexDirection: 'row',
  alignItems: 'center',
  // justifyContent: 'space-between',
};

export const SettingsHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  gap: spacing.single,
  borderBottomColor: '#C2D0CC',
  borderBottomWidth: 0.5,
  marginVertical: spacing.single,
  paddingBottom: spacing.double,
};

export const RoundedImage: ImageStyle = {
  width: '100%',
  height: '100%',
  borderRadius: spacing.quintuple,
};

export const MediumBlackText: TextStyle = {
  fontSize: fontSize.medium,
  fontWeight: '600',
  color: palette.black,
};

export const LargeBlackText: TextStyle = {
  fontSize: fontSize.mmmedium,
  fontWeight: '600',
  color: palette.black,
};

export const createGroupContainer: ViewStyle = {
  width: width,
  height: height,
  backgroundColor: palette.white,
  padding: spacing.double,
};

export const createGroupHeaderContainer: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  // backgroundColor: 'red',
};

export const createGroupBackIcon: ViewStyle = {
  position: 'absolute',
  // left: 0,
  left: -spacing.single,
  // top: 0,
  top: -spacing.single,
  padding: spacing.double,
  height: '100%',
  // backgroundColor: 'gray',
  justifyContent: 'center',
  // left: 100,
  // top: 100,
};
