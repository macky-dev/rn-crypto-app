import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  tabBarContainer: {
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.gray,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
    marginHorizontal: SIZES.radius,
  },
  animatedFlatlistContainer: {
    marginTop: SIZES.padding,
  },
  animatedFlatlistItemContainer: {
    flex: 1,
    width: SIZES.width,
  },
  coinItemContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },
  coinSectionContainer: {
    flex: 1.5,
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
    ...FONTS.h3,
  },
  lineChartContainer: {
    flex: 1,
    alignItems: 'center',
  },
  lineChart: {
    paddingRight: 0,
  },
  figuresContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  currentPrice: {
    color: COLORS.white,
    ...FONTS.h4,
  },
  changePercContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  changePercImage: (priceColor, changePerc) => ({
    height: 10,
    width: 10,
    tintColor: priceColor,
    transform: changePerc > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }],
  }),
  changePercValue: priceColor => ({
    marginLeft: 5,
    color: priceColor,
    ...FONTS.body5,
  }),
});
