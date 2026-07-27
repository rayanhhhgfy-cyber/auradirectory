import React, { useState, useEffect, useMemo } from 'react';
import { Website, Language, ThemeMode } from './types';
import { extendedWebsiteDirectory } from '../data/extendedDirectory';
import { Navbar } from './components/Navbar';
import { StatsBanner } from './components/StatsBanner';
import { SearchEngine } from './components/SearchEngine';
import { CompareModal } from './components/CompareModal';
import { SubmitToolModal } from './components/SubmitToolModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { WebsiteDetailModal } from './components/WebsiteDetailModal';

export default function App() {
  // 1. Language State (English & Arabic with RTL)
  const [language, setLanguage] = useState<Language>(() => {
    return (localStorage.getItem('aura_lang') as Language) || 'en';
  });

  // 2. Theme State (Dark & Light)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    return (localStorage.getItem('aura_theme') as ThemeMode) || 'dark';
  });

  // 3. Website Directory Data
  const [allWebsites, setAllWebsites] = useState<Website[]>(extendedWebsiteDirectory);

  // 4. Bookmarks State
  const [bookmarkIds, setBookmarkIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('aura_bookmarks');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // 5. Compare List State
  const [compareList, setCompareList] = useState<Website[]>([]);

  // 6. Modals & Drawers State
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [inspectedWebsite, setInspectedWebsite] = useState<Website | null>(null);

  // Sync Language & RTL direction
  useEffect(() => {
    localStorage.setItem('aura_lang', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Sync Theme (Dark / Light)
  useEffect(() => {
    localStorage.setItem('aura_theme', theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    }
  }, [theme]);

  // Sync Bookmarks in localStorage
  useEffect(() => {
    localStorage.setItem('aura_bookmarks', JSON.stringify(Array.from(bookmarkIds)));
  }, [bookmarkIds]);

  // Toggle Bookmark handler
  const handleToggleBookmark = (website: Website) => {
    setBookmarkIds(prev => {
      const next = new Set(prev);
      if (next.has(website.id)) {
        next.delete(website.id);
      } else {
        next.add(website.id);
      }
      return next;
    });
  };

  // Toggle Compare handler (max 4 tools)
  const handleToggleCompare = (website: Website) => {
    setCompareList(prev => {
      const exists = prev.some(w => w.id === website.id);
      if (exists) {
        return prev.filter(w => w.id !== website.id);
      } else {
        if (prev.length >= 4) {
          alert(language === 'ar' ? 'يمكنك مقارنة حتى 4 مواقع في المرة الواحدة' : 'You can compare up to 4 websites at a time');
          return prev;
        }
        return [...prev, website];
      }
    });
  };

  // Handle user submitted tool
  const handleAddSubmittedTool = (newTool: Website) => {
    setAllWebsites(prev => [newTool, ...prev]);
  };

  const bookmarkedWebsites = useMemo(() => {
    return allWebsites.filter(w => bookmarkIds.has(w.id));
  }, [allWebsites, bookmarkIds]);

  return (
    <div className="min-h-screen bg-amber-500/5 dark:bg-[#090D16] text-slate-900 dark:text-[#F8FAFC] transition-colors duration-250 font-sans selection:bg-yellow-400 selection:text-slate-950 pb-16">
      
      {/* Top Navigation */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        bookmarkCount={bookmarkIds.size}
        openBookmarks={() => setIsBookmarksOpen(true)}
        compareCount={compareList.length}
        openCompare={() => setIsCompareOpen(true)}
        openSubmitModal={() => setIsSubmitOpen(true)}
        totalWebsitesCount={allWebsites.length}
      />

      {/* Directory High-Tech Metric Stats */}
      <StatsBanner language={language} totalCount={allWebsites.length} />

      {/* Primary Search Engine Container */}
      <main>
        <SearchEngine
          websites={allWebsites}
          language={language}
          bookmarks={bookmarkIds}
          onToggleBookmark={handleToggleBookmark}
          compareList={compareList}
          onToggleCompare={handleToggleCompare}
          onInspectWebsite={(w) => setInspectedWebsite(w)}
        />
      </main>

      {/* Special Website Inspector Card Modal */}
      <WebsiteDetailModal
        website={inspectedWebsite}
        isOpen={!!inspectedWebsite}
        onClose={() => setInspectedWebsite(null)}
        language={language}
        isBookmarked={inspectedWebsite ? bookmarkIds.has(inspectedWebsite.id) : false}
        onToggleBookmark={handleToggleBookmark}
        isInCompare={inspectedWebsite ? compareList.some(c => c.id === inspectedWebsite.id) : false}
        onToggleCompare={handleToggleCompare}
        allWebsites={allWebsites}
        onSelectWebsite={(w) => setInspectedWebsite(w)}
      />

      {/* Compare Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={(w) => setCompareList(prev => prev.filter(item => item.id !== w.id))}
        onClearCompare={() => setCompareList([])}
        language={language}
      />

      {/* Submit Tool Modal */}
      <SubmitToolModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        onSubmit={handleAddSubmittedTool}
        language={language}
      />

      {/* Saved Bookmarks Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedWebsites={bookmarkedWebsites}
        onRemoveBookmark={(w) => handleToggleBookmark(w)}
        language={language}
      />

      {/* Directory Bento Footer */}
      <footer id="app-footer" className="mt-16 border-t-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] py-8 text-xs text-slate-600 dark:text-[#94A3B8]">
        <div className="mx-auto max-w-7xl px-4 flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p className="font-bold uppercase tracking-wider">
              © {new Date().getFullYear()} AuraDirectory &bull; {language === 'ar' ? 'جميع البيانات موثوقة ومفهرسة فورياً' : 'All data verified and indexed in real-time'}
            </p>
            <div className="flex items-center space-x-4 rtl:space-x-reverse font-black uppercase text-[11px]">
              <span className="text-blue-600 dark:text-blue-400">3,150+ {language === 'ar' ? 'موقع مفهرس' : 'Indexed Web Tools'}</span>
              <span>&bull;</span>
              <span className="text-purple-600 dark:text-purple-400">{language === 'ar' ? 'دعم ثنائي اللغة (عربي / إنجليزي)' : 'Bilingual EN/AR'}</span>
            </div>
          </div>
          
          <div className="pt-4 border-t border-slate-200 dark:border-[#2A364F] w-full flex items-center justify-center">
            <p id="creator-attribution" className="text-sm sm:text-base font-black text-slate-900 dark:text-slate-100 tracking-wide flex items-center gap-2 flex-wrap justify-center">
              <span>{language === 'ar' ? 'تم التطوير بواسطة' : 'Built by'}</span>
              <span className="px-3 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 font-extrabold shadow-sm">
                Rayyan Aljamal ريان الجمل
              </span>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
