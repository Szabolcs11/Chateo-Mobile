import React, {useEffect} from 'react';
import Navigation from './src/navigation';
import NetInfo, {
  NetInfoState,
  useNetInfo,
} from '@react-native-community/netinfo';
import Offline from './src/pages/Offline';

export default function App() {
  const [hasWifi, setHasWifi] = React.useState<boolean>(true);
  const internetState: NetInfoState = useNetInfo();

  useEffect(() => {
    if (internetState.isConnected === false) {
      setHasWifi(false);
    } else {
      setHasWifi(true);
    }
  }, [internetState.isConnected]);

  if (hasWifi) {
    return <Navigation />;
  } else {
    return <Offline />;
  }
}
