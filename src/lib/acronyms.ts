export const acronyms: Record<string, string> = {
    "rf": "righteous fire",
    "coc": "cast on crit",
    "cwdt": "cast when damage taken",
    "dd": "detonate dead",
    "ea": "explosive arrow",
    "ek": "ethereal knives",
    "ts": "tornado shot",
    "la": "lightning arrow",
    "kb": "kinetic blast",
    "ci": "chaos inoculation",
    "ll": "low life",
    "mom": "mind over matter",
    "eb": "eldritch battery",
    "ee": "elemental equilibrium",
    "eo": "elemental overload",
    "rt": "resolute technique",
    "gmp": "greater multiple projectiles",
    "lmp": "lesser multiple projectiles",
    "wed": "weapon elemental damage",
    "ed": "essence drain",
    "tr": "toxic rain",
    "ca": "caustic arrow",
    "pc": "poisonous concoction",
    "ls": "lightning strike",
    "fb": "frost blades",
    "ms": "molten strike",
    "bf": "blade flurry",
    "bb": "blade blast",
    "bv": "blade vortex",
    "gc": "glacial cascade",
    "fp": "freezing pulse",
    "ice spear": "is",
    "spark": "spark",
};

export function expandAcronyms(text: string): string {
    const lowerText = text.toLowerCase();
    const tokens = lowerText.split(/\s+/);
    const expandedTokens = tokens.map(token => {
        // Check if token is an acronym
        if (acronyms[token]) {
            return `${token} ${acronyms[token]}`;
        }
        // Check if token is the full name (reverse lookup - simple version)
        // For now, we just inject the acronym if the full name is found? 
        // The requirement says: "If a tip contains 'Righteous Fire', we inject 'RF'"
        // This is a bit more complex for multi-word full names.
        // We will handle the simple 1-to-1 injection here for search tokens.
        return token;
    });

    // Also check for full phrases in the text
    const injections: string[] = [];
    Object.entries(acronyms).forEach(([key, value]) => {
        if (lowerText.includes(value)) {
            injections.push(key);
        }
        if (lowerText.includes(key)) {
            injections.push(value);
        }
    });

    return [...new Set([...expandedTokens, ...injections])].join(" ");
}
