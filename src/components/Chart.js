import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from '@rainbow-me/animated-charts';
import moment from 'moment';

import { SIZES, COLORS, FONTS } from '../constants';

const Chart = ({ containerStyle, chartPrices }) => {
  const startUnixTimestamp = moment().subtract(7, 'day').unix();

  const data = chartPrices
    ? chartPrices?.map((item, index) => {
        return {
          x: startUnixTimestamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  const points = monotoneCubicInterpolation({ data, range: 40 });

  const formatUSD = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    return `$${Number(value).toFixed(2)}`;
  };

  const formatDateTime = value => {
    'worklet';
    if (value === '') {
      return '';
    }
    const selectedDate = new Date(value * 1000);
    const date = `0${selectedDate.getDate()}`.slice(-2);
    const month = `0${selectedDate.getMonth() + 1}`.slice(-2);

    return `${date} / ${month}`;
  };

  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return `${value.toFixed(roundingPoint)}`;
    }
  };

  const getYAxisLabelValues = () => {
    if (chartPrices !== undefined) {
      const minValue = Math.min(...chartPrices);
      const maxValue = Math.max(...chartPrices);

      const midValue = (minValue + maxValue) / 2;

      const higherMidValue = (maxValue + midValue) / 2;
      const lowerMidValue = (minValue + midValue) / 2;

      const roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    } else {
      return [];
    }
  };

  return (
    <View style={{ ...containerStyle }}>
      {/* y axis label */}
      <View style={styles.chartYLabelContainer}>
        {getYAxisLabelValues().map((item, index) => {
          return (
            <Text key={index} style={styles.chartYLabel}>
              {item}
            </Text>
          );
        })}
      </View>

      {data.length > 0 && (
        <ChartPathProvider
          data={{
            points,
            smoothingStrategy: 'bezier',
          }}>
          <View>
            <ChartPath
              height={150}
              width={SIZES.width}
              stroke={COLORS.lightGreen}
              strokeWidth={2}
            />
            <ChartDot>
              <View style={styles.chartDotContainer}>
                {/* dot */}
                <View style={styles.chartDotInner}>
                  <View style={styles.chartDot} />
                </View>

                {/* y-label */}
                <ChartYLabel format={formatUSD} style={styles.yLabel} />

                {/* x-label */}
                <ChartXLabel format={formatDateTime} style={styles.xLabel} />
              </View>
            </ChartDot>
          </View>
        </ChartPathProvider>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  chartYLabelContainer: {
    position: 'absolute',
    left: SIZES.padding,
    top: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  chartYLabel: {
    color: COLORS.lightGray3,
    ...FONTS.body4,
  },
  chartDotContainer: {
    position: 'absolute',
    left: -35,
    width: 80,
    alignItems: 'center',
    backgroundColor: COLORS.transparentBlack1,
  },
  chartDotInner: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 25,
    height: 25,
    borderRadius: 15,
    backgroundColor: COLORS.white,
  },
  chartDot: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: COLORS.lightGreen,
  },
  yLabel: {
    color: COLORS.white,
    ...FONTS.body5,
  },
  xLabel: {
    marginTop: 3,
    color: COLORS.lightGray3,
    ...FONTS.body5,
    lineHeight: 15,
  },
});

export default Chart;
