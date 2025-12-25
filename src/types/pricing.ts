export interface PricingPlan {
  name: string;
  price: number | string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
  badge?: string;
}
