import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))
  const accessToken = ref(localStorage.getItem('access_token') || null)
  const refreshToken = ref(localStorage.getItem('refresh_token') || null)
  const loading = ref(false)
  const error = ref(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  async function login(email, password) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.post('/auth/login', { email, password })
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)

      // Fetch user profile
      const { data: profile } = await api.get('/auth/profile')
      user.value = profile
      localStorage.setItem('user', JSON.stringify(profile))

      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Email atau password salah'
      return { success: false, message: error.value }
    } finally {
      loading.value = false
    }
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    error.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('user')
  }

  async function refreshAccessToken() {
    try {
      const { data } = await api.post('/auth/refresh-token', {
        refreshToken: refreshToken.value,
      })
      accessToken.value = data.access_token
      refreshToken.value = data.refresh_token
      localStorage.setItem('access_token', data.access_token)
      localStorage.setItem('refresh_token', data.refresh_token)
      return true
    } catch {
      logout()
      return false
    }
  }

  return {
    user,
    accessToken,
    loading,
    error,
    isAuthenticated,
    login,
    logout,
    refreshAccessToken,
  }
})
