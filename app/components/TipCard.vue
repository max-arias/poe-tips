<script setup lang="ts">
const props = defineProps<{
  tip: any
}>()

const isOpen = ref(false)

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
  <div class="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-900 transition-all hover:border-primary-500/50">
    <div 
      class="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
      @click="isOpen = !isOpen"
    >
      <div class="flex items-center gap-3 flex-1 min-w-0">
        <UIcon 
          :name="isOpen ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'" 
          class="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200" 
        />
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 flex-wrap">
            <h3 class="font-bold text-lg truncate">{{ tip.title }}</h3>
            <UBadge :color="statusColor" variant="subtle" size="xs" class="flex-shrink-0">{{ tip.status }}</UBadge>
          </div>
          <p v-if="!isOpen" class="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
            {{ tip.description }}
          </p>
        </div>
      </div>
      
      <div class="hidden md:flex gap-1 ml-4 flex-shrink-0">
         <UBadge v-for="tag in tip.tags.slice(0, 3)" :key="tag" color="neutral" variant="soft" size="xs">
          {{ tag }}
        </UBadge>
        <span v-if="tip.tags.length > 3" class="text-xs text-gray-400 flex items-center px-1">+{{ tip.tags.length - 3 }}</span>
      </div>
    </div>

    <div v-if="isOpen" class="border-t border-gray-200 dark:border-gray-800 p-6 bg-gray-50/30 dark:bg-gray-900/30">
      <div class="prose dark:prose-invert max-w-none mb-6">
        <p class="lead text-gray-600 dark:text-gray-300 not-prose mb-6 border-l-4 border-primary-500 pl-4 italic">
          {{ tip.description }}
        </p>
        <ContentRenderer :value="tip" />
      </div>
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div class="flex flex-wrap gap-2">
           <UBadge v-for="tag in tip.tags" :key="tag" color="neutral" variant="soft">
            {{ tag }}
          </UBadge>
        </div>
        <div class="text-xs text-gray-400 font-mono">
          By {{ tip.author }} • Patch {{ tip.last_verified_patch }}
        </div>
      </div>
    </div>
  </div>
</template>
