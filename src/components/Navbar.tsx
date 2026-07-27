import React from 'react';
import { Globe, Moon, Sun, Bookmark, ArrowLeftRight, PlusCircle, Compass, Sparkles } from 'lucide-react';
import { Language, ThemeMode } from '../types';
import { getTranslation } from '../lib/i18n';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  bookmarkCount: number;
  openBookmarks: () => void;
  compareCount: number;
  openCompare: () => void;
  openSubmitModal: () => void;
  totalWebsitesCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  theme,
  setTheme,
  bookmarkCount,
  openBookmarks,
  compareCount,
  openCompare,
  openSubmitModal,
  totalWebsitesCount,
}) => {
  const t = getTranslation(language);

  return (
    <>
      {/* Top Header Navbar */}
      <header className="sticky top-0 z-40 border-b-2 border-black dark:border-[#2A364F] bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md transition-colors shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2.5 sm:px-6 sm:py-3">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 rtl:space-x-reverse">
            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-blue-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Compass className="h-5 w-5 sm:h-6 sm:w-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2 rtl:space-x-reverse">
                <h1 className="text-base sm:text-xl font-black uppercase tracking-tight text-slate-900 dark:text-[#F8FAFC]">
                  {t.siteTitle}
                </h1>
                <span className="inline-flex items-center rounded bg-yellow-400 text-slate-950 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-wider border-2 border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="mr-0.5 sm:mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-slate-950 rtl:ml-0.5 rtl:mr-0" />
                  VERIFIED
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] hidden xs:block sm:block">
                {t.siteSubtitle} &bull; <span className="text-blue-600 dark:text-blue-400 font-mono">{totalWebsitesCount.toLocaleString()} {t.websites}</span>
              </p>
            </div>
          </div>

          {/* Right Action Tools (Desktop & Mobile Header) */}
          <div className="flex items-center space-x-1.5 sm:space-x-3 rtl:space-x-reverse">
            
            {/* Submit Tool Button */}
            <button
              onClick={openSubmitModal}
              id="nav-submit-btn"
              title={t.submitTool}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 rtl:space-x-reverse rounded-lg bg-blue-500 hover:bg-blue-600 px-2.5 py-1.5 sm:px-3.5 sm:py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <PlusCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              <span>{t.submitTool}</span>
            </button>

            {/* Compare Button */}
            <button
              onClick={openCompare}
              id="nav-compare-btn"
              title={t.compareModalTitle}
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-1.5 sm:p-2 text-slate-900 dark:text-[#F8FAFC] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 dark:hover:bg-[#1A243B] transition-all"
            >
              <ArrowLeftRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {compareCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:right-auto flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 border border-black text-[9px] sm:text-[10px] font-black text-white">
                  {compareCount}
                </span>
              )}
            </button>

            {/* Bookmarks Drawer Button */}
            <button
              onClick={openBookmarks}
              id="nav-bookmarks-btn"
              title={t.savedBookmarks}
              className="relative inline-flex items-center justify-center rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-1.5 sm:p-2 text-slate-900 dark:text-[#F8FAFC] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 dark:hover:bg-[#1A243B] transition-all"
            >
              <Bookmark className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-500 fill-amber-500" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 rtl:-left-1.5 rtl:right-auto flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 border border-black text-[9px] sm:text-[10px] font-black text-slate-950">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Language Toggle (EN / AR) */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              id="nav-lang-toggle"
              title={language === 'en' ? 'التحويل للعربية' : 'Switch to English'}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 rtl:space-x-reverse rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] px-2 py-1.5 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 dark:hover:bg-[#1A243B] transition-all"
            >
              <Globe className="h-3.5 w-3.5 text-blue-500" />
              <span className="hidden xs:inline sm:inline">{language === 'en' ? 'العربية' : 'English'}</span>
              <span className="xs:hidden sm:hidden">{language === 'en' ? 'AR' : 'EN'}</span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              id="nav-theme-toggle"
              aria-label="Toggle Theme"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="inline-flex items-center justify-center rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-1.5 sm:p-2 text-slate-900 dark:text-[#F8FAFC] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] sm:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-slate-100 dark:hover:bg-[#1A243B] transition-all"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 text-amber-400" />
              ) : (
                <Moon className="h-4 w-4 text-slate-800" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* Mobile Sticky Bottom Action Dock (Visible only on phone screens < 640px) */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 border-t-2 border-black dark:border-[#2A364F] bg-white/95 dark:bg-[#090D16]/95 backdrop-blur-md px-2 py-2 flex items-center justify-around shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        
        {/* Mobile Add Website Button */}
        <button
          onClick={openSubmitModal}
          id="mobile-bottom-submit-btn"
          className="flex flex-col items-center justify-center text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 active:scale-95 transition-transform"
        >
          <div className="p-1.5 bg-blue-500 text-white rounded-md border border-black shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <PlusCircle className="h-4 w-4" />
          </div>
          <span className="mt-1">{t.submitTool}</span>
        </button>

        {/* Mobile Compare Button */}
        <button
          onClick={openCompare}
          id="mobile-bottom-compare-btn"
          className="relative flex flex-col items-center justify-center text-[10px] font-black uppercase text-slate-800 dark:text-[#F8FAFC] active:scale-95 transition-transform"
        >
          <div className="p-1.5 bg-slate-100 dark:bg-[#131B2E] rounded-md border border-black dark:border-[#2A364F] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <ArrowLeftRight className="h-4 w-4 text-purple-500" />
          </div>
          {compareCount > 0 && (
            <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[9px] text-white border border-black font-black">
              {compareCount}
            </span>
          )}
          <span className="mt-1">{language === 'ar' ? 'مقارنة' : 'Compare'}</span>
        </button>

        {/* Mobile Bookmarks Button */}
        <button
          onClick={openBookmarks}
          id="mobile-bottom-bookmarks-btn"
          className="relative flex flex-col items-center justify-center text-[10px] font-black uppercase text-slate-800 dark:text-[#F8FAFC] active:scale-95 transition-transform"
        >
          <div className="p-1.5 bg-slate-100 dark:bg-[#131B2E] rounded-md border border-black dark:border-[#2A364F] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <Bookmark className="h-4 w-4 text-amber-500 fill-amber-500" />
          </div>
          {bookmarkCount > 0 && (
            <span className="absolute -top-1 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[9px] text-slate-950 border border-black font-black">
              {bookmarkCount}
            </span>
          )}
          <span className="mt-1">{language === 'ar' ? 'محفوظات' : 'Saved'}</span>
        </button>

        {/* Mobile Language Toggle */}
        <button
          onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
          id="mobile-bottom-lang-toggle"
          className="flex flex-col items-center justify-center text-[10px] font-black uppercase text-slate-800 dark:text-[#F8FAFC] active:scale-95 transition-transform"
        >
          <div className="p-1.5 bg-slate-100 dark:bg-[#131B2E] rounded-md border border-black dark:border-[#2A364F] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            <Globe className="h-4 w-4 text-blue-500" />
          </div>
          <span className="mt-1">{language === 'en' ? 'العربية' : 'English'}</span>
        </button>

        {/* Mobile Theme Toggle */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          id="mobile-bottom-theme-toggle"
          className="flex flex-col items-center justify-center text-[10px] font-black uppercase text-slate-800 dark:text-[#F8FAFC] active:scale-95 transition-transform"
        >
          <div className="p-1.5 bg-slate-100 dark:bg-[#131B2E] rounded-md border border-black dark:border-[#2A364F] shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)]">
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-800" />
            )}
          </div>
          <span className="mt-1">{theme === 'dark' ? 'Light' : 'Dark'}</span>
        </button>

      </div>
    </>
  );
};
