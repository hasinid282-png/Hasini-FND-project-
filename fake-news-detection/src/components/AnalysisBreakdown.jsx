import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Scale } from 'lucide-react';

const getColor = (score) => {
  if (score >= 80) return '#10b981'; // emerald
  if (score >= 65) return '#3b82f6'; // royal navy blue
  if (score >= 50) return '#f59e0b'; // amber
  if (score >= 35) return '#f97316'; // orange
  return '#f43f5e'; // rose
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-[#071326] border border-[#1e4079] p-3 rounded-lg shadow-xl text-xs">
        <div className="font-semibold text-white mb-1 flex items-center justify-between gap-4">
          <span>{data.name}</span>
          <span style={{ color: getColor(data.score) }} className="font-bold">{data.score}%</span>
        </div>
        <p className="text-blue-200/80 max-w-xs">{data.description}</p>
        <div className="mt-1 pt-1 border-t border-[#142d54] text-[10px] text-blue-300/60">
          Target Benchmark: {data.benchmark}%
        </div>
      </div>
    );
  }
  return null;
};

export default function AnalysisBreakdown({ details }) {
  if (!details) return null;

  const chartData = [
    {
      name: 'Factuality',
      score: details.factualityScore,
      benchmark: 80,
      description: 'Absence of contradictions with verified factual bases'
    },
    {
      name: 'Linguistic',
      score: details.linguisticScore,
      benchmark: 80,
      description: 'Objective vocabulary and measured journalistic tone'
    },
    {
      name: 'Source',
      score: details.sourceReliability,
      benchmark: 75,
      description: 'Domain reputation and institutional credibility'
    },
    {
      name: 'Emotional',
      score: details.emotionalBalance,
      benchmark: 75,
      description: 'Resistance to fear-mongering and anxiety manipulation'
    },
    {
      name: 'Clickbait Res.',
      score: Math.max(0, 100 - (details.clickbaitRatio || 0)),
      benchmark: 85,
      description: 'Headline and text integrity without sensationalism'
    }
  ];

  return (
    <div className="bg-[var(--navy-card)] rounded-2xl border border-[var(--navy-border)] p-5 shadow-lg transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-[var(--text-main)] flex items-center gap-2">
            <Scale className="w-4 h-4 text-blue-400" />
            Verification Vector Breakdown
          </h3>
          <p className="text-xs text-[var(--text-dim)]">Evaluated across 5 linguistic and fact-checking dimensions</p>
        </div>
        <span className="text-[11px] text-[var(--text-dim)] bg-[var(--navy-surface)] px-2.5 py-1 rounded-md border border-[var(--navy-border)]">
          Scale: 0 - 100%
        </span>
      </div>

      {/* Recharts BarChart */}
      <div className="h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#3b82f6', opacity: 0.3 }}
            />
            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: '#3b82f6', opacity: 0.3 }}
              ticks={[0, 25, 50, 75, 100]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Grid of indicators */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-[var(--navy-border-subtle)]">
        <div className="bg-[var(--navy-surface)] p-2.5 rounded-xl border border-[var(--navy-border)]">
          <div className="text-[11px] text-[var(--text-dim)]">Clickbait Penalty</div>
          <div className="text-base font-bold text-[var(--text-main)] mt-0.5">
            {details.clickbaitRatio}%
          </div>
        </div>
        <div className="bg-[var(--navy-surface)] p-2.5 rounded-xl border border-[var(--navy-border)]">
          <div className="text-[11px] text-[var(--text-dim)]">Source Credibility</div>
          <div className="text-base font-bold text-[var(--text-main)] mt-0.5">
            {details.sourceReliability}%
          </div>
        </div>
        <div className="bg-[var(--navy-surface)] p-2.5 rounded-xl border border-[var(--navy-border)] col-span-2 sm:col-span-1">
          <div className="text-[11px] text-[var(--text-dim)]">Word Count</div>
          <div className="text-base font-bold text-[var(--text-main)] mt-0.5">
            {details.wordCount || 0} words
          </div>
        </div>
      </div>
    </div>
  );
}
