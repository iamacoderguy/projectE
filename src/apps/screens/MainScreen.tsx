import Button from 'apps/components/Button';
import R from 'apps/res/R';
import moment from 'moment';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';

const MainScreen: React.FC = (_props) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalContent, setModalContent] = useState<string>('');

  const handleTodayPress = () => {
    setModalVisible(true);
    setModalTitle('Today is:');
    setModalContent(moment().format('LL'));
  };

  return (
    <>
      <View style={styles.container}>
        <Button title={'TODAY'} onPress={handleTodayPress} />
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
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: R.colors.white,
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
    fontSize: 14,
  },
});

export default MainScreen;
