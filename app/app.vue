<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'PoE Tips Grid'
const description = 'Community-driven knowledge for Path of Exile.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <header class="border-b border-gray-200 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur sticky top-0 z-50">
        <UContainer class="h-16 flex items-center justify-between">
          <NuxtLink to="/" class="font-bold text-xl flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-primary-500" />
            PoE Tips
          </NuxtLink>

          <div class="flex items-center gap-2">
            <UColorModeButton />
            <UButton
              to="https://github.com/max-arias/poe-tips"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="gray"
              variant="ghost"
            />
          </div>
        </UContainer>
      </header>

      <main class="flex-1">
        <NuxtPage />
      </main>

      <footer class="border-t border-gray-200 dark:border-gray-800 py-6">
        <UContainer>
          <p class="text-sm text-gray-500 text-center">
            © {{ new Date().getFullYear() }} PoE Tips
          </p>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
