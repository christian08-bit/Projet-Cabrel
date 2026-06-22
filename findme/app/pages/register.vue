<script setup lang="ts">
definePageMeta({ layout: 'auth' })
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({ title: t('nav.signup'), robots: 'noindex' })
</script>

<template>
  <div>
    <h1 class="font-display text-2xl font-bold text-text-strong">{{ t('nav.signup') }}</h1>
    <p class="mt-2 text-sm text-text-muted">{{ t('auth.soon') }}</p>
    <UiAlert tone="info" class="mt-6">{{ t('auth.soon') }}</UiAlert>
    <UiButton :to="localePath('/')" variant="ghost" block class="mt-4">
      <Icon name="lucide:arrow-left" /> {{ t('nav.home') }}
    </UiButton>
  </div>
</template>
