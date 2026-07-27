import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Star,
  Bookmark,
  ArrowLeftRight,
  Share2,
  Check,
  ShieldCheck,
  Zap,
  Code,
  Sparkles,
  Layers,
  Copy,
  Globe,
  DollarSign
} from 'lucide-react';
import { Website, Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface WebsiteDetailModalProps {
  website: Website | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  isBookmarked: boolean;
  onToggleBookmark: (website: Website) => void;
  isInCompare: boolean;
  onToggleCompare: (website: Website) => void;
  allWebsites: Website[];
  onSelectWebsite?: (website: Website) => void;
  onTagClick?: (tag: string) => void;
  onIntentClick?: (intent: string) => void;
}

export const WebsiteDetailModal: React.FC<WebsiteDetailModalProps> = ({
  website,
  isOpen,
  onClose,
  language,
  isBookmarked,
  onToggleBookmark,
  isInCompare,
  onToggleCompare,
  allWebsites,
  onSelectWebsite,
  onTagClick,
  onIntentClick
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !website) return null;

  const t = getTranslation(language);
  const displayDesc = language === 'ar' && website.descriptionAr ? website.descriptionAr : website.description;

  // Find 3 similar tools in the same category
  const similarTools = allWebsites
    .filter(w => w.category === website.category && w.id !== website.id)
    .slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(website.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative my-8 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] text-slate-900 dark:text-[#F8FAFC]">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-[#2A364F] pb-4 mb-6">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="px-2.5 py-1 bg-yellow-400 text-slate-950 font-black text-[10px] uppercase tracking-widest border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded">
              SPECIAL CARD INSPECTOR
            </span>
            <span className="text-xs font-mono font-bold text-slate-500">#{website.id}</span>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-600 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-black dark:border-slate-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hero Banner Bento Tile */}
        <div className="relative mb-6 rounded-xl border-2 border-black bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {website.isBest && (
                  <span className="inline-flex items-center rounded bg-yellow-400 text-slate-950 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Star className="mr-1 h-3.5 w-3.5 fill-slate-950 rtl:ml-1 rtl:mr-0" />
                    {t.theBestBadge}
                  </span>
                )}
                <span className="inline-flex items-center rounded bg-black/40 backdrop-blur-md px-2.5 py-0.5 text-xs font-extrabold uppercase tracking-wider text-amber-300 border border-white/20">
                  <ShieldCheck className="mr-1 h-3.5 w-3.5 text-amber-300 rtl:ml-1 rtl:mr-0" />
                  {t.verifiedTool}
                </span>
                {website.rating && (
                  <span className="inline-flex items-center rounded bg-white text-slate-950 px-2.5 py-0.5 text-xs font-black font-mono border border-black">
                    ⭐ {website.rating.toFixed(1)} / 5.0
                  </span>
                )}
              </div>

              <h2 className="text-3xl font-black uppercase tracking-tight italic drop-shadow-md">
                {website.name}
              </h2>
              <div className="mt-1 flex items-center space-x-2 rtl:space-x-reverse font-mono text-xs text-blue-100">
                <Globe className="h-3.5 w-3.5" />
                <span>{website.url}</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={website.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 rtl:space-x-reverse rounded-lg bg-yellow-400 text-slate-950 font-black uppercase tracking-wider text-xs px-4 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-300 transition-all active:translate-x-0.5 active:translate-y-0.5"
              >
                <span>{t.visitWebsite}</span>
                <ExternalLink className="h-4 w-4" />
              </a>

              <button
                onClick={handleCopyLink}
                className="inline-flex items-center justify-center space-x-1.5 rtl:space-x-reverse rounded-lg bg-white text-slate-950 font-black uppercase tracking-wider text-xs px-3 py-2.5 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 transition-all"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? t.linkCopied : t.copyLink}</span>
              </button>

              <button
                onClick={() => onToggleBookmark(website)}
                className={`p-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  isBookmarked ? 'bg-amber-400 text-slate-950' : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
                title={isBookmarked ? t.bookmarked : t.bookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-slate-950' : ''}`} />
              </button>

              <button
                onClick={() => onToggleCompare(website)}
                className={`p-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                  isInCompare ? 'bg-purple-500 text-white' : 'bg-white text-slate-900 hover:bg-slate-100'
                }`}
                title={isInCompare ? t.compared : t.compare}
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Bento Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          
          {/* Left Column (2 cols) - Description & Key Highlights */}
          <div className="md:col-span-2 space-y-6">
            
            {/* Overview Box */}
            <div className="rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] flex items-center mb-3">
                <Sparkles className="h-4 w-4 mr-1.5 text-blue-500 rtl:ml-1.5 rtl:mr-0" />
                {t.overview}
              </h3>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-medium">
                {displayDesc}
              </p>

              {/* Category & Subcategory Pills */}
              <div className="mt-4 flex flex-wrap items-center gap-2 pt-3 border-t border-slate-200 dark:border-[#2A364F]">
                <span className="text-[10px] font-black uppercase text-slate-500">{t.category}:</span>
                <span className="rounded bg-purple-100 dark:bg-purple-950/60 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-purple-700 dark:text-purple-300 border border-purple-800/30">
                  {website.category}
                </span>
                {website.subcategory && (
                  <span className="rounded bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 border border-blue-800/30">
                    {website.subcategory}
                  </span>
                )}
                {website.pricingCategory && (
                  <span className="rounded bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-300 border border-emerald-800/30 flex items-center">
                    <DollarSign className="h-3 w-3 mr-0.5" />
                    {website.pricingCategory}
                  </span>
                )}
              </div>
            </div>

            {/* Key Platform Features Bento Box */}
            <div className="rounded-xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] flex items-center mb-3">
                <Zap className="h-4 w-4 mr-1.5 text-emerald-500 rtl:ml-1.5 rtl:mr-0" />
                {t.keyHighlights}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#090D16] border border-black dark:border-slate-800 text-center">
                  <Zap className="h-5 w-5 text-emerald-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 block">{t.featureSpeed}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#090D16] border border-black dark:border-slate-800 text-center">
                  <ShieldCheck className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 block">{t.featureSecurity}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-[#090D16] border border-black dark:border-slate-800 text-center">
                  <Code className="h-5 w-5 text-purple-500 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 dark:text-slate-200 block">{t.featureApi}</span>
                </div>
              </div>
            </div>

            {/* Intent Keywords Use Cases Bento Box */}
            {website.intentKeywords && website.intentKeywords.length > 0 && (
              <div className="rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] flex items-center mb-3">
                  <Layers className="h-4 w-4 mr-1.5 text-purple-500 rtl:ml-1.5 rtl:mr-0" />
                  {t.intentKeywords}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {website.intentKeywords.map((intent, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onIntentClick?.(intent);
                        onClose();
                      }}
                      className="rounded-lg bg-white dark:bg-[#131B2E] border-2 border-black dark:border-[#2A364F] px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-[#F8FAFC] hover:bg-yellow-400 hover:text-slate-950 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      💡 "{intent}"
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column (1 col) - Pricing Table Breakdown & Tags */}
          <div className="space-y-6">
            
            {/* Pricing Plans Breakdown */}
            <div className="rounded-xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] flex items-center mb-3">
                <DollarSign className="h-4 w-4 mr-1 text-emerald-500" />
                {t.pricingPlans}
              </h3>

              <div className="space-y-3">
                {website.plans && website.plans.length > 0 ? (
                  website.plans.map((plan, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <div className="flex items-center justify-between font-black">
                        <span className="uppercase text-xs tracking-wider text-slate-900 dark:text-[#F8FAFC]">{plan.tier}</span>
                        <span className="font-mono text-xs text-blue-600 dark:text-blue-400">{plan.price}</span>
                      </div>
                      <p className="mt-1 text-[11px] text-slate-600 dark:text-[#94A3B8] leading-tight font-medium">
                        {plan.details}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500">Contact vendor for custom pricing</p>
                )}
              </div>
            </div>

            {/* Tag Cloud */}
            <div className="rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] mb-3">
                {t.tags}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {website.tags.map((tag, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onTagClick?.(tag);
                      onClose();
                    }}
                    className="rounded bg-white dark:bg-[#131B2E] border border-black px-2 py-1 text-[10px] font-bold font-mono text-slate-800 dark:text-slate-200 hover:bg-blue-500 hover:text-white transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Similar Recommended Websites Bento Sub-Grid */}
        {similarTools.length > 0 && (
          <div className="mt-8 border-t-2 border-black dark:border-[#2A364F] pt-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] mb-4 flex items-center">
              <Layers className="h-4 w-4 mr-2 text-blue-500 rtl:ml-2 rtl:mr-0" />
              {t.similarTools}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {similarTools.map((simTool) => (
                <div
                  key={simTool.id}
                  onClick={() => onSelectWebsite?.(simTool)}
                  className="cursor-pointer rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all hover:bg-white dark:hover:bg-[#131B2E]"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-black uppercase text-slate-900 dark:text-[#F8FAFC] truncate">
                      {simTool.name}
                    </h4>
                    {simTool.rating && (
                      <span className="text-[10px] font-black font-mono bg-yellow-400 text-slate-950 px-1.5 py-0.5 rounded border border-black">
                        ⭐ {simTool.rating.toFixed(1)}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-[#94A3B8] line-clamp-2 font-medium">
                    {language === 'ar' && simTool.descriptionAr ? simTool.descriptionAr : simTool.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
