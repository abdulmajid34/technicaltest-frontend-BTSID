<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <AppNavbar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-8">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-black text-slate-900 dark:text-white">
            Daftar <span class="gradient-text">Produk</span>
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">
            Total {{ productStore.totalItems }} produk tersedia
          </p>
        </div>
        <router-link
          to="/products/create"
          id="btn-go-create-product"
          class="btn-primary inline-flex items-center gap-2 self-start sm:self-auto"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4" />
          </svg>
          <span>Tambah Produk</span>
        </router-link>
      </div>

      <!-- Search bar -->
      <div class="relative mb-6 max-w-md" id="search-container">
        <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          id="input-search"
          v-model="searchInput"
          type="search"
          placeholder="Cari produk berdasarkan nama..."
          class="input-field pl-10 pr-10 bg-white"
          @input="onSearch"
        />
        <button
          v-if="searchInput"
          id="btn-clear-search"
          type="button"
          @click="clearSearch"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Error state -->
      <div v-if="productStore.error && !productStore.loading" class="glass-card p-8 text-center mb-6">
        <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-500/10 mb-4">
          <svg class="w-7 h-7 text-rose-500 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p class="text-slate-800 dark:text-slate-300 font-semibold">Gagal memuat produk</p>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-4">{{ productStore.error }}</p>
        <button id="btn-retry" @click="loadProducts(productStore.currentPage)" class="btn-primary">
          <span>Coba Lagi</span>
        </button>
      </div>

      <!-- Skeleton loading -->
      <div v-else-if="productStore.loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div v-for="n in 8" :key="n" class="rounded-2xl overflow-hidden glass-card">
          <div class="skeleton h-52 w-full rounded-none" />
          <div class="p-4 space-y-3 bg-white/50 dark:bg-white/5">
            <div class="skeleton h-4 rounded w-3/4" />
            <div class="skeleton h-3 rounded w-1/2" />
          </div>
        </div>
      </div>

      <!-- Products grid -->
      <template v-else>
        <!-- Empty search result -->
        <div v-if="productStore.filteredProducts.length === 0" class="glass-card p-12 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 mb-4">
            <svg class="w-8 h-8 text-indigo-500 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p class="text-slate-800 dark:text-slate-300 font-semibold text-lg">Produk tidak ditemukan</p>
          <p class="text-slate-500 dark:text-slate-400 text-sm mt-1">Coba kata kunci pencarian yang berbeda</p>
          <button id="btn-clear-search-empty" @click="clearSearch" class="mt-4 text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 text-sm font-medium hover:underline transition-colors">
            Hapus pencarian
          </button>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" id="products-grid">
          <transition-group name="fade" appear>
            <ProductCard
              v-for="product in productStore.filteredProducts"
              :key="product.id"
              :product="product"
            />
          </transition-group>
        </div>

        <!-- Pagination (only when not searching) -->
        <AppPagination
          v-if="!productStore.searchQuery"
          :current-page="productStore.currentPage"
          :total-pages="productStore.totalPages"
          @change="loadProducts"
        />
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/products'
import AppNavbar from '@/components/AppNavbar.vue'
import ProductCard from '@/components/ProductCard.vue'
import AppPagination from '@/components/AppPagination.vue'

const productStore = useProductStore()
const searchInput = ref(productStore.searchQuery || '')

let debounceTimer = null

function onSearch() {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    productStore.setSearchQuery(searchInput.value)
  }, 350)
}

function clearSearch() {
  searchInput.value = ''
  productStore.setSearchQuery('')
}

async function loadProducts(page = 1) {
  await productStore.fetchProducts(page)
}

onMounted(() => {
  loadProducts(productStore.currentPage)
  productStore.fetchCategories()
})
</script>
