/**
 * Illustrative partner brands for the white-label transformation. These are
 * organisation *types*, not customers. Names are generic by design.
 */
export interface TenantExample {
  id: string;
  type: string;
  name: string;
  brand: string;
  brandSoft: string;
  initials: string;
  farmersLabel: string;
}

export const TENANT_EXAMPLES: TenantExample[] = [
  { id: "ks", type: "Platform default", name: "KisanShakti AI", brand: "152 55% 24%", brandSoft: "150 30% 92%", initials: "KS", farmersLabel: "Farmers" },
  { id: "fpo", type: "Farmer producer organisation", name: "Your FPO", brand: "28 60% 38%", brandSoft: "30 50% 92%", initials: "FP", farmersLabel: "Member farmers" },
  { id: "dealer", type: "Dealer network", name: "Your dealer network", brand: "222 45% 32%", brandSoft: "222 40% 93%", initials: "DN", farmersLabel: "Customer farmers" },
  { id: "input", type: "Agri-input company", name: "Your input brand", brand: "340 45% 36%", brandSoft: "340 40% 94%", initials: "AI", farmersLabel: "Network farmers" },
];
