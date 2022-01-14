import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  walletContainer: {
    paddingHorizontal: SIZES.padding,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: COLORS.gray,
  },
  headerTitle: {
    color: COLORS.white,
    ...FONTS.largeTitle,
    marginTop: 50,
  },
  balanceInfoContainer: {
    marginTop: SIZES.radius,
    marginBottom: SIZES.padding,
  },
  chartContainer: {
    marginTop: SIZES.radius,
  },
  listContentContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  listHeaderTitle: { color: COLORS.white, ...FONTS.h2 },
  listItemHeadersContainer: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
  },
  listItemHeader1: {
    flex: 1,
    color: COLORS.lightGray3,
  },
  listItemHeader2: {
    flex: 1,
    color: COLORS.lightGray3,
    textAlign: 'right',
  },
  listItemContainer: {
    height: 55,
    flexDirection: 'row',
  },
  coinImageContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinImage: {
    height: 20,
    width: 20,
  },
  coinName: {
    marginLeft: SIZES.radius,
    color: COLORS.white,
    ...FONTS.h4,
  },
  coinPriceContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  coinPrice: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
    lineHeight: 15,
  },
  coinChangePercContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  coinChangePercImage: (priceColor, changePerc) => ({
    height: 10,
    width: 10,
    tintColor: priceColor,
    transform: changePerc > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }],
  }),
  coinChangePerc: priceColor => ({
    marginLeft: 5,
    color: priceColor,
    ...FONTS.body5,
    lineHeight: 15,
  }),
  totalHoldingsValue: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
    lineHeight: 15,
  },
  holdingsQty: {
    textAlign: 'right',
    color: COLORS.lightGray3,
    ...FONTS.body5,
    lineHeight: 15,
  },
  listFooterContainer: {
    marginBottom: 50,
  },
});
