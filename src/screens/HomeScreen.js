import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import {
  getHoldings as getHoldingsAction,
  getCoinMarket as getCoinMarketAction,
} from '../stores/market/marketActions';

import MainLayout from '../components/MainLayout';
import BalanceInfo from '../components/BalanceInfo';
import IconTextButton from '../components/IconTextButton';
import Chart from '../components/Chart';
import { COLORS, dummyData, icons } from '../constants';

import { styles } from './HomeScreen.styles';

const HomeScreen = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
      getCoinMarket();
    }, [getHoldings, getCoinMarket]),
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );

  const percChange = (valueChange / (totalWallet - valueChange)) * 100;

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* wallet section */}
        <View style={styles.walletContainer}>
          <BalanceInfo
            title="Your Wallet"
            displayAmount={totalWallet}
            changePct={percChange}
            containerStyle={styles.balanceInfoContainer}
          />
          {/* buttons */}
          <View style={styles.walletButtonsContainer}>
            <IconTextButton
              label="Transfer"
              icon={icons.send}
              containerStyle={styles.transferButton}
              onPress={() => console.log('Transfer pressed')}
            />
            <IconTextButton
              label="Withdraw"
              icon={icons.withdraw}
              containerStyle={styles.withdrawButton}
              onPress={() => console.log('Withdraw pressed')}
            />
          </View>
        </View>

        {/* chart section */}
        <Chart
          containerStyle={styles.chartContainer}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.price
              : coins[0]?.sparkline_in_7d?.price
          }
        />

        {/* top cryptocurrencies */}
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={
            <View style={styles.listHeaderContainer}>
              <Text style={styles.listHeaderTitle}>Top Cryptocurrency</Text>
            </View>
          }
          renderItem={({ item }) => {
            const priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => setSelectedCoin(item)}>
                {/* Coin Image */}
                <View style={styles.coinImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.coinImage}
                  />
                </View>

                {/* Coin Name */}
                <View style={styles.coinNameContainer}>
                  <Text style={styles.coinName}>{item.name}</Text>
                </View>

                {/* Figures */}
                <View>
                  <Text style={styles.coinCurrentPrice}>
                    {`$ ${
                      item.current_price < 1
                        ? item.current_price
                        : item.current_price.toLocaleString()
                    }`}
                  </Text>

                  <View style={styles.coinChangePercContainer}>
                    <Image
                      source={icons.upArrow}
                      style={styles.coinChangePercImage(
                        priceColor,
                        item.price_change_percentage_7d_in_currency,
                      )}
                    />
                    <Text style={styles.coinChangePerc(priceColor)}>
                      {`${item.price_change_percentage_7d_in_currency.toFixed(
                        2,
                      )}%`}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
          ListFooterComponent={<View style={styles.listFooterContainer} />}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getHoldings: (
      holdings,
      currency,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getHoldingsAction(
          holdings,
          currency,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page,
    ) => {
      return dispatch(
        getCoinMarketAction(
          currency,
          coinList,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page,
        ),
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
