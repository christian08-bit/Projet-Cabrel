<script setup lang="ts">
const { t } = useI18n()
useSeoMeta({ title: t('nav.support'), description: t('contact.soon') })
</script>

<template>
  <AppContainer class="py-16">
    <UiEmptyState
      icon="lucide:life-buoy"
      :title="t('nav.support')"
      :description="t('contact.soon')"
    />
  </AppContainer>
</template>
