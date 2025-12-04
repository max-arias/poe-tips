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
  <UCard class="h-full flex flex-col cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all" @click="isOpen = true">
    <template #header>
      <div class="flex justify-between items-start gap-2">
        <h3 class="text-lg font-bold line-clamp-2">{{ tip.title }}</h3>
        <UBadge :color="statusColor" variant="subtle" size="xs">{{ tip.status }}</UBadge>
      </div>
    </template>

    <p class="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
      {{ tip.description }}
    </p>

    <template #footer>
      <div class="flex flex-wrap gap-1">
        <UBadge v-for="tag in tip.tags" :key="tag" color="neutral" variant="soft" size="xs">
          {{ tag }}
        </UBadge>
      </div>
      <div class="mt-2 text-xs text-gray-400">
        By {{ tip.author }} • Patch {{ tip.last_verified_patch }}
      </div>
    </template>

    <UModal v-model="isOpen">
      <UCard>
        <template #header>
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-bold">{{ tip.title }}</h2>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark-20-solid" @click="isOpen = false" />
          </div>
        </template>

        <div class="prose dark:prose-invert max-w-none">
          <ContentRenderer :value="tip" />
        </div>

        <template #footer>
          <div class="flex flex-wrap gap-2">
            <UBadge v-for="tag in tip.tags" :key="tag" color="neutral" variant="soft">
              {{ tag }}
            </UBadge>
          </div>
        </template>
      </UCard>
    </UModal>
  </UCard>
</template>
