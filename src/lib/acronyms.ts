export const acronyms: Record<string, string> = {
    "rf": "Righteous Fire",
    "coc": "Cast on Crit",
    "cws": "Cast when Stunned",
    "cwdt": "Cast when Damage Taken",
    "dd": "Detonate Dead",
    "ea": "Explosive Arrow",
    "ek": "Ethereal Knives",
    "ts": "Tornado Shot",
    "la": "Lightning Arrow",
    "kb": "Kinetic Blast",
    "ps": "Power Siphon",
    "pc": "Poisonous Concoction",
    "tr": "Toxic Rain",
    "ca": "Caustic Arrow",
    "srs": "Summon Raging Spirit",
    "abs": "Absolution",
    "dom blow": "Dominating Blow",
    "hoag": "Herald of Agony",
    "hop": "Herald of Purity",
    "bv": "Blade Vortex",
    "bf": "Blade Flurry",
    "bb": "Blade Blast",
    "gc": "Glacial Cascade",
    "fp": "Freezing Pulse",
    "ice spear": "Ice Spear",
    "spark": "Spark",
    "arc": "Arc",
    "bl": "Ball Lightning",
    "storm brand": "Storm Brand",
    "penance brand": "Penance Brand",
    "wintertide brand": "Wintertide Brand",
    "arma brand": "Armageddon Brand",
    "vd": "Volatile Dead",
    "bodyswap": "Bodyswap",
    "pob": "Path of Building",
    "hh": "Headhunter",
    "mb": "Mageblood",
    "sq": "Squire",
    "ff": "Forbidden Flesh / Flame",
    "uv": "Uber Venarius",
    "ue": "Uber Elder",
    "se": "Searing Exarch",
    "eow": "Eater of Worlds",
    "maven": "The Maven",
    "sirus": "Sirus, Awakener of Worlds",
    "oshabi": "Oshabi, Avatar of the Grove",
    "catarina": "Catarina, Master of Undeath",
    "trialmaster": "The Trialmaster",
    "atziri": "Atziri, Queen of the Vaal",
    "uber atziri": "Atziri, Queen of the Vaal (Uber)",
    "shaper": "The Shaper",
    "elder": "The Elder",
    "cortex": "Cortex",
    "chayula": "Chayula, Who Dreamt",
    "uul-netol": "Uul-Netol, Unburdened Flesh",
    "esh": "Esh, Forked Thought",
    "tul": "Tul, Creeping Avalanche",
    "xoph": "Xoph, Dark Embers",
    "lycia": "Lycia, Herald of the Scourge",
    "beidat": "Beidat, Archangel of Death",
    "kosis": "Kosis, The Revelation",
    "omniphobia": "Omniphobia, Fear Manifest",
    "kalandra": "Kalandra",
    "alva": "Alva Valai",
    "jun": "Jun Ortoi",
    "einhar": "Einhar Frey",
    "niko": "Niko the Mad",
    "kirac": "Commander Kirac",
    "zana": "Zana, Master Cartographer",
    "tane": "Tane Octavius",
    "cassia": "Sister Cassia",
    "blight": "Blight",
    "delirium": "Delirium",
    "metamorph": "Metamorph",
    "harvest": "Harvest",
    "heist": "Heist",
    "expedition": "Expedition",
    "ritual": "Ritual",
    "ultimatum": "Ultimatum",
    "scourge": "Scourge",
    "sentinel": "Sentinel",
    "sanctum": "Sanctum",
    "crucible": "Crucible",
    "ancestor": "Trial of the Ancestors",
    "affliction": "Affliction",
    "necropolis": "Necropolis",
    "settlers": "Settlers of Kalguur",
    "ci": "Chaos Inoculation",
    "ll": "Low Life",
    "mom": "Mind Over Matter",
    "eb": "Eldritch Battery",
    "ee": "Elemental Equilibrium",
    "eo": "Elemental Overload",
    "rt": "Resolute Technique",
    "gmp": "Greater Multiple Projectiles",
    "lmp": "Lesser Multiple Projectiles",
    "wed": "Weapon Elemental Damage",
    "ed": "Essence Drain",
    "ls": "Lightning Strike",
    "ms": "Molten Strike"
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
