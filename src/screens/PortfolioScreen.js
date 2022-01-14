import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { connect } from 'react-redux';
import { getHoldings as getHoldingsAction } from '../stores/market/marketActions';

import MainLayout from '../components/MainLayout';
import BalanceInfo from '../components/BalanceInfo';
import Chart from '../components/Chart';
import { COLORS, icons, dummyData } from '../constants';

import { styles } from './PortfolioScreen.styles';

const PortfolioScreen = ({ getHoldings, myHoldings }) => {
  const [selectedCoin, setSelectedCoin] = useState(null);

  useFocusEffect(
    useCallback(() => {
      getHoldings(dummyData.holdings);
    }, [getHoldings]),
  );

  const totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);

  const valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0,
  );

  const percChange = (valueChange / (totalWallet - valueChange)) * 100;

  console.log(myHoldings);

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* wallet section */}
        <View style={styles.walletContainer}>
          <Text style={styles.headerTitle}>Portfolio</Text>
          <BalanceInfo
            title="Current Balance"
            displayAmount={totalWallet}
            changePct={percChange}
            containerStyle={styles.balanceInfoContainer}
          />
        </View>

        {/* chart section */}
        <Chart
          containerStyle={styles.chartContainer}
          chartPrices={
            selectedCoin
              ? selectedCoin?.sparkline_in_7d?.value
              : myHoldings[0]?.sparkline_in_7d?.value
          }
        />

        {/* assets section */}
        <FlatList
          data={myHoldings}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContentContainer}
          ListHeaderComponent={
            <View>
              <Text style={styles.listHeaderTitle}>Your Assets</Text>

              {/* item headers */}
              <View style={styles.listItemHeadersContainer}>
                <Text style={styles.listItemHeader1}>Asset</Text>
                <Text style={styles.listItemHeader2}>Price</Text>
                <Text style={styles.listItemHeader2}>Holdings</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor =
              item.price_change_percentage_7d_in_currency === 0
                ? COLORS.lightGray3
                : item.price_change_percentage_7d_in_currency > 0
                ? COLORS.lightGreen
                : COLORS.red;

            return (
              <TouchableOpacity
                style={styles.listItemContainer}
                onPress={() => setSelectedCoin(item)}>
                {/* Coin Image - Name */}
                <View style={styles.coinImageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.coinImage}
                  />
                  <Text style={styles.coinName}>{item.name}</Text>
                </View>

                {/* Price */}
                <View style={styles.coinPriceContainer}>
                  <Text style={styles.coinPrice}>
                    {`$ ${item.current_price.toLocaleString()}`}
                  </Text>
                  <View style={styles.coinChangePercContainer}>
                    {item.price_change_percentage_7d_in_currency !== 0 && (
                      <Image
                        source={icons.upArrow}
                        style={styles.coinChangePercImage(
                          priceColor,
                          item.price_change_percentage_7d_in_currency,
                        )}
                      />
                    )}

                    <Text style={styles.coinChangePerc(priceColor)}>
                      {`${item.price_change_percentage_7d_in_currency.toFixed(
                        2,
                      )}%`}
                    </Text>
                  </View>
                </View>

                {/* Holdings */}
                <View style={styles.coinPriceContainer}>
                  <Text
                    style={
                      styles.totalHoldingsValue
                    }>{`$ ${item.total.toLocaleString()}`}</Text>
                  <Text style={styles.holdingsQty}>{`${
                    item.qty
                  } ${item.symbol.toUpperCase()}`}</Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioScreen);
