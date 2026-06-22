<script setup lang="ts">
import type { Address } from '~/types'

definePageMeta({ middleware: 'auth' })
const { t } = useI18n()
const localePath = useLocalePath()
const store = useAddressesStore()
const toast = useToastStore()
const { exportPdf } = useAddressPdf()

useSeoMeta({ title: () => t('dashboard.title'), robots: 'noindex' })

await useAsyncData('addresses', () => store.fetchAll())

const toDelete = ref<Address | null>(null)
const deleting = ref(false)
const exportingId = ref<string | null>(null)

async function confirmDelete() {
  if (!toDelete.value) return
  deleting.value = true
  try {
    await store.remove(toDelete.value.id)
    toast.success(t('dashboard.deleted'))
    toDelete.value = null
  } catch (err) {
    toast.error(parseApiError(err).message)
  } finally {
    deleting.value = false
  }
}

async function onExport(address: Address) {
  exportingId.value = address.id
  try {
    await exportPdf(address)
  } catch {
    toast.error(t('common.errorTitle'))
  } finally {
    exportingId.value = null
  }
}
</script>

<template>
  <AppContainer class="py-10">
    <!-- En-tête -->
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="font-display text-2xl font-bold text-text-strong sm:text-3xl">{{ t('dashboard.title') }}</h1>
        <p class="mt-1 text-text-muted">{{ t('dashboard.subtitle') }}</p>
      </div>
      <div class="flex items-center gap-3">
        <UiBadge tone="brand">{{ t('dashboard.count', { count: store.count, max: store.max }) }}</UiBadge>
        <UiButton v-if="store.canCreate" :to="localePath('/addresses/new')">
          <Icon name="lucide:plus" /> {{ t('dashboard.newAddress') }}
        </UiButton>
      </div>
    </div>

    <UiAlert v-if="!store.canCreate && store.count > 0" tone="info" class="mt-6">{{ t('dashboard.maxReached') }}</UiAlert>

    <!-- Chargement -->
    <div v-if="store.loading && !store.loaded" class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="i in 3" :key="i" class="overflow-hidden rounded-xl border border-border-base bg-surface-card">
        <UiSkeleton height="160px" rounded="0" />
        <div class="space-y-2 p-5">
          <UiSkeleton width="60%" height="1.1rem" />
          <UiSkeleton width="40%" />
          <UiSkeleton width="50%" />
        </div>
      </div>
    </div>

    <!-- Erreur -->
    <UiEmptyState v-else-if="store.error" icon="lucide:cloud-off" :title="t('common.errorTitle')" :description="store.error">
      <UiButton variant="ghost" @click="store.fetchAll(true)">
        <Icon name="lucide:refresh-cw" /> {{ t('common.retry') }}
      </UiButton>
    </UiEmptyState>

    <!-- Vide -->
    <UiEmptyState v-else-if="store.count === 0" icon="lucide:map-pinned" :title="t('dashboard.emptyTitle')" :description="t('dashboard.emptyDesc')">
      <UiButton :to="localePath('/addresses/new')" size="lg">
        <Icon name="lucide:plus" /> {{ t('dashboard.emptyCta') }}
      </UiButton>
    </UiEmptyState>

    <!-- Liste -->
    <div v-else class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AddressCard
        v-for="address in store.items"
        :key="address.id"
        :address="address"
        @delete="toDelete = $event"
        @export="onExport"
      />
    </div>

    <!-- Confirmation de suppression -->
    <UiModal :open="!!toDelete" :title="t('dashboard.deleteTitle')" @close="toDelete = null">
      <p class="mt-2 text-sm text-text-muted">{{ t('dashboard.deleteDesc') }}</p>
      <div class="mt-6 flex justify-end gap-3">
        <UiButton variant="ghost" @click="toDelete = null">{{ t('common.cancel') }}</UiButton>
        <UiButton variant="danger" :loading="deleting" @click="confirmDelete">{{ t('dashboard.deleteConfirm') }}</UiButton>
      </div>
    </UiModal>
  </AppContainer>
</template>
