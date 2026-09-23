import React, { useState } from 'react';
import {
  Search,
  RefreshCw,
  FileText,
  AlertTriangle,
  CheckCircle,
  Copy,
  Check,
  Trash2,
  HelpCircle,
  Sparkles,
  Link as LinkIcon,
  User,
  Clock,
  ChevronRight
} from 'lucide-react';
import CredibilityGauge from '../components/CredibilityGauge';
import AnalysisBreakdown from '../components/AnalysisBreakdown';
import { analyzeNewsText } from '../utils/fakeNewsDetector';
import { SAMPLE_ARTICLES } from '../data/mockArticles';

const initialSample = SAMPLE_ARTICLES[1];

export default function DetectorPage() {
  const [title, setTitle] = useState(() => initialSample.title);
  const [content, setContent] = useState(() => initialSample.content);
  const [source, setSource] = useState(() => initialSample.source);
  const [author, setAuthor] = useState(() => initialSample.author);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [result, setResult] = useState(() => analyzeNewsText(initialSample));
  const [recentScans, setRecentScans] = useState(() => {
    try {
      const saved = localStorage.getItem('veritas_scans');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    const firstAnalysis = analyzeNewsText(initialSample);
    return firstAnalysis ? [firstAnalysis] : [];
  });
  const [copied, setCopied] = useState(false);

  const handleLoadSample = (sample) => {
    setTitle(sample.title);
    setContent(sample.content);
    setSource(sample.source);
    setAuthor(sample.author);
    
    // Auto-run analysis for sample
    runAnalysis({
      title: sample.title,
      content: sample.content,
      source: sample.source,
      author: sample.author
    });
  };

  const handleClear = () => {
    setTitle('');
    setContent('');
    setSource('');
    setAuthor('');
    setResult(null);
  };

  const runAnalysis = (data) => {
    setIsScanning(true);
    setScanStep(1);

    // Multi-step scanning illusion
    setTimeout(() => setScanStep(2), 300);
    setTimeout(() => setScanStep(3), 600);

    setTimeout(() => {
      const analysis = analyzeNewsText(data);
      setResult(analysis);
      setIsScanning(false);
      setScanStep(0);

      if (analysis) {
        setRecentScans(prev => {
          const updated = [analysis, ...prev.filter(item => item.title !== analysis.title)].slice(0, 8);
          try {
            localStorage.setItem('veritas_scans', JSON.stringify(updated));
          } catch (e) {
            console.error(e);
          }
          return updated;
        });
      }
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !content.trim()) return;
    runAnalysis({ title, content, source, author });
  };

  const handleCopyReport = () => {
    if (!result) return;
    const text = `VERITASGUARD ANALYSIS REPORT\nTitle: ${result.title}\nVerdict: ${result.verdict} (Credibility: ${result.credibilityScore}%)\nSummary: ${result.summary}\nFactuality: ${result.details.factualityScore}%\nLinguistic Neutrality: ${result.details.linguisticScore}%`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClearHistory = () => {
    setRecentScans([]);
    localStorage.removeItem('veritas_scans');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--badge-bg)] border border-[var(--badge-border)] text-[var(--badge-text)] text-xs font-semibold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Autonomous Truth & Factuality Evaluator
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
          Analyze News & Uncover Disinformation
        </h1>
        <p className="text-[var(--text-dim)] mt-2 max-w-3xl text-sm sm:text-base">
          Input any news headline, article excerpt, social media broadcast, or URL to inspect linguistic manipulation, clickbait tactics, source authority, and factual integrity.
        </p>
      </div>

      {/* Quick Sample Selector */}
      <div className="mb-6 p-4 rounded-xl bg-[var(--navy-card)] border border-[var(--navy-border)] shadow-sm">
        <div className="text-xs font-bold text-[var(--text-sub)] uppercase tracking-wider mb-2 flex items-center justify-between">
          <span>Try Pre-Loaded Test Articles:</span>
          <span className="text-[var(--text-dim)] text-[11px] font-normal">Click to auto-populate and scan</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_ARTICLES.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleLoadSample(sample)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all text-left flex items-center gap-2 cursor-pointer ${
                sample.verdict === 'Authentic'
                  ? 'bg-emerald-950/20 border-emerald-700/40 text-emerald-400 hover:bg-emerald-900/30'
                  : sample.verdict === 'Fake News'
                  ? 'bg-rose-950/20 border-rose-700/40 text-rose-400 hover:bg-rose-900/30'
                  : 'bg-amber-950/20 border-amber-700/40 text-amber-400 hover:bg-amber-900/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${
                sample.verdict === 'Authentic' ? 'bg-emerald-400' : sample.verdict === 'Fake News' ? 'bg-rose-400' : 'bg-amber-400'
              }`} />
              <span className="truncate max-w-[200px]">{sample.title}</span>
              <span className="text-[10px] opacity-80 font-bold">[{sample.verdict}]</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Input Form vs Output Scan */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Input Form (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          <form onSubmit={handleSubmit} className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-xl relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-[var(--text-main)] flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Input Article Text
              </h2>
              <button
                type="button"
                onClick={handleClear}
                className="text-xs text-[var(--text-dim)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
              >
                Clear fields
              </button>
            </div>

            {/* Headline / Title */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1.5">
                Headline / Title <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. SHOCKING TRUTH: Drinking boiled garlic water cures cancer..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                required
              />
            </div>

            {/* Full Content */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1.5">
                Article Body / Excerpt
              </label>
              <textarea
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Paste the full paragraph or forwarded message text here..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors resize-y"
              />
            </div>

            {/* Secondary Metadata Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1.5 flex items-center gap-1.5">
                  <LinkIcon className="w-3 h-3 text-[var(--text-dim)]" /> Source Domain or URL
                </label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  placeholder="e.g. nature.com or secret-news.xyz"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-xs focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-sub)] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3 h-3 text-[var(--text-dim)]" /> Author or Channel
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Dr. Jane Smith or Anonymous"
                  className="w-full px-3 py-2 rounded-xl bg-[var(--navy-surface)] border border-[var(--navy-border)] text-[var(--text-main)] placeholder-[var(--text-dim)] text-xs focus:outline-none focus:border-blue-400 transition-colors"
                />
              </div>
            </div>

            {/* Submit / Scan Button */}
            <button
              type="submit"
              disabled={isScanning || (!title.trim() && !content.trim())}
              className="w-full py-3 px-4 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] cursor-pointer"
            >
              {isScanning ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  {scanStep === 1 && "Tokenizing linguistic structure..."}
                  {scanStep === 2 && "Evaluating sensationalism & attribution..."}
                  {scanStep === 3 && "Corroborating source reputation..."}
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Run Multi-Vector Credibility Scan
                </>
              )}
            </button>
          </form>

          {/* Recent Scans History Drawer */}
          {recentScans.length > 0 && (
            <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-dim)] flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  Recent Scan History ({recentScans.length})
                </h3>
                <button
                  onClick={handleClearHistory}
                  className="text-[11px] text-[var(--text-dim)] hover:text-rose-400 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3 h-3" /> Clear
                </button>
              </div>
              <div className="space-y-2">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    onClick={() => setResult(scan)}
                    className="p-2.5 rounded-xl bg-[var(--navy-surface)] hover:bg-[var(--navy-hover)] border border-[var(--navy-border-subtle)] hover:border-[var(--navy-border)] cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium text-[var(--text-main)] truncate group-hover:text-blue-400 transition-colors">
                        {scan.title}
                      </div>
                      <div className="text-[10px] text-[var(--text-dim)] flex items-center gap-2 mt-0.5">
                        <span>{scan.source}</span>
                        <span>•</span>
                        <span>{new Date(scan.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${scan.verdictColor}`}>
                        {scan.credibilityScore}%
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-[var(--text-dim)] group-hover:text-[var(--text-main)]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Scan Results & Analytical Deep-Dive (6 cols on lg) */}
        <div className="lg:col-span-6 space-y-6">
          {result ? (
            <div className="space-y-6">
              {/* Verdict Header Card */}
              <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  {/* Gauge */}
                  <div className="w-full sm:w-48 flex-shrink-0">
                    <CredibilityGauge
                      score={result.credibilityScore}
                      verdict={result.verdict}
                      verdictColor={result.verdictColor}
                    />
                  </div>

                  {/* Summary Details */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${result.badgeBg}`}>
                        {result.verdict}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleCopyReport}
                          className="p-1.5 rounded-lg bg-[var(--navy-surface)] hover:bg-[var(--navy-hover)] text-[var(--text-main)] text-xs flex items-center gap-1 transition-colors border border-[var(--navy-border)] cursor-pointer"
                          title="Copy Analysis Report"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span className="text-[11px] font-medium">{copied ? 'Copied' : 'Report'}</span>
                        </button>
                      </div>
                    </div>

                    <h2 className="text-base font-bold text-[var(--text-main)] leading-snug">
                      {result.title}
                    </h2>

                    <p className="text-xs text-[var(--text-sub)] leading-relaxed bg-[var(--navy-surface)] p-3 rounded-xl border border-[var(--navy-border)]">
                      {result.summary}
                    </p>

                    <div className="text-[11px] text-[var(--text-dim)] flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span>Source: <strong className="text-[var(--text-main)]">{result.source}</strong></span>
                      <span>Author: <strong className="text-[var(--text-main)]">{result.author}</strong></span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Detected Flags / Warnings */}
              {result.flags && result.flags.length > 0 ? (
                <div className="bg-rose-950/20 border border-rose-800/40 rounded-2xl p-5">
                  <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2 mb-3">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    Detected Deception & Manipulation Markers ({result.flags.length})
                  </h3>
                  <div className="space-y-2.5">
                    {result.flags.map((flag, idx) => (
                      <div
                        key={idx}
                        className="bg-[var(--navy-surface)] p-3 rounded-xl border border-[var(--navy-border)] flex items-start gap-3 text-xs"
                      >
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 ${
                          flag.severity === 'high'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {flag.severity}
                        </span>
                        <div>
                          <div className="font-semibold text-[var(--text-main)]">{flag.title}</div>
                          <div className="text-[var(--text-dim)] mt-0.5">{flag.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-emerald-300">Clean Linguistic Pattern</div>
                    <div className="text-xs text-[var(--text-dim)]">No overt clickbait syntax, emotional triggers, or suspicious domain red flags were flagged.</div>
                  </div>
                </div>
              )}

              {/* Detailed Visual Breakdown (Recharts) */}
              <AnalysisBreakdown details={result.details} />

              {/* Recommended Actions */}
              <div className="bg-[var(--navy-card)] border border-[var(--navy-border)] rounded-2xl p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-main)] mb-3 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                  Recommended Verification Next Steps
                </h3>
                <ul className="space-y-2 text-xs text-[var(--text-dim)]">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Cross-reference claims against trusted wire services like <strong className="text-[var(--text-main)]">Reuters</strong>, <strong className="text-[var(--text-main)]">Associated Press</strong>, or <strong className="text-[var(--text-main)]">BBC</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>If the article cites a scientific discovery, verify that a corresponding DOI link exists in a peer-reviewed journal.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-400 font-bold">•</span>
                    <span>Avoid sharing sensational stories on social platforms until corroborating reports emerge from multiple reputable sources.</span>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[var(--navy-card)] border border-dashed border-[var(--navy-border)] rounded-2xl p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
              <div className="w-16 h-16 rounded-2xl bg-[var(--navy-surface)] flex items-center justify-center text-[var(--text-dim)] mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[var(--text-main)]">Awaiting Article Submission</h3>
              <p className="text-xs text-[var(--text-dim)] max-w-sm mt-1 mb-6">
                Paste an article or choose one of the pre-loaded test samples above to calculate credibility scores and view the breakdown.
              </p>
              <button
                onClick={() => handleLoadSample(SAMPLE_ARTICLES[0])}
                className="px-4 py-2 rounded-xl bg-[var(--btn-primary-bg)] text-[var(--btn-primary-text)] hover:opacity-90 text-xs font-semibold transition-colors cursor-pointer shadow-sm"
              >
                Load Sample Article (Exoplanet Discovery)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
