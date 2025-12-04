<script setup lang="ts">
defineProps<{
  tool: {
    name: string
    tooltip: string
    url: string
    icon?: string
    style?: string
  }
}>()
</script>

<template>
  <UCard
    class="h-full hover:ring-2 hover:ring-primary-500/50 transition-all duration-200 group bg-stone-900/50 border-stone-800"
  >
    <a :href="tool.url" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 h-full">
      <div v-if="tool.icon" class="flex-shrink-0">
        <!-- We might need to handle external images or local assets differently. 
             For now, assuming the icon name refers to a file that might not exist yet, 
             so we'll use a placeholder or generic icon if it fails, or just the name for now.
             Since we don't have the icons yet, I'll use a generic icon. -->
        <UIcon name="i-heroicons-wrench-screwdriver" class="w-8 h-8 text-primary-400 group-hover:text-primary-300 transition-colors" />
      </div>
      <div class="flex-1 min-w-0">
        <h3 class="font-bold text-stone-200 group-hover:text-primary-400 transition-colors truncate">
          {{ tool.name }}
        </h3>
        <p v-if="tool.tooltip" class="text-xs text-stone-500 line-clamp-2 mt-0.5">
          {{ tool.tooltip }}
        </p>
      </div>
      <UIcon name="i-heroicons-arrow-top-right-on-square" class="w-4 h-4 text-stone-600 group-hover:text-primary-500 transition-colors" />
    </a>
  </UCard>
</template>
