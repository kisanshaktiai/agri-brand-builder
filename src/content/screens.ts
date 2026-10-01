/**
 * Product screen manifest. Every image is a real capture made with
 * scripts/capture-screens.mjs from the product repositories; nothing is
 * drawn by hand. `captured: false` renders an explicit "capture pending"
 * tile, never a mock.
 */
export type Surface = "farmer-app" | "tenant-portal" | "admin-portal";

export interface Screen {
  id: string;
  surface: Surface;
  /** The one question the screen answers. */
  question: string;
  title: string;
  alt: string;
  /** Path under /public/screens */
  file: string;
  captured: boolean;
  /** Natural size of the capture, for layout stability. */
  width: number;
  height: number;
}

const PHONE = { width: 390, height: 844 } as const;
const DESKTOP = { width: 1440, height: 900 } as const;

export const SCREENS: Screen[] = [
  { id: "chat-marathi", surface: "farmer-app", question: "Can I ask in my own language?", title: "AI chat in Marathi", alt: "Farmer App AI chat screen with a conversation in Marathi", file: "farmer/chat-marathi.webp", captured: false, ...PHONE },
  { id: "voice", surface: "farmer-app", question: "Can I just speak?", title: "Voice assistant", alt: "Farmer App voice assistant listening screen", file: "farmer/voice.webp", captured: false, ...PHONE },
  { id: "farm-today", surface: "farmer-app", question: "What should I do today?", title: "Farm Today", alt: "Farmer App Farm Today screen listing due, watch, blocked and info decisions", file: "farmer/farm-today.webp", captured: false, ...PHONE },
  { id: "schedule", surface: "farmer-app", question: "What stage is my crop in?", title: "Crop schedule", alt: "Farmer App crop schedule showing stages and tasks", file: "farmer/schedule.webp", captured: false, ...PHONE },
  { id: "analytics", surface: "farmer-app", question: "How is my farm doing financially?", title: "Farm Analytics", alt: "Farmer App Farm Analytics screen with the financial section and projection notice", file: "farmer/analytics-financial.webp", captured: false, ...PHONE },
  { id: "weather", surface: "farmer-app", question: "What will the weather do to my field?", title: "Weather", alt: "Farmer App weather screen with hourly forecast for a land", file: "farmer/weather.webp", captured: false, ...PHONE },
  { id: "ndvi", surface: "farmer-app", question: "How healthy does my field look from above?", title: "Satellite NDVI", alt: "Farmer App satellite NDVI map with land health score", file: "farmer/ndvi.webp", captured: false, ...PHONE },
  { id: "market", surface: "farmer-app", question: "Where and when should I sell?", title: "Market prices", alt: "Farmer App market prices screen with mandi comparison", file: "farmer/market.webp", captured: false, ...PHONE },
  { id: "community", surface: "farmer-app", question: "What are farmers near me seeing?", title: "Community", alt: "Farmer App community feed with local-language posts", file: "farmer/community.webp", captured: false, ...PHONE },
  { id: "reels", surface: "farmer-app", question: "Can I learn by watching?", title: "Videos", alt: "Farmer App short education reels", file: "farmer/reels.webp", captured: false, ...PHONE },
  { id: "land", surface: "farmer-app", question: "Where exactly is my land?", title: "Land boundary", alt: "Farmer App land boundary mapping with automatic area", file: "farmer/land-boundary.webp", captured: false, ...PHONE },
  { id: "alerts", surface: "farmer-app", question: "What should I watch for?", title: "Proactive alerts", alt: "Farmer App proactive alerts screen", file: "farmer/alerts.webp", captured: false, ...PHONE },
  { id: "growth", surface: "farmer-app", question: "Is my crop on track?", title: "Growth tracking", alt: "Farmer App crop growth tracking screen", file: "farmer/growth.webp", captured: false, ...PHONE },
  { id: "evidence", surface: "farmer-app", question: "Why did the system recommend this?", title: "Decision explanation", alt: "Farmer App explanation of a recommendation with its evidence", file: "farmer/evidence.webp", captured: false, ...PHONE },
  { id: "login", surface: "farmer-app", question: "How do I sign in?", title: "Mobile number and PIN", alt: "Farmer App sign-in screen with mobile number entry", file: "farmer/login.webp", captured: false, ...PHONE },
  { id: "tenant-dashboard", surface: "tenant-portal", question: "How do I run my farmer network?", title: "Tenant dashboard", alt: "Tenant SaaS Portal dashboard", file: "tenant/dashboard.webp", captured: false, ...DESKTOP },
  { id: "tenant-farmers", surface: "tenant-portal", question: "Who are my farmers and what are they doing?", title: "Farmer management", alt: "Tenant SaaS Portal farmer management list", file: "tenant/farmers.webp", captured: false, ...DESKTOP },
  { id: "tenant-branding", surface: "tenant-portal", question: "How does it carry my brand?", title: "Tenant branding", alt: "Tenant SaaS Portal white-label branding settings", file: "tenant/branding.webp", captured: false, ...DESKTOP },
  { id: "tenant-login", surface: "tenant-portal", question: "How do organisations sign in?", title: "Tenant sign-in", alt: "Tenant SaaS Portal sign-in page", file: "tenant/login.webp", captured: false, ...DESKTOP },
  { id: "admin-rules", surface: "admin-portal", question: "How is the platform governed?", title: "Decision rules", alt: "SaaS Admin Portal governance view of decision rules", file: "admin/rules.webp", captured: false, ...DESKTOP },
  { id: "admin-knowledge", surface: "admin-portal", question: "Where does the knowledge come from?", title: "Knowledge sources", alt: "SaaS Admin Portal knowledge sources with document ingestion", file: "admin/knowledge.webp", captured: false, ...DESKTOP },
  { id: "admin-tenants", surface: "admin-portal", question: "Who runs on the platform?", title: "Tenant management", alt: "SaaS Admin Portal tenant management", file: "admin/tenants.webp", captured: false, ...DESKTOP },
  { id: "admin-login", surface: "admin-portal", question: "Who can administer the platform?", title: "Admin sign-in", alt: "SaaS Admin Portal sign-in page", file: "admin/login.webp", captured: false, ...DESKTOP },
];

export const screenById = (id: string): Screen => {
  const s = SCREENS.find((x) => x.id === id);
  if (!s) throw new Error(`Unknown screen ${id}`);
  return s;
};
