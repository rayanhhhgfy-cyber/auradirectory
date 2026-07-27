import React from 'react';
import { Layers, ShieldCheck, Zap, Globe, Star } from 'lucide-react';
import { Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface StatsBannerProps {
  language: Language;
  totalCount: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ language, totalCount }) => {
  const t = getTranslation(language);

  return (
    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        
        {/* Bento Tile 1 */}
        <div className="bg-white dark:bg-[#131B2E] border-2 border-black dark:border-[#2A364F] p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">{t.statsTotalWebsites}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-blue-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Globe className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black italic tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            {totalCount.toLocaleString()}
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Verified & Active</div>
        </div>

        {/* Bento Tile 2 */}
        <div className="bg-white dark:bg-[#131B2E] border-2 border-black dark:border-[#2A364F] p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">{t.statsCategories}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-purple-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black italic tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            25+
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400">Tech Workstreams</div>
        </div>

        {/* Bento Tile 3 */}
        <div className="bg-white dark:bg-[#131B2E] border-2 border-black dark:border-[#2A364F] p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-[#94A3B8]">{t.statsFreeTier}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500 text-white border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Zap className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-black italic tracking-tight text-slate-900 dark:text-[#F8FAFC]">
            60%+
          </div>
          <div className="mt-2 text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">No Credit Card Needed</div>
        </div>

        {/* Bento Tile 4 - Yellow Accent */}
        <div className="bg-yellow-400 text-slate-950 border-2 border-black p-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] rounded-xl flex flex-col justify-between">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{t.statsUpdated}</span>
            <div className="flex h-7 w-7 items-center justify-center rounded bg-black text-amber-400 border border-black">
              <Star className="h-4 w-4 fill-amber-400" />
            </div>
          </div>
          <div className="text-3xl font-black italic tracking-tight">
            100%
          </div>
          <div className="mt-2 text-[10px] font-black uppercase tracking-wider text-slate-900">Real-Time Directory</div>
        </div>

      </div>
    </div>
  );
};
