<script setup lang="ts">
definePageMeta({ layout: 'admin' })
const { t } = useI18n()
useSeoMeta({ title: 'Administration', robots: 'noindex' })
</script>

<template>
  <UiEmptyState
    icon="lucide:layout-dashboard"
    :title="t('admin.nav.overview')"
    :description="t('admin.soon')"
  />
</template>
