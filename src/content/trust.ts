/**
 * Why a farmer can trust an answer, in five plain steps. The public
 * explanation of how guidance is kept honest; it names no internals.
 */
export interface TrustStep {
  id: string;
  title: string;
  body: string;
  owner: "you" | "guidance" | "ai";
}

export const TRUST_STEPS: TrustStep[] = [
  { id: "ask", owner: "you", title: "You talk to your land", body: "By voice or text, in your language, with a photo if you have one. “My older rice leaves are turning yellow. What should I do?”" },
  { id: "field", owner: "guidance", title: "It knows this field", body: "This land's conversation already carries what the sky, soil, water, temperature and weather have been doing here." },
  { id: "stage", owner: "guidance", title: "It knows this crop's stage", body: "Rice at panicle initiation needs different care from rice at tillering. Your crop plan knows where this field is." },
  { id: "guidance", owner: "guidance", title: "Only expert-approved guidance can answer", body: "Guidance reaches you only with its dose, its waiting period and an expert's approval. A safety check always wins." },
  { id: "explain", owner: "ai", title: "Explained, with the reason", body: "What to apply, how much, when, and why your crop's stage matters, in your language. If a photo contradicts an estimate, the photo wins." },
];

export const TRUST_OWNERS = {
  you: { label: "You", note: "Ask and decide" },
  guidance: { label: "Expert-approved guidance", note: "Decides what can be recommended" },
  ai: { label: "AI", note: "Understands and explains, never prescribes" },
} as const;
