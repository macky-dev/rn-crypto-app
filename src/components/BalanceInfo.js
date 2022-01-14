import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { SIZES, COLORS, FONTS, icons } from '../constants';

const BalanceInfo = ({ title, displayAmount, changePct, containerStyle }) => {
  return (
    <View style={{ ...containerStyle }}>
      {/* title */}
      <Text style={styles.title}>{title}</Text>

      {/* amount */}
      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>$</Text>
        <Text style={styles.amountText}>{displayAmount.toLocaleString()}</Text>
        <Text style={styles.currencySymbol}> USD</Text>
      </View>

      {/* change percentage */}
      <View style={styles.percentageContainer}>
        {changePct !== 0 && (
          <Image source={icons.upArrow} style={styles.image(changePct)} />
        )}
        <Text style={styles.percentageValue(changePct)}>
          {changePct.toFixed(2)}%
        </Text>
        <Text style={styles.daysOfChange}>7d change</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    color: COLORS.white,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  currencySymbol: {
    ...FONTS.h3,
    color: COLORS.lightGray3,
  },
  amountText: {
    marginLeft: SIZES.base,
    ...FONTS.h2,
    color: COLORS.white,
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  image: changePct => ({
    width: 10,
    height: 10,
    alignSelf: 'center',
    tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
    transform: changePct > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }],
  }),
  percentageValue: changePct => ({
    marginLeft: SIZES.base,
    alignSelf: 'flex-end',
    color: changePct > 0 ? COLORS.lightGreen : COLORS.red,
    ...FONTS.h4,
  }),
  daysOfChange: {
    marginLeft: SIZES.radius,
    alignSelf: 'flex-end',
    color: COLORS.lightGray3,
    ...FONTS.h5,
  },
});

export default BalanceInfo;
