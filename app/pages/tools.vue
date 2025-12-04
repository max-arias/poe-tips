<script setup lang="ts">
const { data: tools } = await useAsyncData('tools', () => queryCollection('tools').first())

const groupedTools = computed(() => {
  if (!tools.value) return {}
  
  // Based on server logs, the data is in tools.value.meta.body
  const allTools = (tools.value as any).meta?.body || (tools.value as any).body || tools.value

  if (!Array.isArray(allTools)) return {}
  
  return allTools.reduce((acc: any, tool: any) => {
    const category = tool.category || 'Other'
    const section = tool.section || 'General'
    
    if (!acc[category]) {
      acc[category] = {}
    }
    if (!acc[category][section]) {
      acc[category][section] = []
    }
    
    acc[category][section].push(tool)
    return acc
  }, {})
})

const formatSectionName = (name: string) => {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

const formatCategoryName = (name: string) => {
  if (name === 'poe') return 'Path of Exile 1'
  if (name === 'poe2') return 'Path of Exile 2'
  return name.charAt(0).toUpperCase() + name.slice(1)
}

useSeoMeta({
  title: 'Tools - PoE Tips',
  description: 'Collection of useful tools and resources for Path of Exile.'
})
</script>

<template>
  <UContainer class="py-8 space-y-12">
    <div class="space-y-4">
      <h1 class="text-3xl font-serif font-bold text-primary-400">Community Tools</h1>
      <p class="text-stone-400 max-w-2xl">
        A curated list of essential tools, websites, and resources for Path of Exile players.
      </p>
    </div>

    <div v-if="Object.keys(groupedTools).length === 0" class="text-center py-12 text-stone-500">
      Loading tools...
    </div>

    <div v-else class="space-y-16">
      <div v-for="(sections, category) in groupedTools" :key="category" class="space-y-6">
        <div class="flex items-center gap-4">
          <h2 class="text-2xl font-bold text-stone-200">{{ formatCategoryName(String(category)) }}</h2>
          <div class="h-px flex-1 bg-gradient-to-r from-stone-800 to-transparent"></div>
        </div>

        <div class="grid gap-8">
          <div v-for="(toolsList, section) in sections" :key="section" class="space-y-4">
            <h3 class="text-lg font-medium text-primary-500/80 uppercase tracking-wider text-sm">
              {{ formatSectionName(String(section)) }}
            </h3>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              <ToolCard
                v-for="tool in toolsList"
                :key="tool.id"
                :tool="tool"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UContainer>
</template>
