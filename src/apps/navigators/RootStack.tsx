import StatusBar from 'apps/components/StatusBar';
import R from 'apps/res/R';
import MainScreen from 'apps/screens/MainScreen';
import React from 'react';

const RootStack: React.FC = () => {
  return (
    <>
      <StatusBar
        barStyle={'dark-content'}
        topBackground={R.colors.white}
        bottomBackground={R.colors.white}>
        <MainScreen />
      </StatusBar>
    </>
  );
};

export default RootStack;
