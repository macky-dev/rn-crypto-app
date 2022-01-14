import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { connect } from 'react-redux';
import { setTradeModalVisibilty as setTradeModalVisibiltyAction } from '../stores/tab/tabActions';

import HomeScreen from '../screens/HomeScreen';
import MarketScreen from '../screens/MarketScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TabIcon from '../components/TabIcon';
import { COLORS, icons } from '../constants';
import { TouchableOpacity, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const TabBarCustomButton = ({ children, onPress }) => {
  return (
    <TouchableOpacity style={styles.tradeButtonContainer} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const Tabs = ({ setTradeModalVisibilty, isTradeModalVisible }) => {
  const onTradeTabClicked = () => {
    setTradeModalVisibilty(!isTradeModalVisible);
  };

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.home} label="Home" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Portfolio"
        component={PortfolioScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.briefcase}
                  label="Portfolio"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Trade"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                icon={isTradeModalVisible ? icons.close : icons.trade}
                iconStyle={isTradeModalVisible ? styles.closeIconStyle : null}
                label="Trade"
                isTrade
              />
            );
          },
          tabBarButton: props => (
            <TabBarCustomButton
              {...props}
              onPress={() => onTradeTabClicked()}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Market"
        component={MarketScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon focused={focused} icon={icons.market} label="Market" />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            if (!isTradeModalVisible) {
              return (
                <TabIcon
                  focused={focused}
                  icon={icons.profile}
                  label="Profile"
                />
              );
            }
          },
        }}
        listeners={{
          tabPress: e => {
            if (isTradeModalVisible) {
              e.preventDefault();
            }
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.primary,
    borderTopColor: 'transparent',
    height: 140,
  },
  tradeButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIconStyle: {
    width: 15,
    height: 15,
  },
});

const mapStateToProps = state => {
  return {
    isTradeModalVisible: state.tabReducer.isTradeModalVisible,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setTradeModalVisibilty: isVisible => {
      return dispatch(setTradeModalVisibiltyAction(isVisible));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);
