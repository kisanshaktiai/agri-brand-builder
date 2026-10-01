/**
 * One real decision, node by node. The rule, hypothesis and source below were
 * read from the governed knowledge base (decision_rules RICE_NUTR_N_TOP2_001,
 * hypothesis HYP_RICE_N_DEFICIT_001) on 2026-10-01. The farmer's words are an
 * illustrative question; every other node is the rule as stored.
 */
export interface ChainNode {
  id: string;
  step: string;
  title: string;
  body: string;
  /** Short machine-flavoured detail shown in mono. */
  detail?: string;
  owner: "language" | "brain" | "gate";
}

export const EVIDENCE_CHAIN: ChainNode[] = [
  { id: "question", step: "01", owner: "language", title: "The farmer asks, in Marathi", body: "“माझ्या भाताची जुनी पाने पिवळी पडत आहेत. काय करू?” — My older rice leaves are turning yellow. What should I do?", detail: "lang=mr · voice" },
  { id: "intent", step: "02", owner: "language", title: "Canonical intent", body: "The language model turns the question into one canonical intent the Decision Brain understands. It does not answer.", detail: "intent: nutrient_concern · crop: rice" },
  { id: "observation", step: "03", owner: "brain", title: "Observation", body: "Pale yellow older leaves, recorded against the observation master. A leaf colour chart reading or a photo can be requested to confirm.", detail: "observation_category: nutrient · plant_part: older leaves" },
  { id: "hypothesis", step: "04", owner: "brain", title: "Hypothesis", body: "Nitrogen deficiency in rice. Biological basis: pale yellow older leaves first; leaf colour chart reading below threshold.", detail: "HYP_RICE_N_DEFICIT_001" },
  { id: "state", step: "05", owner: "brain", title: "Crop stage and land state", body: "The land's schedule says the crop is at panicle initiation, 35 to 45 days after transplanting. The rule only applies in that window.", detail: "stage: panicle_initiation · das: 35–45" },
  { id: "rule", step: "06", owner: "brain", title: "Governed rule", body: "Second nitrogen top-dress at panicle initiation, with potash, applied in standing water. The rule carries its dose, its stage window and its priority.", detail: "RICE_NUTR_N_TOP2_001 · confidence 0.95" },
  { id: "evidence", step: "07", owner: "brain", title: "Evidence", body: "ICAR-IIRR and TNAU package-of-practice guidance on nitrogen splitting at panicle initiation.", detail: "source: ICAR-IIRR | TNAU PI nitrogen" },
  { id: "gate", step: "08", owner: "gate", title: "Safety and servability gate", body: "Dose stated: yes. Pre-harvest interval: not applicable to a fertiliser. Expert approved: yes. No safety block applies. The rule is farmer-servable.", detail: "expert_approved=true · is_safety_block=false · is_farmer_servable=true" },
  { id: "decision", step: "09", owner: "brain", title: "Decision", body: "Recommend the top-dress for this land, now, with the dose from the rule. If a photo contradicts the estimate, the photo wins.", detail: "action_type: recommend" },
  { id: "explanation", step: "10", owner: "language", title: "Explained in the farmer's language", body: "The language model turns the governed result into plain Marathi: what to apply, how much, when, and why the stage matters. It adds nothing the rule did not say.", detail: "narration only · no new numbers" },
];

export const CHAIN_OWNERS = {
  language: { label: "Language intelligence", note: "Understands and explains" },
  brain: { label: "Decision Brain", note: "Evaluates and decides" },
  gate: { label: "Safety gate", note: "Blocks what cannot be served" },
} as const;
