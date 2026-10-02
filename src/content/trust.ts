/**
 * Why a farmer can trust a recommendation, in five plain steps. This is the
 * public explanation of how answers are governed; it names no internals.
 */
export interface TrustStep {
  id: string;
  title: string;
  body: string;
  owner: "you" | "guidance" | "ai";
}

export const TRUST_STEPS: TrustStep[] = [
  { id: "ask", owner: "you", title: "You ask, in your language", body: "By voice or text, with a photo if you have one. “My older rice leaves are turning yellow. What should I do?”" },
  { id: "field", owner: "guidance", title: "Checked against your field", body: "What the weather has done to this land, what the satellite saw, how much water it holds." },
  { id: "stage", owner: "guidance", title: "Checked against your crop's stage", body: "Rice at panicle initiation needs different care from rice at tillering. The schedule knows which stage your field is in." },
  { id: "guidance", owner: "guidance", title: "Matched to expert-approved guidance", body: "Only guidance that carries its dose, its waiting period and an expert's approval can reach you. A safety check always wins." },
  { id: "explain", owner: "ai", title: "Explained, with the reason", body: "The answer comes back in your language: what to apply, how much, when, and why your crop's stage matters. If a photo contradicts an estimate, the photo wins." },
];

export const TRUST_OWNERS = {
  you: { label: "You", note: "Ask and decide" },
  guidance: { label: "Governed guidance", note: "Checks and decides what can be recommended" },
  ai: { label: "AI", note: "Understands and explains, never prescribes" },
} as const;
