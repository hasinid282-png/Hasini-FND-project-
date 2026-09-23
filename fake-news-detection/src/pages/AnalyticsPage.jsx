import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Zap,
  Award,
  Layers
} from 'lucide-react';
import {
  MISINFORMATION_STATS,
  TRENDING_CATEGORIES,
  LINGUISTIC_TACTICS
} from '../data/mockArticles';

export default function AnalyticsPage() {
  // Pie chart data for overall classification distribution
  const pieData = [
    { name: 'Authentic / Verified', value: MISINFORMATION_STATS.authenticCount, color: '#10b981' },
    { name: 'Fake News / Fabricated', value: MISINFORMATION_STATS.fakeCount, color: '#f43f5e' },
    { name: 'Questionable / Mixed', value: MISINFORMATION_STATS.questionableCount, color: '#f59e0b' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-wider mb-3">
          <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
          Disinformation Intelligence Insights
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Misinformation Trends & Analytics
        </h1>
        <p className="text-[var(--text-dim)] mt-2 text-sm max-w-2xl">
          Aggregated heuristic statistics, deception vectors, and category risk vulnerability across analyzed digital content.
        </p>
      </div>

      {/* High-Level Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-[var(--text-dim)] text-xs font-semibold mb-2">
            <span>Total Evaluated</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            {MISINFORMATION_STATS.totalAnalyzed.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1 font-medium">
            <TrendingUp className="w-3 h-3" /> +14% monthly volume
          </div>
        </div>

        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-[var(--text-dim)] text-xs font-semibold mb-2">
            <span>Disinformation Intercepted</span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400">
            {MISINFORMATION_STATS.fakeCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-[var(--text-dim)] mt-1">
            41.9% total corpus ratio
          </div>
        </div>

        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-[var(--text-dim)] text-xs font-semibold mb-2">
            <span>Classification Accuracy</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
            {MISINFORMATION_STATS.accuracyRate}
          </div>
          <div className="text-[11px] text-[var(--text-dim)] mt-1">
            Cross-benchmarked validation
          </div>
        </div>

        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-md">
          <div className="flex items-center justify-between text-[var(--text-dim)] text-xs font-semibold mb-2">
            <span>Engine Latency</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-[var(--text-main)]">
            {MISINFORMATION_STATS.averageAnalysisTime}
          </div>
          <div className="text-[11px] text-[var(--text-dim)] mt-1">
            Real-time inference window
          </div>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        {/* Category Vulnerability Risk (Bar Chart) */}
        <div className="lg:col-span-7 bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-[var(--text-main)]">Misinformation Rate by Topic Category</h2>
              <p className="text-xs text-[var(--text-dim)]">Percentage of analyzed articles determined to be deceptive</p>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 bg-rose-500/10 px-2 py-1 rounded border border-rose-500/20">
              High Risk
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={TRENDING_CATEGORIES} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" fontSize={11} unit="%" />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} width={100} />
                <Tooltip
                  formatter={(value) => [`${value}% Deceptive`, 'Rate']}
                  contentStyle={{ backgroundColor: 'var(--navy-surface)', borderColor: 'var(--navy-border)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-main)' }}
                />
                <Bar dataKey="fakeRate" radius={[0, 6, 6, 0]}>
                  {TRENDING_CATEGORIES.map((entry, idx) => (
                    <Cell
                      key={`bar-${idx}`}
                      fill={entry.fakeRate > 55 ? '#f43f5e' : entry.fakeRate > 40 ? '#f59e0b' : '#3b82f6'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="text-xs text-[var(--text-dim)] mt-2 bg-[var(--navy-surface)] p-3 rounded-xl border border-[var(--navy-border)]">
            <strong className="text-[var(--text-main)]">Key takeaway:</strong> Health and election news exhibit over 58% disinformation concentration, predominantly leveraging fear and urgent conspiracy hooks.
          </div>
        </div>

        {/* Global Distribution Donut */}
        <div className="lg:col-span-5 bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-[var(--text-main)] mb-1">Global Corpus Distribution</h2>
            <p className="text-xs text-[var(--text-dim)] mb-4">Breakdown of 14,820 historical verification audits</p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val) => [val.toLocaleString(), 'Articles']}
                    contentStyle={{ backgroundColor: 'var(--navy-surface)', borderColor: 'var(--navy-border)', borderRadius: '8px', fontSize: '12px', color: 'var(--text-main)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-[var(--navy-border-subtle)] text-xs">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-[var(--text-dim)]">{item.name}</span>
                </div>
                <span className="font-bold text-[var(--text-main)]">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Linguistic Deception Vectors List */}
      <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md">
        <h2 className="text-sm font-bold text-[var(--text-main)] mb-1">Most Prevalent Deception Techniques</h2>
        <p className="text-xs text-[var(--text-dim)] mb-6">Identified across confirmed fraudulent media samples</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LINGUISTIC_TACTICS.map((tactic, idx) => (
            <div key={idx} className="bg-[var(--navy-surface)] p-4 rounded-xl border border-[var(--navy-border)]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[var(--text-main)]">{tactic.tactic}</span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                  tactic.impact === 'Critical' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                }`}>
                  {tactic.impact}
                </span>
              </div>
              <div className="w-full bg-[var(--navy-card)] h-2 rounded-full overflow-hidden mb-2 border border-[var(--navy-border-subtle)]">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${tactic.frequency}%` }}
                />
              </div>
              <div className="text-[11px] text-[var(--text-dim)] flex items-center justify-between">
                <span>Observed Frequency</span>
                <span className="font-semibold text-[var(--text-main)]">{tactic.frequency}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
