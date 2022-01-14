import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { COLORS, FONTS } from '../constants';

const TextButton = ({ label, containerStyle, onPress }) => {
  return (
    <TouchableOpacity
      style={{ ...styles.container, ...containerStyle }}
      onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 3,
    paddingHorizontal: 18,
    borderRadius: 18,
    backgroundColor: COLORS.gray1,
  },
  buttonText: { color: COLORS.white, ...FONTS.h3 },
});

export default TextButton;
