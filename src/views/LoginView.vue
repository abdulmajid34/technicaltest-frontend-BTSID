<template>
  <div class="min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300">
    <!-- Background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-indigo-500/30 dark:bg-indigo-600/20 blur-3xl animate-float" />
      <div class="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-violet-500/30 dark:bg-violet-600/20 blur-3xl animate-float" style="animation-delay: 1.5s" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-pink-500/20 dark:bg-pink-600/10 blur-3xl" />
    </div>

    <!-- Theme Toggle Fixed -->
    <div class="absolute top-6 right-6">
       <button
          @click="toggleTheme"
          class="p-2.5 rounded-full bg-white/50 dark:bg-white/5 backdrop-blur-md border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-white/10 transition-all shadow-sm"
          aria-label="Toggle Theme"
        >
          <svg v-if="!isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
    </div>

    <!-- Card -->
    <div class="w-full max-w-md relative z-10 transition-all">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-xl shadow-indigo-500/30 mb-4 animate-pulse-glow">
          <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h1 class="text-3xl font-black gradient-text">ShopVue</h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Product Management Platform</p>
      </div>

      <!-- Form card -->
      <div class="glass-card p-8 group">
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-1">Selamat Datang 👋</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-7">Masuk untuk mengelola produk Anda</p>

        <form @submit.prevent="handleLogin" novalidate id="form-login">
          <!-- Email -->
          <div class="mb-5">
            <label for="input-email" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Email
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </span>
              <input
                id="input-email"
                v-model.trim="form.email"
                type="email"
                placeholder="john@mail.com"
                autocomplete="email"
                :class="['input-field pl-10', errors.email ? 'error' : '']"
                @blur="validateEmail"
              />
            </div>
            <p v-if="errors.email" class="mt-1.5 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
              {{ errors.email }}
            </p>
          </div>

          <!-- Password -->
          <div class="mb-7">
            <label for="input-password" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div class="relative">
              <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                id="input-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                autocomplete="current-password"
                :class="['input-field pl-10 pr-10', errors.password ? 'error' : '']"
                @blur="validatePassword"
              />
              <button
                type="button"
                id="btn-toggle-password"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                aria-label="Toggle Password Visibility"
              >
                <svg v-if="!showPassword" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <svg v-else class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
            <p v-if="errors.password" class="mt-1.5 text-xs text-rose-500 dark:text-rose-400 flex items-center gap-1">
              <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
              {{ errors.password }}
            </p>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            id="btn-login-submit"
            :disabled="authStore.loading"
            class="btn-primary w-full flex items-center justify-center gap-2 h-12 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <svg v-if="authStore.loading" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span>{{ authStore.loading ? 'Memproses...' : 'Masuk' }}</span>
          </button>
        </form>

        <!-- Demo hint -->
        <div class="mt-6 p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20">
          <p class="text-xs text-indigo-700 dark:text-indigo-300 font-bold mb-1">Demo Credentials</p>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            Email: <span class="text-indigo-600 dark:text-indigo-300 font-mono">john@mail.com</span><br />
            Password: <span class="text-indigo-600 dark:text-indigo-300 font-mono">changeme</span>
          </p>
          <button
            id="btn-fill-demo"
            type="button"
            @click="fillDemo"
            class="mt-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 hover:underline underline-offset-2 transition-colors"
          >
            Isi otomatis →
          </button>
        </div>
      </div>

      <p class="text-center text-xs text-slate-500 dark:text-slate-600 mt-6 font-medium">
        © 2025 ShopVue · Technical Test Frontend
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'
import Swal from 'sweetalert2'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const { isDark, toggleTheme } = useTheme()

const showPassword = ref(false)
const form = reactive({ email: '', password: '' })
const errors = reactive({ email: '', password: '' })

function validateEmail() {
  if (!form.email) {
    errors.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Format email tidak valid'
  } else {
    errors.email = ''
  }
}

function validatePassword() {
  errors.password = !form.password ? 'Password wajib diisi' : ''
}

function validate() {
  validateEmail()
  validatePassword()
  return !errors.email && !errors.password
}

function fillDemo() {
  form.email = 'john@mail.com'
  form.password = 'changeme'
  errors.email = ''
  errors.password = ''
}

async function handleLogin() {
  if (!validate()) return

  const result = await authStore.login(form.email, form.password)

  if (result.success) {
    await Swal.fire({
      title: 'Berhasil Masuk! 🎉',
      text: `Selamat datang kembali, ${authStore.user?.name || 'User'}!`,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
      background: isDark.value ? '#1e1e2e' : '#ffffff',
      color: isDark.value ? '#e2e8f0' : '#1e293b',
      iconColor: '#6366f1',
    })
    const redirect = route.query.redirect || '/products'
    router.push(redirect)
  } else {
    await Swal.fire({
      title: 'Login Gagal',
      text: result.message || 'Email atau password tidak valid',
      icon: 'error',
      confirmButtonText: 'Coba Lagi',
      background: isDark.value ? '#1e1e2e' : '#ffffff',
      color: isDark.value ? '#e2e8f0' : '#1e293b',
      confirmButtonColor: '#6366f1',
    })
  }
}
</script>
