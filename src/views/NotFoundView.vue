<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 text-center">
    <!-- Background decoration -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl" />
    </div>

    <div class="relative z-10">
      <!-- 404 big text -->
      <div class="text-9xl font-black gradient-text mb-4 leading-none">404</div>
      <h1 class="text-2xl font-bold text-white mb-2">Halaman Tidak Ditemukan</h1>
      <p class="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
        Halaman yang Anda cari tidak ada atau telah dipindahkan.
      </p>
      <router-link
        to="/products"
        id="btn-back-home"
        class="btn-primary inline-flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Kembali ke Beranda</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
</script>
