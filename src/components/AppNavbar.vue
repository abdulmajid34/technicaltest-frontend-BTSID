<template>
  <nav class="glass sticky top-0 z-50 px-4 py-3">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <router-link to="/products" class="flex items-center gap-3 group" id="nav-logo">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
          <svg class="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <span class="text-lg font-bold gradient-text">ShopVue</span>
      </router-link>

      <!-- Nav links -->
      <div class="hidden md:flex items-center gap-2">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :id="`nav-link-${link.name.toLowerCase().replace(/\s+/g, '-')}`"
          class="px-4 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all duration-200"
          active-class="bg-indigo-50 dark:bg-white/10 !text-indigo-600 dark:!text-indigo-400"
        >
          {{ link.name }}
        </router-link>
      </div>

      <!-- Right side -->
      <div class="flex items-center gap-3">
        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle Theme"
        >
          <svg v-if="!isDark" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>

        <!-- User info -->
        <div v-if="user" class="hidden md:flex items-center gap-2 border-l border-slate-200 dark:border-white/10 pl-3">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            {{ userInitial }}
          </div>
          <span class="text-sm text-slate-700 dark:text-slate-300 font-medium">{{ user.name }}</span>
        </div>

        <!-- Logout button -->
        <button
          v-if="user"
          id="btn-logout"
          @click="handleLogout"
          class="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all duration-200 border border-transparent"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="hidden sm:inline">Logout</span>
        </button>

        <!-- Mobile menu button -->
        <button
          v-if="user"
          id="btn-mobile-menu"
          @click="mobileOpen = !mobileOpen"
          class="md:hidden p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path v-if="!mobileOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <transition name="fade">
      <div v-if="mobileOpen && user" class="md:hidden mt-3 pb-3 border-t border-slate-200 dark:border-white/10 pt-3 space-y-1">
        <router-link
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          :id="`nav-mobile-${link.name.toLowerCase().replace(/\s+/g, '-')}`"
          class="block px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all"
          active-class="text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-white/10"
          @click="mobileOpen = false"
        >
          {{ link.name }}
        </router-link>
        <div class="px-4 py-2 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 border-t border-slate-100 dark:border-white/5 mt-2 pt-2">
          <div class="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white">
            {{ userInitial }}
          </div>
          {{ user.name }}
        </div>
      </div>
    </transition>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useTheme } from '@/composables/useTheme'
import Swal from 'sweetalert2'

const router = useRouter()
const authStore = useAuthStore()
const { isDark, toggleTheme } = useTheme()
const mobileOpen = ref(false)

const user = computed(() => authStore.user)
const userInitial = computed(() => user.value?.name?.charAt(0).toUpperCase() || 'U')

const navLinks = [
  { name: 'Produk', to: '/products' },
  { name: 'Tambah Produk', to: '/products/create' },
]

async function handleLogout() {
  const result = await Swal.fire({
    title: 'Keluar?',
    text: 'Apakah Anda yakin ingin keluar dari akun ini?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Ya, Keluar',
    cancelButtonText: 'Batal',
    background: isDark.value ? '#1e1e2e' : '#ffffff',
    color: isDark.value ? '#e2e8f0' : '#1e293b',
    confirmButtonColor: '#6366f1',
    cancelButtonColor: 'transparent',
    customClass: {
      cancelButton: isDark.value ? '!border !border-white/20 !text-slate-300' : '!border !border-slate-300 !text-slate-600',
    },
  })
  if (result.isConfirmed) {
    authStore.logout()
    router.push('/login')
  }
}
</script>
