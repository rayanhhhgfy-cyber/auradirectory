import React from 'react';
import { X, ExternalLink, Star, Trash2, CheckCircle } from 'lucide-react';
import { Website, Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: Website[];
  onRemoveFromCompare: (website: Website) => void;
  onClearCompare: () => void;
  language: Language;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onClearCompare,
  language,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-slate-900 dark:text-[#F8FAFC]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-[#2A364F] pb-4 mb-6">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tight text-slate-900 dark:text-[#F8FAFC]">{t.compareModalTitle}</h3>
            <p className="text-xs font-medium text-slate-600 dark:text-[#94A3B8]">{t.compareModalSub}</p>
          </div>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {compareList.length > 0 && (
              <button
                onClick={onClearCompare}
                className="inline-flex items-center space-x-1 rtl:space-x-reverse text-xs uppercase tracking-wider text-rose-600 font-black px-3 py-1.5 rounded-lg border-2 border-black bg-rose-100 dark:bg-rose-950/60 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-rose-200"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t.clearCompare}</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-700 dark:text-[#94A3B8] hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Content Table / Grid */}
        {compareList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 font-bold uppercase tracking-wider text-xs">
            <p>{t.noCompare}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
            {compareList.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <div>
                  <div className="flex items-start justify-between mb-2">
                    {item.isBest && (
                      <span className="inline-flex items-center rounded bg-yellow-400 border border-black px-2 py-0.5 text-[10px] font-black uppercase text-slate-950">
                        <Star className="mr-1 h-3 w-3 fill-slate-950" />
                        BEST
                      </span>
                    )}
                    <button
                      onClick={() => onRemoveFromCompare(item)}
                      className="ml-auto p-1 text-slate-500 hover:text-rose-600"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <h4 className="text-base font-black uppercase text-slate-900 dark:text-[#F8FAFC]">{item.name}</h4>
                  <p className="text-xs text-purple-600 dark:text-[#8B5CF6] font-black uppercase tracking-wider mt-1">{item.category}</p>
                  <p className="text-xs text-slate-600 dark:text-[#94A3B8] font-medium mt-2 line-clamp-3">
                    {language === 'ar' && item.descriptionAr ? item.descriptionAr : item.description}
                  </p>

                  <div className="mt-4 border-t border-slate-300 dark:border-[#2A364F] pt-3">
                    <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 dark:text-[#3B82F6]">{t.pricingPlans}</span>
                    <div className="mt-1 space-y-1 text-xs">
                      {item.plans.map((p, idx) => (
                        <div key={idx} className="flex justify-between text-slate-600 dark:text-[#94A3B8]">
                          <span className="uppercase text-[10px] font-bold">{p.tier}</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-[#F8FAFC]">{p.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 flex items-center justify-center space-x-1.5 rounded-lg bg-blue-500 border-2 border-black py-2 text-xs font-black uppercase tracking-wider text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-600 transition-colors"
                >
                  <span>{t.visitWebsite}</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
