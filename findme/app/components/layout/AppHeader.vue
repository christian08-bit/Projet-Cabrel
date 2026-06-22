<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)

const links = computed(() => [
  { to: localePath('/'), label: t('nav.home') },
  { to: localePath('/#how'), label: t('nav.how') },
  { to: localePath('/contact'), label: t('nav.support') },
])
</script>

<template>
  <header class="sticky top-0 z-40 border-b border-border-base bg-surface-card/80 backdrop-blur">
    <AppContainer class="flex h-16 items-center gap-4">
      <NuxtLink :to="localePath('/')" class="mr-auto flex items-center gap-2" aria-label="findMe — accueil">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
          <Icon name="lucide:map-pin" />
        </span>
        <span class="font-display text-lg font-extrabold tracking-tight text-text-strong">
          find<span class="text-brand-500">Me</span>
        </span>
      </NuxtLink>

      <!-- Navigation desktop -->
      <nav class="hidden items-center gap-7 md:flex" :aria-label="t('nav.primary')">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-sm font-medium text-text-base transition-colors hover:text-brand-500"
        >
          {{ link.label }}
        </NuxtLink>
      </nav>

      <div class="hidden items-center gap-2 md:flex">
        <LangSwitcher />
        <ThemeToggle />
        <UiButton :to="localePath('/login')" variant="ghost" size="sm">{{ t('nav.signin') }}</UiButton>
        <UiButton :to="localePath('/register')" size="sm">{{ t('nav.signup') }}</UiButton>
      </div>

      <!-- Mobile -->
      <div class="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border-base text-text-base"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
          @click="open = !open"
        >
          <Icon :name="open ? 'lucide:x' : 'lucide:menu'" class="text-xl" />
        </button>
      </div>
    </AppContainer>

    <!-- Menu mobile -->
    <div v-show="open" id="mobile-menu" class="border-t border-border-base bg-surface-card md:hidden">
      <AppContainer class="flex flex-col gap-1 py-4">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="rounded-lg px-3 py-2.5 text-sm font-medium text-text-base hover:bg-surface-muted"
          @click="open = false"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="mt-2 flex items-center justify-between gap-2">
          <LangSwitcher />
          <div class="flex flex-1 gap-2">
            <UiButton :to="localePath('/login')" variant="ghost" size="sm" block>{{ t('nav.signin') }}</UiButton>
            <UiButton :to="localePath('/register')" size="sm" block>{{ t('nav.signup') }}</UiButton>
          </div>
        </div>
      </AppContainer>
    </div>
  </header>
</template>
