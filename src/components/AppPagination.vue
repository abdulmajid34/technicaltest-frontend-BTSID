<template>
  <nav v-if="totalPages > 1" class="flex items-center justify-center gap-1.5 mt-8" aria-label="Pagination" id="pagination-nav">
    <!-- Prev -->
    <button
      id="btn-prev-page"
      :disabled="currentPage === 1"
      @click="emit('change', currentPage - 1)"
      class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-slate-200 dark:disabled:hover:border-white/10 dark:disabled:hover:text-slate-400 transition-all duration-200 bg-white dark:bg-white/5"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Page numbers -->
    <template v-for="page in visiblePages" :key="page">
      <span v-if="page === '...'" class="w-10 h-10 flex items-center justify-center text-slate-400 dark:text-slate-500 text-sm">…</span>
      <button
        v-else
        :id="`btn-page-${page}`"
        @click="emit('change', page)"
        :class="[
          'w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200',
          currentPage === page
            ? 'bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 dark:shadow-indigo-500/20 border-0'
            : 'text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10',
        ]"
      >
        {{ page }}
      </button>
    </template>

    <!-- Next -->
    <button
      id="btn-next-page"
      :disabled="currentPage === totalPages"
      @click="emit('change', currentPage + 1)"
      class="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10 hover:border-indigo-500/40 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-slate-200 dark:disabled:hover:border-white/10 dark:disabled:hover:text-slate-400 transition-all duration-200 bg-white dark:bg-white/5"
    >
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </nav>

  <!-- Page info -->
  <p v-if="totalPages > 1" class="text-center text-sm font-medium text-slate-500 dark:text-slate-500 mt-4">
    Halaman {{ currentPage }} dari {{ totalPages }}
  </p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  currentPage: { type: Number, required: true },
  totalPages: { type: Number, required: true },
})

const emit = defineEmits(['change'])

const visiblePages = computed(() => {
  const pages = []
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i)
    return pages
  }

  pages.push(1)
  if (current > 3) pages.push('...')
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)
  for (let i = start; i <= end; i++) pages.push(i)
  if (current < total - 2) pages.push('...')
  pages.push(total)
  return pages
})
</script>
