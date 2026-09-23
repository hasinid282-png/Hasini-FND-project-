import React, { useState } from 'react';
import {
  BookOpen,
  AlertCircle,
  Shield,
  Eye,
  Crosshair,
  Lightbulb
} from 'lucide-react';

export default function GuidePage() {
  const [checklist, setChecklist] = useState({
    authorVerified: false,
    dateRecent: false,
    multipleSources: false,
    neutralHeadline: false,
    primarySourceCited: false
  });

  const toggleCheck = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const checkedCount = Object.values(checklist).filter(Boolean).length;

  const siftSteps = [
    {
      letter: 'S',
      title: 'STOP',
      description: 'When you feel strong emotion (outrage, fear, intense excitement), pause before sharing or reacting. Fake news is engineered to bypass critical thinking.'
    },
    {
      letter: 'I',
      title: 'INVESTIGATE the Source',
      description: 'Who published this? Check the "About Us" page, WHOIS domain data, or Wikipedia background. Are they recognized journalistic entities or disposable blogs?'
    },
    {
      letter: 'F',
      title: 'FIND Better Coverage',
      description: 'Search the headline keywords on AP News, Reuters, or Google News. If an extraordinary event occurred, dozens of independent news agencies will report it simultaneously.'
    },
    {
      letter: 'T',
      title: 'TRACE to Original Context',
      description: 'Trace quotes, study claims, or video clips back to their uncut origin. Often sensational quotes are selectively trimmed or taken from satirical publications.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-wider mb-3">
          <BookOpen className="w-3.5 h-3.5 text-blue-400" />
          Digital Information Literacy
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          How to Detect Fake News & Misinformation
        </h1>
        <p className="text-[var(--text-dim)] mt-2 text-sm max-w-2xl">
          Actionable frameworks and cognitive checklists to protect yourself from algorithmic deception and viral propaganda.
        </p>
      </div>

      {/* SIFT Methodology Cards */}
      <div className="mb-12">
        <h2 className="text-lg font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-400" />
          The Four-Step "SIFT" Verification Framework
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {siftSteps.map((step) => (
            <div
              key={step.letter}
              className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 relative overflow-hidden shadow-md"
            >
              <div className="text-5xl font-black text-[var(--navy-border-subtle)] absolute top-2 right-4 select-none opacity-40">
                {step.letter}
              </div>
              <div className="w-10 h-10 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-[var(--text-main)] font-extrabold text-lg flex items-center justify-center mb-4">
                {step.letter}
              </div>
              <h3 className="text-base font-bold text-[var(--text-main)] mb-2">{step.title}</h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Verification Checklist Widget */}
      <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 sm:p-8 mb-12 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-blue-400" />
              Interactive "Quick-Check" Verification Card
            </h2>
            <p className="text-xs text-[var(--text-dim)] mt-0.5">
              Testing a suspicious post? Tick each item that checks out:
            </p>
          </div>
          <div className="px-3.5 py-1.5 rounded-full bg-[var(--navy-surface)] border border-[var(--navy-border)] text-xs font-semibold text-[var(--text-main)]">
            Checklist Score: <span className="text-blue-400 font-bold">{checkedCount} / 5</span>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { key: 'authorVerified', label: 'Author has verifiable credentials or a transparent public profile' },
            { key: 'dateRecent', label: 'Publication date is current (not recycled old news presented as recent)' },
            { key: 'multipleSources', label: 'At least 2 other mainstream independent outlets report the same key facts' },
            { key: 'neutralHeadline', label: 'Headline avoids all-caps, exclamation marks, or clickbait traps' },
            { key: 'primarySourceCited', label: 'Includes direct hyperlinks to primary documents, studies, or official transcripts' }
          ].map((item) => (
            <label
              key={item.key}
              onClick={() => toggleCheck(item.key)}
              className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                checklist[item.key]
                  ? 'bg-emerald-950/20 border-emerald-700/40 text-emerald-400'
                  : 'bg-[var(--navy-surface)] border-[var(--navy-border)] text-[var(--text-main)] hover:bg-[var(--navy-hover)]'
              }`}
            >
              <input
                type="checkbox"
                checked={checklist[item.key]}
                onChange={() => {}}
                className="w-4 h-4 rounded border-[var(--navy-border)] text-blue-500 focus:ring-0 focus:ring-offset-0 bg-[var(--navy-surface)] cursor-pointer"
              />
              <span className="text-xs sm:text-sm font-medium">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-xs flex items-center justify-between gap-4">
          <span className="text-[var(--text-sub)]">
            {checkedCount >= 4
              ? '✅ High credibility profile. Safe to reference with attribution.'
              : checkedCount >= 2
              ? '⚠️ Moderate caution. Exercise lateral reading before sharing.'
              : '⛔ High risk of fabricated or misleading content. Do not distribute.'}
          </span>
          <button
            onClick={() => setChecklist({
              authorVerified: false,
              dateRecent: false,
              multipleSources: false,
              neutralHeadline: false,
              primarySourceCited: false
            })}
            className="text-[var(--text-dim)] hover:text-[var(--text-main)] text-xs font-semibold whitespace-nowrap cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Psychology & Cognitive Biases */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-3">
            <Lightbulb className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-main)] mb-1.5">Confirmation Bias</h3>
          <p className="text-xs text-[var(--text-dim)] leading-relaxed">
            Humans are naturally predisposed to accept unverified claims that reinforce their pre-existing beliefs while rejecting documented evidence that contradicts them.
          </p>
        </div>

        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
            <Eye className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-main)] mb-1.5">Illusory Truth Effect</h3>
          <p className="text-xs text-[var(--text-dim)] leading-relaxed">
            Repeated exposure to false headlines makes them appear familiar, and the human brain frequently confuses familiarity with factual truth.
          </p>
        </div>

        <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-md">
          <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-3">
            <AlertCircle className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-main)] mb-1.5">Emotional Contagion</h3>
          <p className="text-xs text-[var(--text-dim)] leading-relaxed">
            Content engineered to induce moral outrage or existential fear spreads up to 6 times faster on social networks than measured, objective reporting.
          </p>
        </div>
      </div>
    </div>
  );
}
