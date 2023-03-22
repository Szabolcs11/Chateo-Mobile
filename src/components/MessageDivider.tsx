import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {YYYYMMDDDate} from '../constans/globalFunctions';
import {palette, spacing} from '../style';

type DividerType = {
  Date: Date;
};

export default function MessageDivider(props: DividerType) {
  const [displayDate, setDisplayDate] = useState<Date | string>(
    new Date(props.Date),
  );
  useEffect(() => {
    if (new Date().getDate() - 1 == new Date(props.Date).getDate()) {
      setDisplayDate('Yesterday');
    }
    if (new Date().getDate() == new Date(props.Date).getDate()) {
      setDisplayDate('Today');
    }
  }, []);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        marginVertical: spacing.double,
      }}>
      <View
        style={{
          backgroundColor: palette.palewhite,
          padding: spacing.single,
          borderRadius: spacing.single,
        }}>
        <Text style={{fontWeight: '600', color: palette.black}}>
          {YYYYMMDDDate(displayDate)}
        </Text>
      </View>
    </View>
  );
}
