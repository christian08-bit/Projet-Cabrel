<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useSeoMeta({ title: 'Dashboard', robots: 'noindex' })
</script>

<template>
  <AppContainer class="py-16">
    <UiEmptyState
      icon="lucide:layout-dashboard"
      title="Dashboard"
      :description="t('dashboard.soon')"
    >
      <UiButton :to="localePath('/')" variant="ghost">
        <Icon name="lucide:arrow-left" /> {{ t('nav.home') }}
      </UiButton>
    </UiEmptyState>
  </AppContainer>
</template>
