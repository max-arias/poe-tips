import { type Component, Show, createSignal, onCleanup } from 'solid-js';
import { Portal } from 'solid-js/web';

import type { Tip } from '../lib/search';

interface Props {
    tip: Tip;
    onTagClick?: (tag: string) => void;
}

const TipCard: Component<Props> = (props) => {
    const [expanded, setExpanded] = createSignal(false);

    const statusColors = {
        verified: 'bg-green-900/50 text-green-300 border-green-700',
        stale: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
        legacy: 'bg-gray-800 text-gray-500 border-gray-700',
        dead: 'bg-red-900/50 text-red-300 border-red-700',
    };

    const statusLabels = {
        verified: 'Verified',
        stale: 'Stale',
        legacy: 'Legacy',
        dead: 'Broken',
    };

    const status = props.tip.status || 'stale';

    // Prevent body scroll when modal is open
    const toggleBodyScroll = (disable: boolean) => {
        if (typeof document !== 'undefined') {
            document.body.style.overflow = disable ? 'hidden' : '';
        }
    };

    const handleExpand = () => {
        setExpanded(true);
        toggleBodyScroll(true);
    };

    const handleClose = (e?: Event) => {
        e?.stopPropagation();
        setExpanded(false);
        toggleBodyScroll(false);
    };

    onCleanup(() => {
        toggleBodyScroll(false);
    });

    return (
        <>
            <div class={`bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors shadow-sm relative overflow-hidden flex flex-col h-full`}>
                {/* Status Indicator Strip */}
                <div class={`absolute top-0 left-0 w-1 h-full ${statusColors[status].split(' ')[0].replace('/50', '')}`}></div>

                <div class="flex justify-between items-start mb-2 pl-2">
                    <button
                        onClick={handleExpand}
                        class="text-lg font-bold text-orange-400 leading-tight text-left hover:text-orange-300 transition-colors"
                    >
                        {props.tip.title}
                    </button>
                    <span class={`text-xs px-2 py-1 rounded border ${statusColors[status]} ml-2 whitespace-nowrap`}>
                        {statusLabels[status]}
                    </span>
                </div>

                <p class="text-gray-300 mb-4 text-sm leading-relaxed pl-2 flex-grow">
                    {props.tip.description || (props.tip.content.length > 140 ? props.tip.content.substring(0, 140) + '...' : props.tip.content)}
                </p>

                <div class="pl-2 mt-auto">
                    <Show when={props.tip.leagues.length > 0}>
                        <div class="flex flex-wrap gap-2 mb-2">
                            {props.tip.leagues.map((l) => (
                                <span class="text-xs bg-blue-900/30 text-blue-300 px-2 py-0.5 rounded border border-blue-800">
                                    {l}
                                </span>
                            ))}
                        </div>
                    </Show>

                    <div class="flex flex-wrap gap-2 mb-3">
                        {props.tip.tags.map((tag) => (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    props.onTagClick?.(tag);
                                }}
                                class="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full hover:bg-gray-600 transition-colors"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>

                    <div class="flex justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-2 mt-2">
                        <span>By {props.tip.author}</span>
                        <div class="flex items-center gap-1">
                            <span>▲ {props.tip.vote_count}</span>
                        </div>
                    </div>
                </div>
            </div>

            <Show when={expanded()}>
                <Portal>
                    <div class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop */}
                        <div
                            class="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
                            onClick={handleClose}
                        ></div>

                        {/* Modal Content */}
                        <div class="relative bg-gray-900 border border-gray-700 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                            {/* Header */}
                            <div class="flex justify-between items-start p-6 border-b border-gray-800 bg-gray-900/50">
                                <div>
                                    <h2 class="text-2xl font-bold text-orange-400 mb-2">{props.tip.title}</h2>
                                    <div class="flex flex-wrap gap-2 items-center">
                                        <span class={`text-xs px-2 py-1 rounded border ${statusColors[status]}`}>
                                            {statusLabels[status]}
                                        </span>
                                        <span class="text-gray-500 text-sm">by {props.tip.author}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    class="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div class="p-6 overflow-y-auto custom-scrollbar">
                                <div class="prose prose-invert prose-orange max-w-none">
                                    {/* Render HTML content safely */}
                                    <div innerHTML={props.tip.content} />
                                </div>

                                <div class="mt-8 pt-6 border-t border-gray-800">
                                    <h4 class="text-sm font-semibold text-gray-400 mb-3">Tags & Leagues</h4>
                                    <div class="flex flex-wrap gap-2">
                                        <Show when={props.tip.leagues.length > 0}>
                                            {props.tip.leagues.map((l) => (
                                                <span class="text-xs bg-blue-900/30 text-blue-300 px-2 py-1 rounded border border-blue-800">
                                                    {l}
                                                </span>
                                            ))}
                                        </Show>
                                        {props.tip.tags.map((tag) => (
                                            <button
                                                onClick={() => {
                                                    handleClose();
                                                    props.onTagClick?.(tag);
                                                }}
                                                class="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded-full hover:bg-gray-600 transition-colors"
                                            >
                                                #{tag}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Portal>
            </Show>
        </>
    );
};

export default TipCard;
