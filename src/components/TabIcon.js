import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '../constants';

const TabIcon = ({ focused, icon, iconStyle, label, isTrade }) => {
  if (isTrade) {
    return (
      <View style={styles.tradeContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ ...styles.tradeImage, ...iconStyle }}
        />
        <Text style={styles.tradeLabel}>{label}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.tabContainer}>
        <Image
          source={icon}
          resizeMode="contain"
          style={{ ...styles.tabImage(focused), ...iconStyle }}
        />
        <Text style={styles.tabLabel(focused)}>{label}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabImage: isFocused => ({
    width: 25,
    height: 25,
    tintColor: isFocused ? COLORS.white : COLORS.secondary,
  }),
  tabLabel: isFocused => ({
    color: isFocused ? COLORS.white : COLORS.secondary,
    ...FONTS.h4,
  }),
  tradeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.black,
  },
  tradeImage: {
    width: 25,
    height: 25,
    tintColor: COLORS.white,
  },
  tradeLabel: {
    color: COLORS.white,
    ...FONTS.h4,
  },
});

export default TabIcon;
