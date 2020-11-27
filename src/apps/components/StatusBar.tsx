import React from 'react';
import {
  StatusBar as StatusBarRN,
  SafeAreaView,
  StatusBarProps as RNStatusBarProps,
  StyleSheet,
} from 'react-native';

type StatusBarProps = Omit<RNStatusBarProps, 'backgroundColor'> & {
  topBackground?: string;
  bottomBackground?: string;
  children?: React.ReactNode;
};

const StatusBar: React.FC<StatusBarProps> = (props: StatusBarProps) => {
  const { topBackground, bottomBackground, children, ...otherProps } = props;
  const topStyle = [styles.top, { backgroundColor: topBackground }];
  const bottomStyle = [styles.bottom, { backgroundColor: bottomBackground }];

  return (
    <>
      <StatusBarRN {...otherProps} backgroundColor={topBackground} />
      <SafeAreaView style={topStyle} />
      <SafeAreaView style={bottomStyle}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  top: {
    flex: 0,
  },
  bottom: {
    flex: 1,
  },
});

export default StatusBar;
