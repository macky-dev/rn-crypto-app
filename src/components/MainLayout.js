import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { connect } from 'react-redux';

import { COLORS, SIZES, icons } from '../constants';
import IconTextButton from './IconTextButton';

const MainLayout = ({ children, isTradeModalVisible }) => {
  const modalAnimatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isTradeModalVisible) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [modalAnimatedValue, isTradeModalVisible]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 280],
  });

  return (
    <View style={styles.container}>
      {children}

      {/* dim background */}
      {isTradeModalVisible && (
        <Animated.View
          style={styles.dimBackgroundView}
          opacity={modalAnimatedValue}
        />
      )}

      {/* modal */}
      <Animated.View style={{ ...styles.animatedView, top: modalY }}>
        <IconTextButton
          label="Transfer"
          icon={icons.send}
          onPress={() => console.log('Transfer')}
        />
        <IconTextButton
          label="Withdraw"
          icon={icons.withdraw}
          onPress={() => console.log('Withdraw')}
          containerStyle={{
            marginTop: SIZES.base,
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedView: {
    position: 'absolute',
    left: 0,
    width: '100%',
    padding: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  dimBackgroundView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.transparentBlack,
  },
});

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
