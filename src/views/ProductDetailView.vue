<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <AppNavbar />

    <main class="flex-1 max-w-7xl mx-auto w-full px-4 py-8 relative">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
        <router-link to="/products" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Produk
        </router-link>
        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-slate-800 dark:text-slate-200 font-semibold line-clamp-1 max-w-xs">{{ product ? product.title : 'Sedang memuat...' }}</span>
      </nav>

      <!-- Error State -->
      <div v-if="error" class="glass-card p-12 text-center">
        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-50 dark:bg-rose-500/10 mb-4">
          <svg class="w-8 h-8 text-rose-500 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-white mb-2">Produk Tidak Ditemukan</h2>
        <p class="text-slate-500 dark:text-slate-400 text-sm mb-6">{{ error }}</p>
        <button @click="router.push('/products')" class="btn-primary">Kembali ke Daftar Produk</button>
      </div>

      <!-- Loading State -->
      <div v-else-if="loading || !product" class="animate-pulse">
        <div class="glass-card p-6 md:p-8 flex flex-col md:flex-row gap-8">
          <div class="w-full md:w-1/2 lg:w-2/5 shrink-0 skeleton h-[400px] rounded-2xl" />
          <div class="flex-1 space-y-6 py-4">
            <div class="skeleton h-8 w-3/4 rounded-lg" />
            <div class="skeleton h-5 w-1/4 rounded-lg" />
            <div class="skeleton h-10 w-1/3 rounded-lg" />
            <div class="space-y-3">
              <div class="skeleton h-4 w-full rounded" />
              <div class="skeleton h-4 w-5/6 rounded" />
              <div class="skeleton h-4 w-4/6 rounded" />
            </div>
          </div>
        </div>
      </div>

      <!-- Product View -->
      <div v-else class="glass-card overflow-hidden bg-white dark:bg-white/5 flex flex-col md:flex-row shadow-sm">
        <!-- Image Section -->
        <div class="w-full md:w-1/2 lg:w-2/5 border-b md:border-b-0 md:border-r border-slate-200 dark:border-white/10 shrink-0 bg-slate-50 dark:bg-indigo-950/20 p-6 flex flex-col gap-4">
          <div class="relative w-full aspect-square rounded-2xl overflow-hidden shadow-inner bg-white dark:bg-black/20">
            <img 
              :src="activeImage" 
              :alt="product.title" 
              class="w-full h-full object-cover"
              @error="handleImgError"
            />
          </div>
          <div v-if="parsedImages.length > 1" class="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            <button 
              v-for="(img, idx) in parsedImages" 
              :key="idx"
              @click="activeImageIndex = idx; imgError = false"
              :class="['relative w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all', activeImageIndex === idx ? 'border-indigo-500 shadow-md transform scale-105' : 'border-transparent opacity-70 hover:opacity-100']"
            >
              <img :src="img" alt="Thumbnail" class="w-full h-full object-cover" @error="handleImgError" />
            </button>
          </div>
        </div>

        <!-- Content Section -->
        <div class="flex-1 p-6 md:p-10 flex flex-col">
          <div class="mb-2">
            <span class="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-500/20">
              {{ product.category?.name || 'Uncategorized' }}
            </span>
          </div>
          
          <h1 class="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 leading-tight mb-4">
            {{ product.title }}
          </h1>
          
          <div class="mb-6 flex items-end gap-3">
            <span class="text-4xl font-black gradient-text drop-shadow-sm">
              ${{ Number(product.price).toLocaleString() }}
            </span>
          </div>
          
          <div class="h-px w-full bg-slate-200 dark:bg-white/10 my-6" />
          
          <h3 class="text-lg font-bold text-slate-800 dark:text-white mb-3">Deskripsi Produk</h3>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {{ product.description || 'Tidak ada deskripsi tersedia untuk produk ini.' }}
          </p>

          <div class="mt-auto pt-10 flex flex-col sm:flex-row gap-4">
            <button class="btn-primary flex-1 flex justify-center items-center gap-2 text-lg h-14">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Keranjang
            </button>
            <button class="flex items-center justify-center w-14 h-14 rounded-xl border border-slate-300 dark:border-white/10 text-slate-500 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/services/api'
import AppNavbar from '@/components/AppNavbar.vue'

const route = useRoute()
const router = useRouter()
const product = ref(null)
const loading = ref(true)
const error = ref('')
const activeImageIndex = ref(0)
const imgError = ref(false)

const parsedImages = computed(() => {
  if (!product.value || !product.value.images) return ['https://placehold.co/600x400/1e293b/818cf8?text=No+Image']
  
  let imgs = product.value.images
  if (Array.isArray(imgs) && imgs.length > 0) {
    // API sometimes double JSON encodes the array
    if (typeof imgs[0] === 'string' && imgs[0].startsWith('[')) {
      try {
        imgs = JSON.parse(imgs[0])
      } catch (e) {
        // ignore
      }
    }
    const cleanImgs = imgs.filter(img => typeof img === 'string' && img.startsWith('http'))
    return cleanImgs.length > 0 ? cleanImgs : ['https://placehold.co/600x400/1e293b/818cf8?text=No+Image']
  }
  return ['https://placehold.co/600x400/1e293b/818cf8?text=No+Image']
})

const activeImage = computed(() => {
  if (imgError.value || parsedImages.value.length === 0) {
    return 'https://placehold.co/600x400/1e293b/818cf8?text=No+Image'
  }
  return parsedImages.value[activeImageIndex.value] || parsedImages.value[0]
})

function handleImgError() {
  imgError.value = true
}

async function fetchProduct() {
  const slug = route.params.slug
  if (!slug) {
    error.value = 'URL tidak valid.'
    loading.value = false
    return
  }

  loading.value = true
  error.value = ''
  
  try {
    const { data } = await api.get(`/products/slug/${slug}`)
    product.value = data
    activeImageIndex.value = 0
    imgError.value = false
  } catch (err) {
    error.value = err.response?.data?.message || 'Tidak dapat menemukan data produk. Produk mungkin telah dihapus atau URL tidak valid.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchProduct()
})
</script>
