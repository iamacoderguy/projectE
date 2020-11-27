import React from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
} from 'react-native';
import R from 'apps/res/R';

type TextButtonProps = TouchableOpacityProps & {
  text: string;
  textStyle?: StyleProp<TextStyle>;
};

const TextButton: React.FC<TextButtonProps> = (props) => {
  const { text, textStyle, ...otherProps } = props;
  return (
    <TouchableOpacity style={styles.container} {...otherProps}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'baseline', // it will wrap-content the touchable area
  },
  text: {
    fontSize: 14,
    color: R.colors.black,
  },
});

export default TextButton;
