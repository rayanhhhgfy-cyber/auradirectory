import React, { useState } from 'react';
import { ExternalLink, Star, ChevronDown, ChevronUp, Bookmark, ArrowLeftRight, Share2, Check, DollarSign, Sparkles, Eye } from 'lucide-react';
import { Website, Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface WebsiteCardProps {
  website: Website;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (website: Website) => void;
  isInCompare: boolean;
  onToggleCompare: (website: Website) => void;
  onCategoryClick?: (category: string) => void;
  onTagClick?: (tag: string) => void;
  onInspectWebsite?: (website: Website) => void;
}

export const WebsiteCard: React.FC<WebsiteCardProps> = ({
  website,
  language,
  isBookmarked,
  onToggleBookmark,
  isInCompare,
  onToggleCompare,
  onCategoryClick,
  onTagClick,
  onInspectWebsite,
}) => {
  const [plansOpen, setPlansOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const t = getTranslation(language);

  const displayDesc = (language === 'ar' && website.descriptionAr)
    ? website.descriptionAr
    : website.description;

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(website.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      id={`website-card-${website.id}`}
      className="group relative flex flex-col justify-between rounded-xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.85)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(59,130,246,1)]"
    >
      <div>
        {/* Top Badges & Meta Header */}
        <div className="flex items-start justify-between space-x-2 rtl:space-x-reverse mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            
            {/* Golden "THE BEST" Badge */}
            {website.isBest && (
              <span className="inline-flex items-center rounded bg-yellow-400 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-950 border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Star className="mr-1 h-3 w-3 fill-slate-950 rtl:ml-1 rtl:mr-0" />
                {t.theBestBadge}
              </span>
            )}

            {/* Rating Star Badge */}
            {website.rating && (
              <span className="inline-flex items-center rounded bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 text-[10px] font-black font-mono text-amber-900 dark:text-amber-300 border border-amber-800/40">
                ⭐ {website.rating.toFixed(1)}
              </span>
            )}

            {/* Category Tag */}
            <button
              onClick={(e) => { e.stopPropagation(); onCategoryClick?.(website.category); }}
              className="inline-flex items-center rounded bg-purple-100 dark:bg-purple-950/60 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 border border-purple-900/30 hover:bg-purple-200 transition-colors"
            >
              {website.category}
            </button>

            {website.pricingCategory && (
              <span className="inline-flex items-center rounded bg-slate-100 dark:bg-slate-800 border border-black dark:border-slate-700 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <DollarSign className="h-3 w-3 mr-0.5 text-emerald-600 dark:text-emerald-400 rtl:ml-0.5 rtl:mr-0" />
                {website.pricingCategory}
              </span>
            )}
          </div>

          {/* Quick Action Icons (Inspect, Bookmark, Compare, Share) */}
          <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {/* Inspect Tool Special Button */}
            <button
              onClick={() => onInspectWebsite?.(website)}
              title={t.inspectTool}
              className="rounded p-1.5 text-xs bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold border border-black hover:bg-blue-100 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <Eye className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onToggleCompare(website); }}
              title={isInCompare ? t.compared : t.compare}
              className={`rounded p-1.5 text-xs transition-colors border border-black ${
                isInCompare
                  ? 'bg-purple-500 text-white font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <ArrowLeftRight className="h-3.5 w-3.5" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); onToggleBookmark(website); }}
              title={isBookmarked ? t.bookmarked : t.bookmark}
              className={`rounded p-1.5 text-xs transition-colors border border-black ${
                isBookmarked
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              <Bookmark className={`h-3.5 w-3.5 ${isBookmarked ? 'fill-slate-950' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              title={t.share}
              className="rounded p-1.5 text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-black hover:bg-slate-200 transition-colors"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" /> : <Share2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        {/* Website Title & Link */}
        <div className="mb-2">
          <div className="flex items-center justify-between">
            <button
              onClick={() => onInspectWebsite?.(website)}
              className="inline-flex items-center text-lg font-black tracking-tight text-slate-900 dark:text-[#F8FAFC] hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-left rtl:text-right"
            >
              <span>{website.name}</span>
            </button>
            <a
              href={website.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 p-1 transition-colors"
              title={t.visitWebsite}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="text-[11px] font-mono text-slate-500 dark:text-[#94A3B8] truncate">
            {website.url.replace(/^https?:\/\//, '')}
          </div>
        </div>

        {/* Description (English/Arabic) */}
        <p className="mb-4 text-xs leading-relaxed font-medium text-slate-600 dark:text-[#94A3B8] line-clamp-3">
          {displayDesc}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {website.tags.map((tag, idx) => (
            <button
              key={idx}
              onClick={(e) => { e.stopPropagation(); onTagClick?.(tag); }}
              className="rounded bg-slate-100 dark:bg-[#090D16] border border-black dark:border-[#2A364F] px-2 py-0.5 text-[10px] font-bold font-mono text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 transition-colors"
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Section: Accordion Plans, Inspect & Primary Visit Button */}
      <div className="border-t-2 border-black dark:border-[#2A364F] pt-3 mt-2">
        
        {/* Accordion Toggle for Plans */}
        {website.plans && website.plans.length > 0 && (
          <div className="mb-3">
            <button
              onClick={() => setPlansOpen(!plansOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-black dark:border-slate-700 bg-slate-50 dark:bg-[#090D16] p-2 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-[#94A3B8] hover:text-blue-600 transition-colors"
            >
              <span className="flex items-center space-x-1 rtl:space-x-reverse">
                <Sparkles className="h-3.5 w-3.5 text-blue-500" />
                <span>{t.pricingPlans} ({website.plans.length})</span>
              </span>
              {plansOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>

            {/* Plans List */}
            {plansOpen && (
              <div className="mt-2 space-y-2 rounded-lg bg-slate-50 dark:bg-[#090D16] p-2.5 border-2 border-black dark:border-[#2A364F] text-xs">
                {website.plans.map((plan, pIdx) => (
                  <div key={pIdx} className="flex flex-col border-b border-slate-200 dark:border-[#2A364F] last:border-0 pb-1.5 last:pb-0">
                    <div className="flex items-center justify-between font-extrabold text-slate-900 dark:text-[#F8FAFC]">
                      <span className="uppercase text-[11px] tracking-wider">{plan.tier}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-mono font-black">{plan.price}</span>
                    </div>
                    <p className="text-[10px] text-slate-600 dark:text-[#94A3B8] mt-0.5 font-medium">
                      {plan.details}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Dual Primary Action Buttons: Inspect Special Card + Visit Website */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onInspectWebsite?.(website)}
            className="flex items-center justify-center space-x-1 rtl:space-x-reverse rounded-lg bg-yellow-400 hover:bg-yellow-300 text-slate-950 border-2 border-black px-2.5 py-2.5 text-xs font-black uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <Eye className="h-3.5 w-3.5" />
            <span>{t.inspectTool}</span>
          </button>

          <a
            href={website.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1 rtl:space-x-reverse rounded-lg bg-blue-500 hover:bg-blue-600 border-2 border-black px-2.5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <span>{t.visitWebsite}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
