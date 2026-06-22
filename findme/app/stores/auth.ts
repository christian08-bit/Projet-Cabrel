import { defineStore } from 'pinia'
import type { User } from '~/types'

/**
 * État d'authentification global.
 * Squelette posé en Semaine 1 — les actions (login/register/logout) seront
 * branchées sur le mock server en Semaine 2. La session est persistée via
 * un cookie (SSR-safe) plutôt que localStorage.
 */
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const token = useCookie<string | null>('findme-token', {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'lax',
    secure: true,
  })

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  function setSession(payload: { user: User; token: string }) {
    user.value = payload.user
    token.value = payload.token
  }

  function clear() {
    user.value = null
    token.value = null
  }

  return { user, token, isAuthenticated, isAdmin, setSession, clear }
})
