<script setup lang="ts">
const props = defineProps<{
  tip: any
}>()



const statusColor = computed(() => {
  switch (props.tip.status) {
    case 'verified': return 'success'
    case 'legacy': return 'warning'
    case 'dead': return 'error'
    default: return 'neutral'
  }
})
</script>

<template>
  <div class="group border border-stone-800 bg-stone-900/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-primary-500/50 hover:shadow-[0_0_15px_rgba(var(--color-primary-500),0.1)] hover:bg-stone-900/80 mb-8">
    <div class="p-6">
      <div class="flex flex-col gap-4">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-3 flex-wrap mb-2">
              <h3 class="font-serif font-bold text-2xl text-primary-100">{{ tip.title }}</h3>
              <UBadge :color="statusColor" variant="subtle" size="xs" class="flex-shrink-0 font-mono tracking-wider uppercase text-[10px]">{{ tip.status }}</UBadge>
            </div>
          </div>
          
          <div class="hidden md:flex gap-1 flex-shrink-0">
             <UBadge v-for="tag in tip.tags" :key="tag" color="neutral" variant="outline" size="xs" class="bg-stone-950/50 border-stone-800 text-stone-400">
              {{ tag }}
            </UBadge>
          </div>
        </div>

        <div class="prose prose-invert max-w-none prose-p:text-stone-300 prose-headings:font-serif prose-headings:text-primary-100 prose-a:text-primary-400 hover:prose-a:text-primary-300 prose-strong:text-primary-200">
          <p class="lead text-primary-200/80 not-prose mb-6 border-l-2 border-primary-500/50 pl-4 italic font-serif text-lg">
            {{ tip.description }}
          </p>
          <ContentRenderer :value="tip" />
        </div>
        
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-stone-800/50 mt-4">
          <div class="flex md:hidden flex-wrap gap-2">
             <UBadge v-for="tag in tip.tags" :key="tag" color="neutral" variant="outline" class="bg-stone-950/30 border-stone-800 hover:border-primary-500/30 transition-colors cursor-default">
              {{ tag }}
            </UBadge>
          </div>
          <div class="text-xs text-stone-600 font-mono flex items-center gap-2 ml-auto">
            <UIcon name="i-heroicons-user" class="w-3 h-3" /> {{ tip.author }} 
            <span class="text-stone-800">|</span>
            <UIcon name="i-heroicons-tag" class="w-3 h-3" /> Patch {{ tip.last_verified_patch }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
