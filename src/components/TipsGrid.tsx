import { createSignal, createMemo, onMount, type Component, For, Show } from 'solid-js';
import type { Tip } from '../lib/search';
import { createFuseInstance } from '../lib/search';
import TipCard from './TipCard';

interface Props {
    initialTips: Tip[];
    acronyms: Record<string, string>;
}

const TipsGrid: Component<Props> = (props) => {
    const [query, setQuery] = createSignal('');
    const [selectedTag, setSelectedTag] = createSignal<string | null>(null);
    const [fuse, setFuse] = createSignal<any>(null);

    onMount(() => {
        // Initialize Fuse on the client side
        setFuse(createFuseInstance(props.initialTips, props.acronyms));
    });

    const results = createMemo(() => {
        const q = query();
        const tag = selectedTag();
        const f = fuse();

        let filtered = props.initialTips;

        // 1. Filter by Tag first (if selected)
        if (tag) {
            filtered = filtered.filter(tip => tip.tags.includes(tag));
        }

        // 2. Filter by Search Query
        if (!q || q.trim() === '') {
            return filtered;
        }

        if (f) {
            // If we have a tag filter, we might want to search ONLY within that subset.
            // However, Fuse indexes the whole set. 
            // A simple approach: Search global, then intersect with tag filter.
            // OR: Re-instantiate fuse? No, too expensive.
            // Better: Search global, then filter results by tag.
            const searchResults = f.search(q).map((r: any) => r.item);
            if (tag) {
                return searchResults.filter((tip: Tip) => tip.tags.includes(tag));
            }
            return searchResults;
        }

        return filtered;
    });

    return (
        <>
            <div class="mb-8">
                <div class="relative">
                    <input
                        type="text"
                        value={query()}
                        onInput={(e) => setQuery(e.currentTarget.value)}
                        placeholder="Search tips (e.g., 'RF', 'Crafting')..."
                        class="w-full bg-gray-900 border border-gray-700 text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 shadow-inner"
                    />
                    <div class="absolute right-3 top-3 text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                <div class="mt-4 flex items-center justify-between">
                    <div class="text-sm text-gray-500">
                        <Show when={query().length > 0 || selectedTag()} fallback={<span>Showing all tips</span>}>
                            <span>Found {results().length} tips</span>
                        </Show>
                    </div>

                    <Show when={selectedTag()}>
                        <button
                            onClick={() => setSelectedTag(null)}
                            class="text-xs flex items-center gap-1 bg-orange-900/30 text-orange-300 px-3 py-1 rounded-full border border-orange-800 hover:bg-orange-900/50 transition-colors"
                        >
                            <span>Filter: #{selectedTag()}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </Show>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={results()}>
                    {(tip) => (
                        <TipCard
                            tip={tip}
                            onTagClick={(tag) => setSelectedTag(tag)}
                        />
                    )}
                </For>
            </div>
        </>
    );
};

export default TipsGrid;
