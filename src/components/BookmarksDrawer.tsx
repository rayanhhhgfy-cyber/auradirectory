import React from 'react';
import { X, Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import { Website, Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedWebsites: Website[];
  onRemoveBookmark: (website: Website) => void;
  language: Language;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedWebsites,
  onRemoveBookmark,
  language,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="h-full w-full max-w-md bg-white dark:bg-[#131B2E] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-slate-900 dark:text-[#F8FAFC] flex flex-col justify-between border-l-2 border-black dark:border-[#2A364F]">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-black dark:border-[#2A364F] pb-4 mb-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500" />
              <h3 className="text-lg font-black uppercase tracking-tight">{t.savedBookmarks} ({bookmarkedWebsites.length})</h3>
            </div>
            <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Bookmarks List */}
          {bookmarkedWebsites.length === 0 ? (
            <div className="py-12 text-center text-slate-500 font-bold uppercase tracking-wider text-xs">
              <p>{t.noBookmarks}</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
              {bookmarkedWebsites.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:border-blue-500"
                >
                  <div className="pr-2 rtl:pl-2 rtl:pr-0">
                    <h4 className="text-sm font-black uppercase text-slate-900 dark:text-[#F8FAFC]">{item.name}</h4>
                    <span className="text-[10px] text-purple-600 dark:text-[#8B5CF6] font-black uppercase tracking-wider">{item.category}</span>
                  </div>

                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded bg-blue-500 border border-black p-2 text-white hover:bg-blue-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    <button
                      onClick={() => onRemoveBookmark(item)}
                      className="rounded bg-rose-100 dark:bg-rose-950/60 border border-black p-2 text-rose-600 dark:text-rose-400 hover:bg-rose-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full rounded-lg bg-slate-900 dark:bg-slate-800 border-2 border-black py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors mt-4"
        >
          {t.close}
        </button>
      </div>
    </div>
  );
};
