import React, { useState } from 'react';
import { X, PlusCircle, CheckCircle } from 'lucide-react';
import { Website, Language } from '../types';
import { getTranslation } from '../lib/i18n';

interface SubmitToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newWebsite: Website) => void;
  language: Language;
}

export const SubmitToolModal: React.FC<SubmitToolModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  language,
}) => {
  if (!isOpen) return null;

  const t = getTranslation(language);

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [descEn, setDescEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [tags, setTags] = useState('');
  const [tier, setTier] = useState('Free');
  const [price, setPrice] = useState('$0');
  const [details, setDetails] = useState('Free community access');
  const [successMsg, setSuccessMsg] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    const cleanTags = tags.split(',').map(t => t.trim()).filter(Boolean);

    const newSite: Website = {
      id: `user-submitted-${Date.now()}`,
      name: name.trim(),
      url: formattedUrl,
      category,
      tags: cleanTags.length ? cleanTags : ['Tools', 'SaaS'],
      description: descEn.trim() || 'User submitted application.',
      descriptionAr: descAr.trim() || 'تطبيق تم إرساله من المستخدم.',
      plans: [{ tier, price, details }],
      isBest: false,
      pricingCategory: tier.includes('Free') ? 'Free' : '$1-$10/mo',
      intentKeywords: cleanTags,
      rating: 4.8
    };

    onSubmit(newSite);
    setSuccessMsg(true);
    setTimeout(() => {
      setSuccessMsg(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-fade-in">
      <div className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border-2 border-black dark:border-[#2A364F] bg-white dark:bg-[#131B2E] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-slate-900 dark:text-[#F8FAFC]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b-2 border-black dark:border-[#2A364F] pb-4 mb-5">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <PlusCircle className="h-5 w-5 text-blue-500" />
            <h3 className="text-lg font-black uppercase tracking-tight">{t.submitToolTitle}</h3>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-500 dark:text-[#94A3B8] hover:text-slate-900 dark:hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        {successMsg ? (
          <div className="py-12 text-center text-emerald-600 dark:text-emerald-400">
            <CheckCircle className="mx-auto h-12 w-12 mb-3" />
            <p className="text-lg font-black uppercase tracking-wide">{t.submittedSuccess}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolName} *</label>
              <input
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Acme Studio"
                className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolUrl} *</label>
              <input
                type="text"
                required
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://acmestudio.io"
                className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolCategory}</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Software Development">Software Development</option>
                  <option value="Artificial Intelligence">Artificial Intelligence</option>
                  <option value="Design">Design</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Backend Services">Backend Services</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Marketing">Marketing</option>
                  <option value="E-commerce">E-commerce</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolTags}</label>
                <input
                  type="text"
                  value={tags}
                  onChange={e => setTags(e.target.value)}
                  placeholder="React, AI, Design"
                  className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolDescEn}</label>
              <textarea
                rows={2}
                value={descEn}
                onChange={e => setDescEn(e.target.value)}
                placeholder="A high performance platform for creators..."
                className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div>
              <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">{t.toolDescAr}</label>
              <textarea
                rows={2}
                value={descAr}
                onChange={e => setDescAr(e.target.value)}
                placeholder="منصة عالية الأداء لصناع المحتوى..."
                className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2.5 font-bold text-slate-900 dark:text-white focus:border-blue-500 focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              />
            </div>

            <div className="grid grid-cols-3 gap-2 border-t-2 border-black dark:border-[#2A364F] pt-3">
              <div>
                <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">Plan Tier</label>
                <input
                  type="text"
                  value={tier}
                  onChange={e => setTier(e.target.value)}
                  className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2 font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">Price</label>
                <input
                  type="text"
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2 font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 font-black uppercase tracking-wider text-slate-600 dark:text-[#94A3B8]">Details</label>
                <input
                  type="text"
                  value={details}
                  onChange={e => setDetails(e.target.value)}
                  className="w-full rounded-lg border-2 border-black dark:border-[#2A364F] bg-slate-50 dark:bg-[#090D16] p-2 font-bold text-slate-900 dark:text-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-blue-500 border-2 border-black py-3 text-xs font-black uppercase tracking-wider text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-600 transition-all active:translate-x-0.5 active:translate-y-0.5"
            >
              {t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
