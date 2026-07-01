/**
 * HistoryChart Component
 * Visualizes the user's mental age trend over time using Chart.js.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { TestResult } from '@/types';
import { formatDate } from '@/utils/helpers';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface HistoryChartProps {
  results: TestResult[];
}

const HistoryChart: React.FC<HistoryChartProps> = ({ results }) => {
  // Sort results by date (oldest first for chart)
  const sortedResults = [...results].reverse();
  
  const data = {
    labels: sortedResults.map(r => formatDate(r.timestamp).split(',')[0]),
    datasets: [
      {
        fill: true,
        label: 'Mental Age',
        data: sortedResults.map(r => r.mentalAgeScore),
        borderColor: theme.colors.accent,
        backgroundColor: 'rgba(0, 240, 255, 0.1)',
        tension: 0.4,
        pointBackgroundColor: theme.colors.accent,
        pointBorderColor: '#fff',
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(10, 15, 36, 0.9)',
        titleColor: theme.colors.accent,
        bodyColor: '#fff',
        borderColor: theme.colors.glassBorder,
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.05)' },
        ticks: { color: theme.colors.textMuted },
      },
      x: {
        grid: { display: false },
        ticks: { color: theme.colors.textMuted },
      },
    },
  };

  return (
    <ChartWrapper>
      <Line data={data} options={options} />
    </ChartWrapper>
  );
};

const ChartWrapper = styled.div`
  height: 200px;
  width: 100%;
  margin-bottom: 24px;
  background: ${theme.colors.surface};
  border-radius: ${theme.borders.radius.lg};
  padding: 16px;
  border: 1px solid ${theme.colors.glassBorder};
`;

export default HistoryChart;
