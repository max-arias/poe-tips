export function expandAcronyms(text: string, acronyms: Record<string, string>): string {
    const lowerText = text.toLowerCase();
    const tokens = lowerText.split(/\s+/);
    const expandedTokens = tokens.map(token => {
        // Check if token is an acronym
        if (acronyms[token]) {
            return `${token} ${acronyms[token]}`;
        }
        return token;
    });

    // Also check for full phrases in the text
    const injections: string[] = [];
    Object.entries(acronyms).forEach(([key, value]) => {
        const lowerValue = value.toLowerCase();
        if (lowerText.includes(lowerValue)) {
            injections.push(key);
        }
        if (lowerText.includes(key)) {
            injections.push(value);
        }
    });

    return [...new Set([...expandedTokens, ...injections])].join(" ");
}
