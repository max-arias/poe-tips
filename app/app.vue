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
    <div class="min-h-screen flex flex-col bg-stone-950 text-stone-200 font-sans selection:bg-primary-500/30">
      <header class="border-b border-primary-900/50 bg-stone-950/95 backdrop-blur sticky top-0 z-50 shadow-lg shadow-black/20">
        <UContainer class="h-16 flex items-center justify-between">
          <NuxtLink to="/" class="font-serif font-bold text-xl flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors">
            <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
            PoE Tips
          </NuxtLink>

          <div class="flex items-center gap-2">
            <UColorModeButton />
            <UButton
              to="https://github.com/max-arias/poe-tips"
              target="_blank"
              icon="i-simple-icons-github"
              aria-label="GitHub"
              color="neutral"
              variant="ghost"
              class="hover:text-primary-400"
            />
          </div>
        </UContainer>
      </header>

      <main class="flex-1 relative">
        <!-- Background texture/gradient overlay -->
        <div class="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/10 via-stone-950/0 to-stone-950/0 z-0"></div>
        <div class="relative z-10">
          <NuxtPage />
        </div>
      </main>

      <footer class="border-t border-primary-900/30 py-8 bg-stone-950">
        <UContainer>
          <p class="text-sm text-stone-500 text-center font-serif">
            © {{ new Date().getFullYear() }} PoE Tips • Community Driven
          </p>
        </UContainer>
      </footer>
    </div>
  </UApp>
</template>
