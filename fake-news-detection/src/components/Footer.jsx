import React from 'react';
import { Shield, ExternalLink, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#1e4079]/60 bg-[#050e1d] mt-16 py-10 text-blue-200/70 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <div className="w-5 h-5 rounded-md bg-[#1e3a8a] flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5 text-white" />
              </div>
              VeritasGuard Fake News Detection Platform
            </div>
            <p className="text-blue-200/80 leading-relaxed max-w-md">
              Engineered to detect disinformation, manipulative headline patterns, unverified sensationalism, and high-risk medical or financial viral rumors using multi-vector linguistic heuristics and fact-checking protocols.
            </p>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Fact-Checking Resources</div>
            <ul className="space-y-2">
              <li>
                <a href="https://www.factcheck.org" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  FactCheck.org <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://www.politifact.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  PolitiFact Truth-O-Meter <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://www.snopes.com" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  Snopes Urban Legends & Rumors <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
              <li>
                <a href="https://apnews.com/hub/ap-fact-check" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  Associated Press Fact Check <ExternalLink className="w-3 h-3 text-blue-400" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold text-white mb-3">Detection Framework</div>
            <ul className="space-y-2 text-blue-200/80">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Linguistic Sensationalism
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Emotional Manipulation
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Attribution Corroboration
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Source Reputation Score
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1e4079]/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-blue-300/60 text-[11px]">
          <p>© {new Date().getFullYear()} VeritasGuard Misinformation Research. Built for objective digital literacy.</p>
          <div className="flex items-center gap-4">
            <span>Always corroborate sensitive news across multiple primary sources.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
