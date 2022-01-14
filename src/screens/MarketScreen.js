import React, {
  useEffect,
  useRef,
  createRef,
  useState,
  useCallback,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { connect } from 'react-redux';
import { getCoinMarket as getCoinMarketAction } from '../stores/market/marketActions';

import MainLayout from '../components/MainLayout';
import HeaderBar from '../components/HeaderBar';
import TextButton from '../components/TextButton';
import { styles } from './MarketScreen.styles';
import { constants, COLORS, FONTS, SIZES, icons } from '../constants';

const marketTabs = constants.marketTabs.map(marketTab => ({
  ...marketTab,
  ref: createRef(),
}));

const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width);

  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: measureLayout.map(measure => measure.x),
  });

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        height: '100%',
        width: (SIZES.width - SIZES.radius * 2) / 2,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray,
        transform: [
          {
            translateX,
          },
        ],
      }}
    />
  );
};

const Tabs = ({ scrollX, onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    let ml = [];

    marketTabs.forEach(marketTab => {
      marketTab?.ref?.current?.measureLayout(
        containerRef.current,
        (x, y, width, height) => {
          ml.push({ x, y, width, height });

          if (ml.length === marketTabs.length) {
            setMeasureLayout(ml);
          }
        },
      );
    });
  }, [containerRef.current]);

  return (
    <View ref={containerRef} style={{ flexDirection: 'row' }}>
      {/* Tab indicator */}

      {measureLayout.length > 0 && (
        <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
      )}

      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity
            key={`MarketTab-${index}`}
            style={{ flex: 1 }}
            onPress={() => onMarketTabPress(index)}>
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: 'center',
                justifyContent: 'center',
                height: 40,
              }}>
              <Text
                style={{
                  color: COLORS.white,
                  ...FONTS.h3,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const MarketScreen = ({ getCoinMarket, coins }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef = useRef();

  const onMarketTabPress = useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset: marketTabIndex * SIZES.width,
    });
  });

  useEffect(() => {
    getCoinMarket();
  }, []);

  return (
    <MainLayout>
      <View style={styles.container}>
        {/* Header */}
        <HeaderBar title="Market" />

        {/* Tab bar */}
        <View style={styles.tabBarContainer}>
          <Tabs scrollX={scrollX} onMarketTabPress={onMarketTabPress} />
        </View>

        {/* Buttons */}
        <View style={styles.filterButtonsContainer}>
          <TextButton label="USD" />
          <TextButton
            label="% (7d)"
            containerStyle={{ marginLeft: SIZES.base }}
          />
          <TextButton label="Top" containerStyle={{ marginLeft: SIZES.base }} />
        </View>

        {/* Market List */}
        <Animated.FlatList
          ref={marketTabScrollViewRef}
          data={marketTabs}
          contentContainerStyle={styles.animatedFlatlistContainer}
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            },
          )}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.animatedFlatlistItemContainer}>
                <FlatList
                  data={coins}
                  keyExtractor={item => item.id}
                  renderItem={({ item, index }) => {
                    const priceColor =
                      item.price_change_percentage_7d_in_currency === 0
                        ? COLORS.lightGray3
                        : item.price_change_percentage_7d_in_currency > 0
                        ? COLORS.lightGreen
                        : COLORS.red;

                    return (
                      <View style={styles.coinItemContainer}>
                        {/* Coin section */}
                        <View style={styles.coinSectionContainer}>
                          <Image
                            source={{ uri: item.image }}
                            style={styles.coinImage}
                          />
                          <Text style={styles.coinName}>{item.name}</Text>
                        </View>

                        {/* Line Chart section */}
                        <View style={styles.lineChartContainer}>
                          <LineChart
                            withVerticalLabels={false}
                            withHorizontalLabels={false}
                            withDots={false}
                            withInnerLines={false}
                            withVerticalLines={false}
                            withOuterLines={false}
                            data={{
                              datasets: [
                                {
                                  data: item.sparkline_in_7d.price,
                                },
                              ],
                            }}
                            width={100}
                            height={100}
                            chartConfig={{
                              color: () => priceColor,
                            }}
                            bezier
                            style={styles.lineChart}
                          />
                        </View>

                        {/* Figures */}
                        <View style={styles.figuresContainer}>
                          <Text style={styles.currentPrice}>
                            {`$ ${item.current_price}`}
                          </Text>
                          <View style={styles.changePercContainer}>
                            {item.price_change_percentage_7d_in_currency !==
                              0 && (
                              <Image
                                source={icons.upArrow}
                                style={styles.changePercImage(
                                  priceColor,
                                  item.price_change_percentage_7d_in_currency,
                                )}
                              />
                            )}
                            <Text
                              style={styles.changePercValue(
                                priceColor,
                              )}>{`${item.price_change_percentage_7d_in_currency.toFixed(
                              2,
                            )}%`}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  }}
                />
              </View>
            );
          }}
        />
      </View>
    </MainLayout>
  );
};

const mapStateToProps = state => {
  return {
    coins: state.marketReducer.coins,
  };
};

const mapDispatchToProps = dispatch => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
