export interface Plan {
  tier: string;
  price: string;
  details: string;
}

export type PricingCategory = 
  | 'Free'
  | 'Free Trial'
  | '$1-$10/mo'
  | '$10-$25/mo'
  | '$25+/mo'
  | 'Enterprise';

export interface Website {
  id: string;
  name: string;
  url: string;
  category: string;
  subcategory?: string;
  tags: string[];
  description: string;
  descriptionAr?: string;
  plans: Plan[];
  isBest?: boolean;
  pricingCategory?: PricingCategory;
  intentKeywords?: string[];
  rating?: number;
  featuredOrder?: number;
}

export type Language = 'en' | 'ar';
export type ThemeMode = 'dark' | 'light';

export interface SearchFilterState {
  query: string;
  category: string;
  pricingCategory: string;
  isBestOnly: boolean;
  selectedTag: string;
  sortBy: 'relevance' | 'best' | 'name' | 'rating';
  page: number;
  pageSize: number;
}
