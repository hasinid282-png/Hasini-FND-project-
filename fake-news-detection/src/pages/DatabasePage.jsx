import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Database,
  Search,
  Filter,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  ArrowUpRight,
  Calendar
} from 'lucide-react';
import { SAMPLE_ARTICLES } from '../data/mockArticles';

export default function DatabasePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedVerdict, setSelectedVerdict] = useState('All');

  const categories = ['All', 'Science', 'Health', 'Finance', 'Government', 'Technology'];
  const verdicts = ['All', 'Authentic', 'Questionable', 'Fake News'];

  const filteredArticles = SAMPLE_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesVerdict = selectedVerdict === 'All' || article.verdict === selectedVerdict;

    return matchesSearch && matchesCategory && matchesVerdict;
  });

  const getVerdictBadge = (verdict, score) => {
    if (verdict === 'Authentic') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="w-3.5 h-3.5" /> Authentic ({score}%)
        </span>
      );
    }
    if (verdict === 'Questionable') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <AlertTriangle className="w-3.5 h-3.5" /> Questionable ({score}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 border border-rose-500/30 text-rose-400">
        <ShieldAlert className="w-3.5 h-3.5" /> Fake News ({score}%)
      </span>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-wider mb-3">
          <Database className="w-3.5 h-3.5 text-blue-400" />
          Fact-Check Knowledge Repository
        </div>
        <h1 className="text-3xl font-extrabold text-[var(--text-main)] tracking-tight">
          Verified & Debunked News Archives
        </h1>
        <p className="text-[var(--text-dim)] mt-2 text-sm max-w-2xl">
          Search our catalog of reviewed news items, documented urban legends, viral claims, and peer-reviewed stories.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 mb-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Field */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--text-dim)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, author, domain, or claim..."
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--navy-surface)] border border-[var(--navy-border)] rounded-xl text-sm text-[var(--text-main)] placeholder-[var(--text-dim)] focus:outline-none focus:border-blue-400 transition-colors"
            />
          </div>

          {/* Verdict Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs text-[var(--text-dim)] whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3 h-3" /> Verdict:
            </span>
            {verdicts.map((v) => (
              <button
                key={v}
                onClick={() => setSelectedVerdict(v)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border ${
                  selectedVerdict === v
                    ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-bold border-transparent shadow-sm'
                    : 'bg-[var(--navy-surface)] text-[var(--text-dim)] hover:text-[var(--text-main)] border-[var(--navy-border-subtle)]'
                }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[var(--navy-border-subtle)] text-xs">
          <span className="text-[var(--text-dim)] whitespace-nowrap">Category:</span>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedCategory(c)}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                selectedCategory === c
                  ? 'bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] font-semibold shadow-xs'
                  : 'text-[var(--text-dim)] hover:text-[var(--text-main)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      <div className="space-y-4">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <div
              key={article.id}
              className="bg-[var(--navy-card)] border border-[var(--navy-border)] hover:border-blue-400/50 rounded-2xl p-6 transition-all shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5 flex-wrap">
                  {getVerdictBadge(article.verdict, article.credibilityScore)}
                  <span className="text-xs text-[var(--text-dim)] bg-[var(--navy-surface)] px-2.5 py-1 rounded-md border border-[var(--navy-border)]">
                    {article.category}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-[var(--text-dim)]">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {article.date}
                  </span>
                  <span>Source: <strong className="text-[var(--text-main)]">{article.source}</strong></span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[var(--text-main)] mb-2 leading-snug">
                {article.title}
              </h3>

              <p className="text-xs text-[var(--text-dim)] leading-relaxed mb-4 line-clamp-3">
                {article.content}
              </p>

              {/* Flags if present */}
              {article.flags && article.flags.length > 0 && (
                <div className="mb-4 p-3 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)]">
                  <div className="text-[11px] font-bold text-[var(--text-main)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                    Key Risk Factors Identified:
                  </div>
                  <ul className="space-y-1 text-xs text-[var(--text-dim)]">
                    {article.flags.map((flag, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-rose-400 font-bold">•</span>
                        <span>{flag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Metrics Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[var(--navy-border-subtle)] text-xs">
                <div className="flex items-center gap-4 text-[var(--text-dim)]">
                  <span>Factuality: <strong className="text-[var(--text-main)]">{article.details.factualityScore}%</strong></span>
                  <span>Linguistic: <strong className="text-[var(--text-main)]">{article.details.linguisticScore}%</strong></span>
                  <span>Clickbait: <strong className="text-[var(--text-main)]">{article.details.clickbaitRatio}%</strong></span>
                </div>

                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Analyze similar text in Detector <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-12 text-center text-[var(--text-dim)]">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm font-semibold text-[var(--text-main)]">No matching articles found</p>
            <p className="text-xs mt-1">Try adjusting your keywords or clearing category/verdict filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
