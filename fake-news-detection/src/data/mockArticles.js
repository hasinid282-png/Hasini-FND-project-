export const SAMPLE_ARTICLES = [
  {
    id: "art-1",
    title: "Scientists Discover Super-Earth 31 Light-Years Away With Potential Water Atmosphere",
    content: "An international consortium of astrophysicists utilizing the James Webb Space Telescope and ground-based spectrographs has confirmed the atmospheric signature of exoplanet Wolf 1069 b. The rocky world, orbiting within its red dwarf star's habitable zone, exhibits chemical atmospheric signatures consistent with dense nitrogen and water vapor compounds. Peer-reviewed findings were published in Astronomy & Astrophysics following eighteen months of observational triangulation across three independent observatories.",
    source: "astronomy-review.org",
    author: "Dr. Elena Rostova",
    category: "Science",
    date: "2025-02-14",
    verdict: "Authentic",
    credibilityScore: 96,
    flags: [],
    details: {
      factualityScore: 98,
      linguisticScore: 95,
      sourceReliability: 97,
      emotionalBalance: 94,
      clickbaitRatio: 4,
      biasIndex: "Neutral (0.05)"
    }
  },
  {
    id: "art-2",
    title: "SHOCKING TRUTH: Drinking Boiled Garlic Water Completely Cures Stage 4 Cancer Overnight!",
    content: "Big Pharma doesn't want you to know this simple secret! Doctors are SILENCED worldwide because drinking one glass of boiled organic garlic water with cayenne pepper eradicates 100% of malignant cells in just 24 hours. Billions of chemotherapy dollars will be wiped out once you share this with your loved ones immediately before this post is banned by authorities!",
    source: "secret-health-revealed.xyz",
    author: "Natural Healer 99",
    category: "Health",
    date: "2025-02-10",
    verdict: "Fake News",
    credibilityScore: 12,
    flags: [
      "Extravagant medical claims without peer-reviewed evidence",
      "Conspiracy theories ('Big Pharma doesn't want you to know')",
      "Excessive capitalization and emotional manipulation ('SHOCKING', 'SILENCED')",
      "Urgency trigger designed for viral social sharing ('Share before banned')"
    ],
    details: {
      factualityScore: 8,
      linguisticScore: 15,
      sourceReliability: 10,
      emotionalBalance: 12,
      clickbaitRatio: 96,
      biasIndex: "Extreme Sensationalism"
    }
  },
  {
    id: "art-3",
    title: "Central Bank Announces Staged Phase-Out of Paper Notes Starting Next Tuesday",
    content: "Urgent viral message circulating on messaging apps claims all physical paper cash will expire and become worthless next Tuesday at midnight. The message instructs all citizens to withdraw retirement savings and convert them immediately into unverified foreign digital crypto vouchers through a specified link.",
    source: "social-messenger-forward.net",
    author: "Anonymous Insider",
    category: "Finance",
    date: "2025-02-18",
    verdict: "Fake News",
    credibilityScore: 18,
    flags: [
      "Financial panic induction & phishing link referral",
      "Contradicts official Federal Reserve & Central Bank press releases",
      "Unattributed source ('Anonymous Insider')",
      "False artificial deadline ('next Tuesday at midnight')"
    ],
    details: {
      factualityScore: 10,
      linguisticScore: 25,
      sourceReliability: 15,
      emotionalBalance: 20,
      clickbaitRatio: 90,
      biasIndex: "Panic Inducing"
    }
  },
  {
    id: "art-4",
    title: "Federal Aviation Administration Updates Pilot Rest Time Guidelines For Long-Haul Cargo Flights",
    content: "The Federal Aviation Administration (FAA) has finalized revisions to Title 14 Code of Federal Regulations Part 117 regarding mandatory flight crew rest periods. Effective fourth quarter 2025, commercial cargo carriers must increase continuous off-duty rest cycles from 9 hours to 10 hours prior to ultra-long flights exceeding ten hours duration. Major pilot associations have expressed conditional support while freight logistics companies requested phased implementation.",
    source: "aviation-safety-gov.org",
    author: "Marcus Vance",
    category: "Government",
    date: "2025-02-01",
    verdict: "Authentic",
    credibilityScore: 94,
    flags: [],
    details: {
      factualityScore: 96,
      linguisticScore: 92,
      sourceReliability: 95,
      emotionalBalance: 93,
      clickbaitRatio: 5,
      biasIndex: "Objective / Neutral"
    }
  },
  {
    id: "art-5",
    title: "Leaked Document Shows AI Models Will Replace 90% of All Human Workers by September",
    content: "An unconfirmed memo purportedly from an elite tech summit claims that leading tech CEOs signed a confidential agreement to fire nine out of ten employees across all industries before the end of the year. While tech automation is indeed accelerating across customer support and entry-level programming, verified labor economists state that wholesale 90% displacement in six months is statistically and practically impossible.",
    source: "techinsider-rumors.blog",
    author: "FutureWatcher",
    category: "Technology",
    date: "2025-02-19",
    verdict: "Questionable",
    credibilityScore: 42,
    flags: [
      "Unverified leaked memo with no cryptographic proof or corporate confirmation",
      "Gross oversimplification of macroeconomic labor trends",
      "Hyperbolic timeline contradicted by verified employment datasets"
    ],
    details: {
      factualityScore: 35,
      linguisticScore: 48,
      sourceReliability: 38,
      emotionalBalance: 45,
      clickbaitRatio: 78,
      biasIndex: "Fear-Mongering"
    }
  }
];

export const MISINFORMATION_STATS = {
  totalAnalyzed: 14820,
  fakeCount: 6210,
  authenticCount: 5930,
  questionableCount: 2680,
  accuracyRate: "93.8%",
  averageAnalysisTime: "1.4s"
};

export const TRENDING_CATEGORIES = [
  { name: "Health & Medicine", fakeRate: 64, count: 4200, risk: "High" },
  { name: "Politics & Elections", fakeRate: 58, count: 5100, risk: "High" },
  { name: "Finance & Crypto", fakeRate: 52, count: 2800, risk: "Medium" },
  { name: "Science & Climate", fakeRate: 36, count: 1420, risk: "Medium" },
  { name: "Technology & AI", fakeRate: 41, count: 1300, risk: "Medium" }
];

export const LINGUISTIC_TACTICS = [
  { tactic: "Urgency / Fear Triggers", frequency: 78, impact: "High" },
  { tactic: "Conspiracy Phrasing", frequency: 69, impact: "Critical" },
  { tactic: "ALL-CAPS & Excessive Punctuation", frequency: 62, impact: "Moderate" },
  { tactic: "Fake Authority / Anonymous Insiders", frequency: 57, impact: "High" },
  { tactic: "Miracle / Magic Solution Claims", frequency: 49, impact: "Critical" }
];
