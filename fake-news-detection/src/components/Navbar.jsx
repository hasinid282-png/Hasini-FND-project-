import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Database, BarChart3, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function Navbar() {
  const { toggleTheme, isDark } = useTheme();

  const navItems = [
    { to: '/', label: 'Detector', icon: ShieldCheck, end: true },
    { to: '/database', label: 'Database & Feeds', icon: Database },
    { to: '/analytics', label: 'Misinformation Trends', icon: BarChart3 },
    { to: '/guide', label: 'Verification Guide', icon: BookOpen }
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#071326] text-white border-b border-[#1e4079]/70 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#1e3a8a] border border-blue-400/40 flex items-center justify-center text-white shadow-lg shadow-blue-950/40 group-hover:bg-[#2563eb] transition-all">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-white tracking-tight">VeritasGuard</span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/10 text-white border border-white/20">
                Navy Edition
              </span>
            </div>
            <p className="text-xs text-blue-200/80">Fake News & Misinformation Intelligence</p>
          </div>
        </NavLink>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white text-[#071326] font-semibold shadow-sm'
                      : 'text-blue-100/90 hover:text-white hover:bg-white/10'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        {/* Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Engine Online
          </div>

          {/* Navy & White Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e2448] hover:bg-[#153568] border border-[#234b8c] text-white text-xs font-medium transition-colors shadow-sm cursor-pointer"
            title="Switch between Deep Navy Canvas and Crisp White Canvas"
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden lg:inline">White Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-200" />
                <span className="hidden lg:inline">Navy Mode</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="flex md:hidden px-4 py-2 border-t border-[#1e4079]/70 bg-[#0a1b35] overflow-x-auto gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-white text-[#071326] font-semibold'
                    : 'text-blue-100 hover:text-white bg-white/5'
                }`
              }
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </NavLink>
          );
        })}
      </div>
    </header>
  );
}
