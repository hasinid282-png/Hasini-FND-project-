// Fake News & Misinformation Detection Algorithm (Linguistic, Sentiment & Source Heuristics)

const SENSATIONAL_WORDS = [
  'shocking', 'miracle', 'secret', 'silenced', 'they don\'t want you to know',
  'banned', 'eradicate', 'eradicates', 'cures', 'cure', 'big pharma', 'conspiracy',
  'unbelievable', 'mind-blowing', 'won\'t believe', 'act now', 'urgent', 'must watch',
  'guaranteed', '100% cure', 'magic', 'instant', 'secret loophole', 'hidden truth',
  'wake up', 'sheeple', 'deep state', 'illuminati', 'hoax', 'cover up', 'covered up'
];

const FEAR_URGENCY_WORDS = [
  'apocalypse', 'catastrophe', 'disaster', 'terrifying', 'destroyed', 'annihilated',
  'panic', 'warning', 'danger', 'deadly', 'fatal', 'collapse', 'end of the world',
  'flee', 'bank run', 'worthless overnight', 'crisis'
];

const VAGUE_ATTRIBUTION = [
  'anonymous source', 'insiders claim', 'leaked memo', 'some experts say',
  'people are saying', 'rumor has it', 'a friend told me', 'secret report',
  'unnamed official', 'forwarded as received', 'according to telegram'
];

const RELIABLE_DOMAINS = [
  '.gov', '.edu', 'reuters.com', 'apnews.com', 'bbc.com', 'nature.com',
  'science.org', 'nasa.gov', 'who.int', 'nih.gov', 'bloomberg.com',
  'economist.com', 'wsj.com', 'npr.org', 'pbs.org'
];

const SUSPICIOUS_TLDS = [
  '.xyz', '.top', '.buzz', '.info', '.click', '.tk', '.ml', '.ga', '.cf', '.gq'
];

