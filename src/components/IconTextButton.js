import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const IconTextButton = ({ label, icon, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}>
      <Image source={icon} resizeMode="contain" style={styles.image} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
  image: {
    height: 20,
    width: 20,
  },
  label: {
    marginLeft: SIZES.base,
    ...FONTS.h3,
  },
});

export default IconTextButton;
