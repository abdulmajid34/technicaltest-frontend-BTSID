<template>
  <router-link :to="'/products/' + product.slug" class="glass-card overflow-hidden group flex flex-col h-full bg-white dark:bg-white/5 w-full" :id="`product-card-${product.id}`">
    <!-- Image block -->
    <div class="relative overflow-hidden h-52 bg-slate-100 dark:bg-indigo-900/20 shrink-0">
      <img
        :src="productImage"
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        @error="onImgError"
        loading="lazy"
      />
      <!-- Category badge -->
      <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-white/80 dark:bg-indigo-500/80 border border-slate-200/50 dark:border-indigo-400/30 text-indigo-700 dark:text-white shadow-sm">
        {{ product.category?.name || 'Uncategorized' }}
      </span>
      <!-- Price overlay -->
      <div class="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
      <span class="absolute bottom-3 right-3 font-black text-white text-lg drop-shadow-md">
        ${{ Number(product.price).toLocaleString() }}
      </span>
    </div>

    <!-- Content block -->
    <div class="p-5 flex-1 flex flex-col justify-between space-y-3 bg-white/90 dark:bg-transparent">
      <h3 class="font-bold text-slate-800 dark:text-slate-100 line-clamp-2 leading-snug text-[15px] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {{ product.title }}
      </h3>
      <p class="text-[13px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium mt-auto">
        <svg class="w-4 h-4 text-indigo-500 dark:text-indigo-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        {{ product.category?.name || '-' }}
      </p>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const imgError = ref(false)

const productImage = computed(() => {
  if (imgError.value) return 'https://placehold.co/600x400/1e293b/818cf8?text=No+Image'
  const imgs = props.product.images
  if (Array.isArray(imgs) && imgs.length > 0) {
    const url = imgs[0]
    // The API sometimes wraps URLs in JSON strings like `["url"]`
    if (typeof url === 'string' && url.startsWith('[')) {
      try { return JSON.parse(url)[0] } catch { return 'https://placehold.co/600x400' }
    }
    return url
  }
  return 'https://placehold.co/600x400/1e293b/818cf8?text=No+Image'
})

function onImgError() {
  imgError.value = true
}
</script>
