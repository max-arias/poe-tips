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
  <div class="container mx-auto px-4 py-8">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-primary-500 mb-2">PoE Tips Grid</h1>
      <p class="text-gray-500 dark:text-gray-400">Community-driven knowledge for Path of Exile.</p>
    </div>

    <div class="mb-8 space-y-4">
      <UInput
        v-model="searchQuery"
        icon="i-heroicons-magnifying-glass-20-solid"
        size="xl"
        color="neutral"
        :trailing="false"
        placeholder="Search tips (e.g. 'rf', 'crafting')..."
        class="w-full max-w-2xl mx-auto block"
      />
      
      <!-- Tag Filter (Simple implementation) -->
      <div class="flex flex-wrap justify-center gap-2">
        <UBadge 
          v-for="tag in allTags" 
          :key="tag"
          :color="selectedTags.includes(tag) ? 'primary' : 'neutral'"
          variant="soft"
          class="cursor-pointer select-none"
          @click="selectedTags.includes(tag) ? selectedTags = selectedTags.filter(t => t !== tag) : selectedTags.push(tag)"
        >
          {{ tag }}
        </UBadge>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <TipCard v-for="tip in filteredTips" :key="tip.path" :tip="tip" />
    </div>

    <div v-if="filteredTips.length === 0" class="text-center text-gray-500 mt-12">
      No tips found matching your criteria.
    </div>
  </div>
</template>
