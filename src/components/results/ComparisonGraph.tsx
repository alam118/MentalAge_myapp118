/**
 * ComparisonGraph Component
 * A visual radar chart comparing various mental attributes.
 */

import React from 'react';
import styled from 'styled-components';
import { theme } from '@/styles/theme';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ComparisonGraphProps {
  mentalAge: number;
  chronologicalAge: number;
}

const ComparisonGraph: React.FC<ComparisonGraphProps> = ({ mentalAge, chronologicalAge }) => {
  const data = {
    labels: ['Logic', 'Empathy', 'Creativity', 'Maturity', 'Energy', 'Experience'],
    datasets: [
      {
        label: 'Mental Archetype',
        data: [85, 70, 90, 65, 80, 75], // These would be derived from scoreData in a real build
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
        borderColor: theme.colors.accent,
        borderWidth: 2,
        pointBackgroundColor: theme.colors.accent,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: theme.colors.textMuted, font: { size: 10 } },
        ticks: { display: false, count: 5 },
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <Wrapper>
      <GraphContainer>
        <Radar data={data} options={options} />
      </GraphContainer>
      <LegendBox>
        <AgeBox>
          <AgeLabel>Real</AgeLabel>
          <AgeValue>{chronologicalAge}</AgeValue>
        </AgeBox>
        <AgeBox highlight>
          <AgeLabel>Mental</AgeLabel>
          <AgeValue>{mentalAge}</AgeValue>
        </AgeBox>
      </LegendBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: ${theme.colors.surface};
  border-radius: ${theme.borders.radius.xl};
  padding: 24px;
  border: 1px solid ${theme.colors.glassBorder};
`;

const GraphContainer = styled.div`
  height: 250px;
  width: 100%;
  margin-bottom: 20px;
`;

const LegendBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
`;

const AgeBox = styled.div<{ highlight?: boolean }>`
  text-align: center;
  padding: 8px 16px;
  background: ${({ highlight }) => (highlight ? theme.colors.primaryGradient : 'rgba(255,255,255,0.05)')};
  border-radius: ${theme.borders.radius.md};
  min-width: 80px;
`;

const AgeLabel = styled.div`
  font-size: 10px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2px;
`;

const AgeValue = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #fff;
`;

export default ComparisonGraph;
