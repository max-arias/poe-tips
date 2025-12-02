import type { Component } from 'solid-js';
import type { Tip } from '../lib/search';

interface Props {
    tip: Tip;
}

const TipCard: Component<Props> = (props) => {
    return (
        <div class="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-500 transition-colors shadow-sm">
            <div class="flex justify-between items-start mb-2">
                <h3 class="text-lg font-bold text-orange-400">{props.tip.title}</h3>
                <span class="text-xs text-gray-500 bg-gray-900 px-2 py-1 rounded">v{props.tip.patch_created}</span>
            </div>

            <p class="text-gray-300 mb-4 text-sm leading-relaxed">{props.tip.content}</p>

            <div class="flex flex-wrap gap-2 mb-3">
                {props.tip.tags.map((tag) => (
                    <span class="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded-full">
                        #{tag}
                    </span>
                ))}
            </div>

            <div class="flex justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-2 mt-2">
                <span>By {props.tip.author}</span>
                <div class="flex items-center gap-1">
                    <span>▲ {props.tip.vote_count}</span>
                </div>
            </div>
        </div>
    );
};

export default TipCard;
