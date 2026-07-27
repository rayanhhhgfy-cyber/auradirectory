import React, { useMemo, useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { Search, Filter, Star, X, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { Website, Language, SearchFilterState, PricingCategory } from '../types';
import { WebsiteCard } from './WebsiteCard';
import { getTranslation } from '../lib/i18n';

interface SearchEngineProps {
  websites: Website[];
  language: Language;
  bookmarks: Set<string>;
  onToggleBookmark: (website: Website) => void;
  compareList: Website[];
  onToggleCompare: (website: Website) => void;
  onInspectWebsite?: (website: Website) => void;
}

const sampleIntents = [
  { en: "host nextjs website", ar: "استضافة موقع نكست جيه اس" },
  { en: "free postgresql database", ar: "قواعد بيانات بوسطجريس مجانية" },
  { en: "ai voice generator clone", ar: "توليد الأصوات بالذكاء الاصطناعي" },
  { en: "ui ux design prototype", ar: "تصميم الواجهات والبروتوتايب" },
  { en: "a website to edit videos", ar: "تعديل المونتاج والفيديو" },
  { en: "no code website builder", ar: "بناء مواقع بدون كود" },
  { en: "error tracking debugging", ar: "تتبع أخطاء البرمجة" },
  { en: "vector search database llm", ar: "قاعدة بيانات المتجهات للذكاء الاصطناعي" }
];

export const SearchEngine: React.FC<SearchEngineProps> = ({
  websites,
  language,
  bookmarks,
  onToggleBookmark,
  compareList,
  onToggleCompare,
  onInspectWebsite,
}) => {
  const t = getTranslation(language);

  // Filter State
  const [filters, setFilters] = useState<SearchFilterState>({
    query: '',
    category: '',
    pricingCategory: '',
    isBestOnly: false,
    selectedTag: '',
    sortBy: 'relevance',
    page: 1,
    pageSize: 24,
  });

  // Extract unique categories and tags for quick filters
  const categories = useMemo(() => {
    const set = new Set<string>();
    websites.forEach(w => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set).sort();
  }, [websites]);

  const pricingCategories: PricingCategory[] = [
    'Free',
    'Free Trial',
    '$1-$10/mo',
    '$10-$25/mo',
    '$25+/mo',
    'Enterprise'
  ];

  // Initialize Fuse.js instance
  const fuse = useMemo(() => {
    return new Fuse(websites, {
      includeScore: true,
      threshold: 0.38,
      ignoreLocation: true,
      keys: [
        { name: 'name', weight: 0.35 },
        { name: 'intentKeywords', weight: 0.25 },
        { name: 'tags', weight: 0.15 },
        { name: 'category', weight: 0.1 },
        { name: 'subcategory', weight: 0.08 },
        { name: 'description', weight: 0.04 },
        { name: 'descriptionAr', weight: 0.03 },
      ],
    });
  }, [websites]);

  // Perform search & filter
  const filteredWebsites = useMemo(() => {
    let list: Website[] = [...websites];

    // 1. Fuzzy Search
    if (filters.query.trim()) {
      const results = fuse.search(filters.query.trim());
      list = results.map(r => r.item);
    }

    // 2. Category Filter
    if (filters.category) {
      list = list.filter(w => w.category === filters.category);
    }

    // 3. Pricing Filter
    if (filters.pricingCategory) {
      list = list.filter(w => w.pricingCategory === filters.pricingCategory);
    }

    // 4. "The Best" Badge Filter
    if (filters.isBestOnly) {
      list = list.filter(w => w.isBest);
    }

    // 5. Selected Tag Filter
    if (filters.selectedTag) {
      list = list.filter(w => w.tags && w.tags.includes(filters.selectedTag));
    }

    // 6. Sorting
    if (filters.sortBy === 'best') {
      list.sort((a, b) => (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0));
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (filters.sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [websites, fuse, filters]);

  // Reset page when filters change
  useEffect(() => {
    setFilters(prev => ({ ...prev, page: 1 }));
  }, [filters.query, filters.category, filters.pricingCategory, filters.isBestOnly, filters.selectedTag, filters.sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredWebsites.length / filters.pageSize) || 1;
  const paginatedList = useMemo(() => {
    const start = (filters.page - 1) * filters.pageSize;
    return filteredWebsites.slice(start, start + filters.pageSize);
  }, [filteredWebsites, filters.page, filters.pageSize]);

  const compareSet = useMemo(() => new Set(compareList.map(c => c.id)), [compareList]);

  const resetAllFilters = () => {
    setFilters({
      query: '',
      category: '',
      pricingCategory: '',
      isBestOnly: false,
      selectedTag: '',
      sortBy: 'relevance',
      page: 1,
      pageSize: 24,
    });
  };

  const hasActiveFilters = !!(filters.query || filters.category || filters.pricingCategory || filters.isBestOnly || filters.selectedTag);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      
      {/* Search Header Bento Container */}
      <div className="relative mb-6 rounded-2xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.85)]">
        <div className="mx-auto max-w-3xl text-center mb-6">
          <div className="inline-block px-3 py-1 bg-black text-white dark:bg-blue-500 dark:text-white text-[10px] font-black uppercase tracking-widest border border-black mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            DIRECTORY &bull; SEARCH ENGINE
          </div>
          <h2 className="text-2xl font-black uppercase tracking-tight sm:text-3xl text-slate-900 dark:text-[#F8FAFC]">
            {language === 'ar' ? 'ابحث عن أي موقع أو أداة بالاسم أو الهدف' : 'Search Any Website or Tool by Name or Intent'}
          </h2>
          <p className="mt-2 text-xs font-medium text-slate-600 dark:text-[#94A3B8]">
            {language === 'ar'
              ? 'محرك بحث فوري يدعم التصفية الدقيقة وإيجاد أفضل الحلول التقنية مجاناً'
              : 'Instant fuzzy-search engine supporting natural intent matching, verified pricing, and category filters'}
          </p>
        </div>

        {/* Primary Bento Search Bar */}
        <div className="relative mx-auto max-w-2xl">
          <div className="relative flex items-center">
            <Search className="absolute left-4 rtl:right-4 rtl:left-auto h-5 w-5 text-blue-500" />
            <input
              type="text"
              id="search-input"
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border-2 border-black dark:border-blue-500 bg-slate-50 dark:bg-[#090D16] py-3.5 pl-12 pr-12 rtl:pr-12 rtl:pl-12 text-sm font-bold text-slate-900 dark:text-[#F8FAFC] placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all"
            />
            {filters.query && (
              <button
                onClick={() => setFilters(prev => ({ ...prev, query: '' }))}
                className="absolute right-4 rtl:left-4 rtl:right-auto text-slate-400 hover:text-slate-900 dark:hover:text-[#F8FAFC] p-1"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Intent Keyword Suggestions */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-slate-600 dark:text-[#94A3B8]">
          <span className="font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center text-[11px]">
            <Sparkles className="h-3.5 w-3.5 mr-1 rtl:ml-1 rtl:mr-0 text-blue-500" />
            {t.intentSuggestionsTitle}:
          </span>
          {sampleIntents.map((item, i) => {
            const queryText = language === 'ar' ? item.ar : item.en;
            return (
              <button
                key={i}
                onClick={() => setFilters(prev => ({ ...prev, query: queryText }))}
                className="rounded-md bg-slate-100 dark:bg-[#090D16] border border-black dark:border-[#2A364F] px-2.5 py-1 text-[11px] font-bold font-mono text-slate-800 dark:text-[#F8FAFC] hover:bg-yellow-400 hover:text-slate-950 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                "{queryText}"
              </button>
            );
          })}
        </div>
      </div>

      {/* Control Bar: Categories, Pricing, Best Toggle, Sort */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        
        {/* Left Filters */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Category Dropdown */}
          <div className="relative">
            <select
              id="category-select"
              value={filters.category}
              onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
              className="rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option value="">{t.allCategories}</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Pricing Category Dropdown */}
          <div className="relative">
            <select
              id="pricing-select"
              value={filters.pricingCategory}
              onChange={(e) => setFilters(prev => ({ ...prev, pricingCategory: e.target.value }))}
              className="rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <option value="">{t.allPricing}</option>
              {pricingCategories.map((priceCat, pIdx) => (
                <option key={pIdx} value={priceCat}>
                  {t.pricingCategories[priceCat] || priceCat}
                </option>
              ))}
            </select>
          </div>

          {/* Golden "THE BEST" Badge Filter Toggle (#F59E0B) */}
          <button
            onClick={() => setFilters(prev => ({ ...prev, isBestOnly: !prev.isBestOnly }))}
            id="best-toggle-btn"
            className={`inline-flex items-center space-x-1.5 rtl:space-x-reverse rounded-lg border-2 border-black px-3 py-2 text-xs font-black uppercase tracking-wider transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
              filters.isBestOnly
                ? 'bg-yellow-400 text-slate-950'
                : 'bg-slate-50 dark:bg-[#090D16] text-slate-800 dark:text-[#94A3B8] hover:bg-yellow-100 dark:hover:bg-yellow-950'
            }`}
          >
            <Star className={`h-3.5 w-3.5 ${filters.isBestOnly ? 'fill-slate-950' : 'text-amber-500'}`} />
            <span>{t.bestOnly}</span>
          </button>
        </div>

        {/* Right Sorting Controls */}
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ArrowUpDown className="h-4 w-4 text-slate-500" />
          <span className="text-xs font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8] hidden sm:inline">{t.sortBy}:</span>
          <select
            id="sort-select"
            value={filters.sortBy}
            onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
            className="rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] px-3 py-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <option value="relevance">{t.sortRelevance}</option>
            <option value="best">{t.sortBest}</option>
            <option value="rating">{t.sortRating}</option>
            <option value="name">{t.sortName}</option>
          </select>
        </div>
      </div>

      {/* Active Filter Pills Bar */}
      {hasActiveFilters && (
        <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-slate-500 uppercase tracking-wider text-[11px]">{t.showingResults}:</span>
          {filters.query && (
            <span className="inline-flex items-center rounded bg-blue-500 text-white px-3 py-1 font-mono border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              "{filters.query}"
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center rounded bg-purple-600 text-white px-3 py-1 uppercase tracking-wider text-[10px] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {filters.category}
            </span>
          )}
          {filters.pricingCategory && (
            <span className="inline-flex items-center rounded bg-emerald-500 text-white px-3 py-1 uppercase tracking-wider text-[10px] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {filters.pricingCategory}
            </span>
          )}
          {filters.isBestOnly && (
            <span className="inline-flex items-center rounded bg-yellow-400 text-slate-950 px-3 py-1 uppercase tracking-wider text-[10px] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              ★ {t.bestOnly}
            </span>
          )}
          {filters.selectedTag && (
            <span className="inline-flex items-center rounded bg-purple-500 text-white px-3 py-1 font-mono text-[10px] border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              #{filters.selectedTag}
            </span>
          )}
          <button
            onClick={resetAllFilters}
            className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 hover:underline ml-2 rtl:mr-2"
          >
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Stats Counter Bar */}
      <div className="mb-4 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
        <div>
          {t.showingResults} <span className="font-mono text-slate-900 dark:text-[#F8FAFC]">{filteredWebsites.length}</span> {t.of} <span className="font-mono text-slate-900 dark:text-[#F8FAFC]">{websites.length}</span> {t.websites}
        </div>
        <div>
          {language === 'ar' ? 'الصفحة' : 'Page'} <span className="font-mono text-slate-900 dark:text-[#F8FAFC]">{filters.page}</span> / {totalPages}
        </div>
      </div>

      {/* Main Grid View */}
      {paginatedList.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedList.map((item) => (
            <WebsiteCard
              key={item.id}
              website={item}
              language={language}
              isBookmarked={bookmarks.has(item.id)}
              onToggleBookmark={onToggleBookmark}
              isInCompare={compareSet.has(item.id)}
              onToggleCompare={onToggleCompare}
              onCategoryClick={(cat) => setFilters(prev => ({ ...prev, category: cat }))}
              onTagClick={(tag) => setFilters(prev => ({ ...prev, selectedTag: tag }))}
              onInspectWebsite={onInspectWebsite}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="my-12 rounded-2xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-12 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500 text-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
            <Search className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-black uppercase text-slate-900 dark:text-[#F8FAFC]">{t.noResultsTitle}</h3>
          <p className="mt-2 text-xs font-medium text-slate-600 dark:text-[#94A3B8] max-w-md mx-auto">{t.noResultsSub}</p>
          <button
            onClick={resetAllFilters}
            className="mt-6 inline-flex items-center rounded-lg bg-blue-500 border-2 border-black px-5 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-600 transition-colors"
          >
            {t.resetFilters}
          </button>
        </div>
      )}

      {/* Pagination Bar */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center space-x-2 rtl:space-x-reverse">
          <button
            disabled={filters.page === 1}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
            className="inline-flex items-center rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 hover:bg-slate-100 transition-all"
          >
            <ChevronLeft className="h-4 w-4 mr-1 rtl:ml-1 rtl:mr-0 rtl-flip" />
            <span>{language === 'ar' ? 'السابق' : 'Previous'}</span>
          </button>

          <span className="px-4 text-xs font-mono font-black text-slate-900 dark:text-[#F8FAFC]">
            {filters.page} / {totalPages}
          </span>

          <button
            disabled={filters.page >= totalPages}
            onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
            className="inline-flex items-center rounded-lg border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] px-4 py-2 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-[#F8FAFC] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-40 hover:bg-slate-100 transition-all"
          >
            <span>{language === 'ar' ? 'التالي' : 'Next'}</span>
            <ChevronRight className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0 rtl-flip" />
          </button>
        </div>
      )}
    </div>
  );
};
