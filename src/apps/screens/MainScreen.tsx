import Button from 'apps/components/Button';
import ImageButton from 'apps/components/ImageButton';
import TextButton from 'apps/components/TextButton';
import R from 'apps/res/R';
import moment from 'moment';
import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const intervalMilliseconds = 100;

const MainScreen: React.FC = (_props) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');

  const [_intervalId, setIntervalId] = useState<number>();
  const [daysFromNow, setDaysFromNow] = useState<number>(21);
  const valueRef = useRef(daysFromNow);
  valueRef.current = daysFromNow;

  const handleTodayPress = () => {
    setModalVisible(true);
    setModalTitle('Today is:');
    setModalContent(moment().format('LL'));
  };

  const handleDaysFromNowPress = () => {
    setModalVisible(true);
    setModalTitle(`${daysFromNow} days from now is:`);
    setModalContent(moment().add(daysFromNow, 'day').format('LL'));
  };

  const plus = () => {
    const newValue = valueRef.current + 1;
    if (isOutOfRange(newValue)) {
      return;
    }

    setDaysFromNow(newValue);
    return newValue;
  };

  const minus = () => {
    const newValue = valueRef.current - 1;
    if (isOutOfRange(newValue)) {
      return;
    }

    setDaysFromNow(newValue);
    return newValue;
  };

  const isOutOfRange = (value: number) => {
    return value < Number(0) || value > Number(Infinity);
  };

  const handlePlusPressIn = () => {
    plus();

    const intervalId = (setInterval(
      plus,
      intervalMilliseconds,
    ) as unknown) as number;
    setIntervalId(intervalId);
  };

  const handlePlusPressOut = () => {
    if (_intervalId) {
      clearInterval(_intervalId);
      setIntervalId(undefined);
    }
  };

  const handleMinusPressIn = () => {
    minus();

    const intervalId = (setInterval(
      minus,
      intervalMilliseconds,
    ) as unknown) as number;
    setIntervalId(intervalId);
  };

  const handleMinusPressOut = () => {
    if (_intervalId) {
      clearInterval(_intervalId);
      setIntervalId(undefined);
    }
  };

  const handleShortcutLinkPress = (days: number) => setDaysFromNow(days);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <View style={styles.item}>
        <Button title={'TODAY'} onPress={handleTodayPress} />
      </View>
      <View style={styles.item}>
        <View style={styles.daysFromNowRow}>
          <ImageButton
            icon={R.images.minus}
            style={styles.plusMinusButton}
            iconStyle={styles.plusMinusIcon}
            onPressIn={handleMinusPressIn}
            onPressOut={handleMinusPressOut}
            disabled={daysFromNow <= 0}
          />
          <Button
            title={daysFromNow.toString()}
            onPress={handleDaysFromNowPress}
          />
          <ImageButton
            icon={R.images.plus}
            style={styles.plusMinusButton}
            iconStyle={styles.plusMinusIcon}
            onPressIn={handlePlusPressIn}
            onPressOut={handlePlusPressOut}
          />
        </View>
        <View style={styles.daysFromNowRow}>
          <TextButton
            text={'7 days'}
            textStyle={styles.link}
            onPress={() => handleShortcutLinkPress(7)}
          />
          <TextButton
            text={'21 days'}
            textStyle={styles.link}
            onPress={() => handleShortcutLinkPress(21)}
          />
          <TextButton
            text={'30 days'}
            textStyle={styles.link}
            onPress={() => handleShortcutLinkPress(30)}
          />
          <TextButton
            text={'100 days'}
            textStyle={styles.link}
            onPress={() => handleShortcutLinkPress(100)}
          />
        </View>
      </View>
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.title}>{modalTitle}</Text>
          <Text style={styles.content}>{modalContent}</Text>
        </View>
      </ReactNativeModal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.white,
    marginVertical: 10,
  },
  modalView: {
    backgroundColor: R.colors.white,
    marginHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 16,
    overflow: 'hidden',
    alignItems: 'center',
  },
  title: {
    color: R.colors.black,
    fontSize: 18,
    marginBottom: 15,
  },
  content: {
    color: R.colors.black,
    fontSize: 16,
  },
  daysFromNowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  plusMinusButton: {
    padding: 20,
  },
  plusMinusIcon: {
    width: 30,
    height: 30,
    tintColor: R.colors.black,
  },
  link: {
    textDecorationLine: 'underline',
    marginHorizontal: 5,
    fontSize: 16,
  },
});

export default MainScreen;
