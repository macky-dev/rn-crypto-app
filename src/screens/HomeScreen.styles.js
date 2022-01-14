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
  walletButtonsContainer: {
    flexDirection: 'row',
    marginTop: 30,
    marginBottom: -15,
    paddingHorizontal: SIZES.radius,
  },
  transferButton: {
    flex: 1,
    height: 40,
    marginRight: SIZES.radius,
  },
  withdrawButton: {
    flex: 1,
    height: 40,
  },
  balanceInfoContainer: {
    marginTop: 50,
  },
  chartContainer: {
    marginTop: SIZES.padding * 2,
  },
  listHeaderContainer: {
    marginBottom: SIZES.radius,
  },
  listHeaderTitle: { color: COLORS.white, ...FONTS.h3, fontSize: 18 },
  listContentContainer: {
    marginTop: 30,
    paddingHorizontal: SIZES.padding,
  },
  listItemContainer: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinImageContainer: { width: 35 },
  coinImage: {
    height: 20,
    width: 20,
  },
  coinNameContainer: { flex: 1 },
  coinName: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  coinCurrentPrice: {
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h4,
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
  listFooterContainer: {
    marginBottom: 50,
  },
});
