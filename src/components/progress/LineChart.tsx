
import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LineChart as RNLineChart } from 'react-native-chart-kit';
import { Card } from '@/src/components/common/Card';
import { colors, spacing, typography } from '@/styles/commonStyles';
import { ChartDataPoint } from '@/src/types';

interface LineChartProps {
  title: string;
  data: ChartDataPoint[];
  color: string;
  unit?: string;
}

/**
 * Line chart per visualizzare progressi
 */
export const LineChart: React.FC<LineChartProps> = ({ title, data, color, unit = '' }) => {
  const screenWidth = Dimensions.get('window').width - (spacing.xl * 2);

  if (data.length === 0) {
    return (
      <Card>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.noData}>Nessun dato disponibile</Text>
      </Card>
    );
  }

  const chartData = {
    labels: data.slice(-7).map(d => {
      const date = new Date(d.date);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [{
      data: data.slice(-7).map(d => d.value),
    }],
  };

  return (
    <Card>
      <Text style={styles.title}>{title}</Text>
      <RNLineChart
        data={chartData}
        width={screenWidth - (spacing.xl * 2)}
        height={220}
        chartConfig={{
          backgroundColor: colors.card,
          backgroundGradientFrom: colors.card,
          backgroundGradientTo: colors.card,
          decimalPlaces: 1,
          color: (opacity = 1) => color,
          labelColor: (opacity = 1) => colors.textSecondary,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: color,
          },
        }}
        bezier
        style={styles.chart}
      />
      {data.length > 0 && (
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Ultimo</Text>
            <Text style={styles.statValue}>{data[data.length - 1].value}{unit}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Media</Text>
            <Text style={styles.statValue}>
              {(data.reduce((sum, d) => sum + d.value, 0) / data.length).toFixed(1)}{unit}
            </Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statLabel}>Migliore</Text>
            <Text style={styles.statValue}>
              {Math.max(...data.map(d => d.value))}{unit}
            </Text>
          </View>
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  title: {
    ...typography.heading,
    color: colors.text,
    marginBottom: spacing.lg,
  },
  chart: {
    marginVertical: spacing.md,
    borderRadius: 16,
  },
  noData: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingVertical: spacing.xxxl,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  statValue: {
    ...typography.bodyBold,
    color: colors.text,
  },
});
