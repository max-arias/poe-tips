<script setup lang="ts">
const searchQuery = ref('')
const selectedTags = ref<string[]>([])

// Fetch data
const { data: rawTips } = await useAsyncData('tips', () => queryCollection('tips').all())
const { data: leaguesData } = await useAsyncData('leagues', () => queryCollection('leagues').first())
const { data: abbreviationsData } = await useAsyncData('abbreviations', () => queryCollection('abbreviations').first())

// Determine current version
const currentVersion = computed(() => {
  const leagues = leaguesData.value?.body || []
  if (!Array.isArray(leagues) || leagues.length === 0) return '3.25'
  
  const active = leagues.find((l: any) => l.is_active && l.slug !== 'standard')
  return active?.version || leagues[0]?.version || '3.25'
})

// Process tips with status
const tips = computed(() => {
  if (!rawTips.value) return []
  
  return rawTips.value.map(tip => {
    let status = 'stale'
    if (tip.is_broken) {
      status = 'dead'
    } else if (tip.last_verified_patch === currentVersion.value) {
      status = 'verified'
    } else {
      status = 'legacy'
    }
    return { ...tip, status }
  })
})

// Filter tips
const filteredTips = computed(() => {
  let result = tips.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    
    // Expand abbreviations logic could go here
    
    result = result.filter(tip => {
      const content = `${tip.title} ${tip.description} ${tip.tags?.join(' ') || ''}`.toLowerCase()
      return content.includes(query)
    })
  }

  // Tag filter
  if (selectedTags.value.length > 0) {
    result = result.filter(tip => 
      selectedTags.value.every(tag => tip.tags?.includes(tag))
    )
  }

  return result
})

// Extract all unique tags for filter
const allTags = computed(() => {
  if (!tips.value) return []
  const tags = new Set<string>()
  tips.value.forEach(tip => tip.tags?.forEach((t: string) => tags.add(t)))
  return Array.from(tags).sort()
})
</script>

<template>
  <div class="container mx-auto px-4 py-12">
    <div class="text-center mb-16 relative">
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary-500/20 blur-[100px] rounded-full pointer-events-none"></div>
      <h1 class="text-5xl font-serif font-bold text-primary-400 mb-4 drop-shadow-lg tracking-wide">PoE Tips Grid</h1>
      <p class="text-stone-400 text-lg max-w-2xl mx-auto">Community-driven knowledge for Path of Exile. Filter by tags or search to find specific mechanics.</p>
    </div>

    <div class="mb-12 space-y-6 max-w-3xl mx-auto">
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-primary-900/50 via-primary-500/30 to-primary-900/50 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          size="xl"
          color="neutral"
          :trailing="false"
          placeholder="Search tips (e.g. 'rf', 'crafting')..."
          class="w-full relative"
          :ui="{ 
            base: 'bg-stone-900/80 border-primary-900/50 text-stone-200 placeholder:text-stone-600 focus:border-primary-500/50 focus:ring-primary-500/20',
            leadingIcon: 'text-primary-500/70'
          }"
        />
      </div>
      
      <!-- Tag Filter (Simple implementation) -->
      <div class="flex flex-wrap justify-center gap-2">
        <UBadge 
          v-for="tag in allTags" 
          :key="tag"
          :color="selectedTags.includes(tag) ? 'primary' : 'neutral'"
          :variant="selectedTags.includes(tag) ? 'subtle' : 'outline'"
          class="cursor-pointer select-none transition-all hover:border-primary-500/50"
          :class="selectedTags.includes(tag) ? 'ring-1 ring-primary-500/50' : 'opacity-70 hover:opacity-100 bg-stone-900/50'"
          @click="selectedTags.includes(tag) ? selectedTags = selectedTags.filter(t => t !== tag) : selectedTags.push(tag)"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <div class="space-y-4">
      <TipCard v-for="tip in filteredTips" :key="tip.path" :tip="tip" />
    </div>

    <div v-if="filteredTips.length === 0" class="text-center text-stone-500 mt-12 py-12 border border-dashed border-stone-800 rounded-lg">
      <UIcon name="i-heroicons-beaker" class="w-12 h-12 mx-auto mb-4 opacity-20" />
      <p>No tips found matching your criteria.</p>
    </div>
  </div>
</template>
