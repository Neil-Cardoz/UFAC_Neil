export const SITE_NAME = "UFAC";
export const SITE_DESCRIPTION =
  "Unified Farmer Assistance Checker — AI-powered PM-KISAN eligibility assessment";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Check Eligibility", href: "/check" },
  { label: "About", href: "/about" },
] as const;

export const AGENT_NAMES = [
  "Eligibility Agent",
  "Document Agent",
  "Income Agent",
  "Land Agent",
  "Compliance Agent",
] as const;
