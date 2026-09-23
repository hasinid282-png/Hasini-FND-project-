import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

export default function CredibilityGauge({ score, verdict, verdictColor }) {
  // Determine color theme
  let strokeColor = '#10b981'; // emerald
  let glowColor = 'rgba(16, 185, 129, 0.15)';
  let StatusIcon = ShieldCheck;

  if (score < 30) {
    strokeColor = '#f43f5e'; // rose
    glowColor = 'rgba(244, 63, 94, 0.2)';
    StatusIcon = XCircle;
  } else if (score < 55) {
    strokeColor = '#f97316'; // orange
    glowColor = 'rgba(249, 115, 22, 0.15)';
    StatusIcon = ShieldAlert;
  } else if (score < 75) {
    strokeColor = '#f59e0b'; // amber
    glowColor = 'rgba(245, 158, 11, 0.15)';
    StatusIcon = AlertTriangle;
  } else if (score < 85) {
    strokeColor = '#3b82f6'; // royal navy blue
    glowColor = 'rgba(59, 130, 246, 0.2)';
    StatusIcon = CheckCircle2;
  }

  // SVG Gauge calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-[var(--navy-card)] rounded-2xl border border-[var(--navy-border)] relative overflow-hidden shadow-lg transition-colors">
      {/* Subtle glow background */}
      <div
        className="absolute w-40 h-40 rounded-full blur-3xl opacity-30 pointer-events-none"
        style={{ backgroundColor: glowColor }}
      />

      {/* SVG Radial Meter */}
      <div className="relative flex items-center justify-center w-40 h-40">
        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
          {/* Track Background */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            className="text-[var(--navy-border-subtle)]"
            strokeWidth="12"
            fill="transparent"
          />
          {/* Active Meter */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke={strokeColor}
            strokeWidth="12"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        {/* Center Score & Icon */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <StatusIcon className="w-7 h-7 mb-1" style={{ color: strokeColor }} />
          <div className="text-3xl font-extrabold tracking-tight text-[var(--text-main)]">{score}%</div>
          <span className="text-[11px] font-bold text-[var(--text-dim)] uppercase tracking-wider">Credibility</span>
        </div>
      </div>

      {/* Text Verdict */}
      <div className="mt-4 text-center">
        <div className={`text-base font-bold ${verdictColor}`}>{verdict}</div>
        <p className="text-xs text-[var(--text-dim)] mt-0.5">
          {score >= 70 ? 'High probability of factual accuracy' : score >= 45 ? 'Verification required before sharing' : 'High probability of disinformation'}
        </p>
      </div>
    </div>
  );
}
