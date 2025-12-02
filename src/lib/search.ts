import Fuse from 'fuse.js';
import { expandAcronyms } from './acronyms';

export interface Tip {
    id: string;
    title: string;
    description: string;
    content: string;
    tags: string[];
    leagues: string[];
    author: string;
    vote_count: number;
    patch_created: string;
    last_verified_patch: string;
    is_broken: boolean;
    _search_tokens?: string; // Hidden field for search
    status?: 'verified' | 'stale' | 'legacy' | 'dead';
}

export function prepareTipsForSearch(tips: Tip[]): Tip[] {
    return tips.map(tip => {
        const combinedText = `${tip.title} ${tip.content} ${tip.tags.join(' ')}`;
        const searchTokens = expandAcronyms(combinedText);
        return {
            ...tip,
            _search_tokens: searchTokens
        };
    });
}

export function createFuseInstance(tips: Tip[]) {
    const preparedTips = prepareTipsForSearch(tips);

    return new Fuse(preparedTips, {
        keys: [
            { name: 'title', weight: 0.7 },
            { name: 'tags', weight: 0.5 },
            { name: 'content', weight: 0.3 },
            { name: '_search_tokens', weight: 0.8 } // High weight for injected tokens
        ],
        threshold: 0.3, // Fuzzy threshold
        ignoreLocation: true,
    });
}
