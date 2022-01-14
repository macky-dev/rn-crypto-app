import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { COLORS, FONTS, SIZES } from '../constants';

const HeaderBar = ({ title }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    paddingHorizontal: SIZES.radius,
    justifyContent: 'flex-end',
  },
  text: {
    color: COLORS.white,
    ...FONTS.largeTitle,
  },
});

export default HeaderBar;
