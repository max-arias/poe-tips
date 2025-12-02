import { createSignal, createMemo, onMount, type Component, For, Show } from 'solid-js';
import type { Tip } from '../lib/search';
import { createFuseInstance } from '../lib/search';
import TipCard from './TipCard';

interface Props {
    initialTips: Tip[];
}

const TipsGrid: Component<Props> = (props) => {
    const [query, setQuery] = createSignal('');
    const [fuse, setFuse] = createSignal<any>(null);

    onMount(() => {
        // Initialize Fuse on the client side
        setFuse(createFuseInstance(props.initialTips));
    });

    const results = createMemo(() => {
        const q = query();
        const f = fuse();

        if (!q || q.trim() === '') {
            return props.initialTips;
        }

        if (f) {
            return f.search(q).map((r: any) => r.item);
        }

        return props.initialTips;
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

                <div class="mt-2 text-sm text-gray-500 flex justify-between">
                    <Show when={query().length > 0} fallback={<span>Showing all tips</span>}>
                        <span>Found {results().length} tips</span>
                    </Show>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <For each={results()}>
                    {(tip) => <TipCard tip={tip} />}
                </For>
            </div>
        </>
    );
};

export default TipsGrid;