export function analyzeNewsText({ title = '', content = '', source = '', author = '' }) {
  const fullText = `${title} ${content}`.trim();
  const lowerText = fullText.toLowerCase();
  
  if (!fullText || fullText.length < 15) {
    return null;
  }

  const flags = [];
  let penaltyPoints = 0;

  // 1. Sensationalism & Clickbait Detection
  const foundSensational = SENSATIONAL_WORDS.filter(w => lowerText.includes(w));
  if (foundSensational.length > 0) {
    const penalty = Math.min(35, foundSensational.length * 10);
    penaltyPoints += penalty;
    flags.push({
      type: 'sensationalism',
      severity: foundSensational.length > 2 ? 'high' : 'medium',
      title: 'High Sensationalism & Clickbait Triggers',
      description: `Detected exaggerated marketing/conspiracy phrases: "${foundSensational.slice(0, 4).join('", "')}".`
    });
  }

  // 2. Fear and Urgency Inducers
  const foundFear = FEAR_URGENCY_WORDS.filter(w => lowerText.includes(w));
  if (foundFear.length > 0) {
    const penalty = Math.min(25, foundFear.length * 8);
    penaltyPoints += penalty;
    flags.push({
      type: 'fear_urgency',
      severity: foundFear.length > 1 ? 'high' : 'medium',
      title: 'Emotional Fear & Urgency Triggers',
      description: `Language engineered to stimulate anxiety: "${foundFear.slice(0, 3).join('", "')}".`
    });
  }

  // 3. Vague Attributions / Missing Source Citations
  const foundVague = VAGUE_ATTRIBUTION.filter(w => lowerText.includes(w));
  if (foundVague.length > 0) {
    penaltyPoints += 15;
    flags.push({
      type: 'attribution',
      severity: 'medium',
      title: 'Dubious Attribution / Unverified Sources',
      description: `Claims rely on unspecified citations: "${foundVague.join('", "')}".`
    });
  }

  // 4. Excessive Capitalization (ALL CAPS SHOUTING)
  const words = fullText.split(/\s+/).filter(w => w.length > 2);
  const uppercaseWords = words.filter(w => w === w.toUpperCase() && /[A-Z]/.test(w));
  const uppercaseRatio = words.length > 0 ? (uppercaseWords.length / words.length) : 0;
  if (uppercaseRatio > 0.12 && uppercaseWords.length >= 3) {
    penaltyPoints += 15;
    flags.push({
      type: 'typography',
      severity: 'medium',
      title: 'Aggressive Capitalization (Shouting)',
      description: `${Math.round(uppercaseRatio * 100)}% of words are uppercase: "${uppercaseWords.slice(0, 5).join(' ')}".`
    });
  }

  // 5. Excessive Exclamations & Question Marks
  const exclamationCount = (fullText.match(/!{2,}|\?{2,}|!\?/g) || []).length;
  if (exclamationCount > 0 || (fullText.match(/!/g) || []).length >= 4) {
    penaltyPoints += 10;
    flags.push({
      type: 'punctuation',
      severity: 'low',
      title: 'Punctuation Abuse',
      description: 'Multiple exclamation points or interrobangs detected indicating non-objective reporting.'
    });
  }

  // 6. Source Domain Analysis
  let sourceReliability = 70;
  if (source) {
    const cleanSource = source.toLowerCase().trim();
    if (RELIABLE_DOMAINS.some(domain => cleanSource.includes(domain))) {
      sourceReliability = 95;
      penaltyPoints = Math.max(0, penaltyPoints - 15);
    } else if (SUSPICIOUS_TLDS.some(tld => cleanSource.endsWith(tld))) {
      sourceReliability = 20;
      penaltyPoints += 25;
      flags.push({
        type: 'domain',
        severity: 'high',
        title: 'Unverified / High-Risk Domain TLD',
        description: `Source "${source}" uses a low-reputation top-level domain frequently associated with disposable spam sites.`
      });
    } else {
      sourceReliability = 55;
    }
  }

  // 7. Calculate Metric Scores
  const rawCredibility = Math.max(5, Math.min(99, 100 - penaltyPoints));
  
  // Specific sub-scores
  const factualityScore = Math.max(10, Math.min(98, Math.round(rawCredibility * 0.95 + (sourceReliability * 0.05))));
  const linguisticScore = Math.max(10, Math.min(98, 100 - (foundSensational.length * 14 + (uppercaseRatio > 0.1 ? 20 : 0))));
  const emotionalBalance = Math.max(10, Math.min(98, 100 - (foundFear.length * 15 + (exclamationCount * 10))));
  const clickbaitRatio = Math.max(2, Math.min(98, Math.round(100 - linguisticScore)));

  // Final Verdict Categorization
  let verdict = 'Authentic';
  let verdictColor = 'text-emerald-400';
  let badgeBg = 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300';
  let summary = 'This content adheres to standard factual reporting guidelines with measured phrasing, neutral tone, and absence of manipulative markers.';

  if (rawCredibility < 30) {
    verdict = 'Fake News / High Risk';
    verdictColor = 'text-rose-400';
    badgeBg = 'bg-rose-500/10 border-rose-500/30 text-rose-300';
    summary = 'Strong indicators of false information or intentional disinformation. The text exhibits severe clickbait markers, conspiratorial language, and lacks verified attribution.';
  } else if (rawCredibility < 55) {
    verdict = 'Likely False / Misleading';
    verdictColor = 'text-orange-400';
    badgeBg = 'bg-orange-500/10 border-orange-500/30 text-orange-300';
    summary = 'Elevated levels of sensationalism and unsubstantiated claims. Readers should independently verify key assertions with established news agencies.';
  } else if (rawCredibility < 75) {
    verdict = 'Questionable / Mixed';
    verdictColor = 'text-amber-400';
    badgeBg = 'bg-amber-500/10 border-amber-500/30 text-amber-300';
    summary = 'Contains a mixture of factual basis and opinionated or exaggerated assertions. Exercise caution regarding uncorroborated details.';
  } else if (rawCredibility < 85) {
    verdict = 'Mostly Factual';
    verdictColor = 'text-teal-400';
    badgeBg = 'bg-teal-500/10 border-teal-500/30 text-teal-300';
    summary = 'Generally credible content with minor subjective phrasing or informal tone. Core information appears reasonably sound.';
  }

  return {
    id: 'scan-' + Date.now(),
    title: title || (fullText.slice(0, 70) + '...'),
    content,
    source: source || 'Unspecified',
    author: author || 'Unknown',
    timestamp: new Date().toISOString(),
    credibilityScore: rawCredibility,
    verdict,
    verdictColor,
    badgeBg,
    summary,
    flags,
    details: {
      factualityScore,
      linguisticScore,
      sourceReliability,
      emotionalBalance,
      clickbaitRatio,
      wordCount: words.length
    }
  };
}
