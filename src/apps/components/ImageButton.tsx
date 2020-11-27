import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageSourcePropType,
  TouchableOpacityProps,
  StyleProp,
  ImageStyle,
} from 'react-native';

type ImageButtonProps = TouchableOpacityProps & {
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
};

const ImageButton: React.FC<ImageButtonProps> = (props: ImageButtonProps) => {
  const { icon, style, iconStyle, disabled, ...otherProps } = props;

  return (
    <TouchableOpacity
      style={[styles.container, style]}
      disabled={disabled}
      {...otherProps}>
      <Image
        source={icon}
        style={[
          styles.icon,
          iconStyle,
          {
            ...(disabled && {
              opacity: 0.3,
            }),
          },
        ]}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexShrink: 1,
    alignItems: 'center',
  },
  icon: {},
});

export default ImageButton;
