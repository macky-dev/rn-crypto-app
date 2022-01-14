import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONTS } from '../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.black,
  },
  emailIdContainer: {
    flexDirection: 'row',
    marginTop: SIZES.radius,
  },
  emailIdContainerInnerLeft: {
    flex: 1,
  },
  emailIdContainerInnerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailText: {
    color: COLORS.white,
    ...FONTS.h3,
  },
  idText: {
    color: COLORS.lightGray3,
    ...FONTS.body4,
  },
  verifiedImage: {
    height: 25,
    width: 25,
  },
  verifiedText: {
    marginLeft: SIZES.base,
    color: COLORS.lightGreen,
    ...FONTS.body4,
  },
  sectionTitleContainer: {
    marginTop: SIZES.padding,
  },
  sectionTitle: {
    color: COLORS.lightGray3,
    ...FONTS.h4,
  },
  settingItemContainer: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
  },
  settingItemText: {
    flex: 1,
    color: COLORS.white,
    ...FONTS.h3,
  },
  settingItemValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingItemValue: {
    marginRight: SIZES.radius,
    color: COLORS.lightGray3,
    ...FONTS.h3,
  },
  settingItemValueIcon: {
    height: 15,
    width: 15,
    tintColor: COLORS.white,
  },
});
