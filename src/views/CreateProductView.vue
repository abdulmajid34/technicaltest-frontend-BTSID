<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300">
    <AppNavbar />

    <main class="flex-1 max-w-3xl mx-auto w-full px-4 py-8 relative">
      <!-- Background decoration -->
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
      </div>

      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm text-slate-500 mb-6 font-medium" aria-label="Breadcrumb">
        <router-link to="/products" id="breadcrumb-products" class="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Produk
        </router-link>
        <svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-slate-800 dark:text-slate-200 font-semibold">Tambah Produk</span>
      </nav>

      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-black text-slate-900 dark:text-white">
          Tambah <span class="gradient-text">Produk Baru</span>
        </h1>
        <p class="text-slate-500 dark:text-slate-400 text-sm mt-2">Isi form di bawah untuk menambahkan produk ke katalog</p>
      </div>

      <!-- Form card -->
      <div class="glass-card p-6 md:p-8 bg-white dark:bg-white/5">
        <form @submit.prevent="handleSubmit" novalidate id="form-create-product">

          <!-- Title -->
          <div class="mb-6">
            <label for="input-title" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Nama Produk <span class="text-rose-500">*</span>
            </label>
            <input
              id="input-title"
              v-model.trim="form.title"
              type="text"
              placeholder="Contoh: Wireless Headphone Premium"
              maxlength="150"
              :class="['input-field', errors.title ? 'error' : '']"
              @blur="validateTitle"
            />
            <div class="flex justify-between mt-2">
              <p v-if="errors.title" class="text-xs font-medium text-rose-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                {{ errors.title }}
              </p>
              <span class="ml-auto text-xs text-slate-400 font-medium">{{ form.title.length }}/150</span>
            </div>
          </div>

          <!-- Price & Category Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <!-- Category -->
            <div>
              <label for="input-category" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Kategori <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <select
                  id="input-category"
                  v-model.number="form.categoryId"
                  :class="['input-field appearance-none pr-10 cursor-pointer bg-white dark:bg-white/5', errors.categoryId ? 'error' : '']"
                  @blur="validateCategory"
                  @change="validateCategory"
                >
                  <option value="" disabled>— Pilih Kategori —</option>
                  <option
                    v-for="cat in productStore.categories"
                    :key="cat.id"
                    :value="cat.id"
                  >
                    {{ cat.name }}
                  </option>
                </select>
                <span class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </div>
              <p v-if="errors.categoryId" class="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                {{ errors.categoryId }}
              </p>
            </div>

            <!-- Price -->
            <div>
              <label for="input-price" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Harga <span class="text-rose-500">*</span>
              </label>
              <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input
                  id="input-price"
                  v-model.number="form.price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  :class="['input-field pl-8', errors.price ? 'error' : '']"
                  @blur="validatePrice"
                />
              </div>
              <p v-if="errors.price" class="mt-2 text-xs font-medium text-rose-500 flex items-center gap-1">
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" /></svg>
                {{ errors.price }}
              </p>
            </div>
          </div>

          <!-- Description -->
          <div class="mb-6">
            <label for="input-description" class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>Deskripsi</span>
              <span class="text-slate-400 text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">opsional</span>
            </label>
            <textarea
              id="input-description"
              v-model.trim="form.description"
              rows="4"
              placeholder="Tuliskan deskripsi produk secara detail..."
              class="input-field resize-y min-h-[100px] leading-relaxed"
            />
          </div>

          <!-- Images -->
          <div class="mb-8">
            <label class="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center justify-between">
              <span>URL Gambar</span>
              <span class="text-slate-400 text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">opsional</span>
            </label>
            <div class="space-y-3">
              <div
                v-for="(img, index) in form.images"
                :key="index"
                class="flex gap-3 items-center group"
              >
                <div class="relative flex-1">
                  <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                     <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                     </svg>
                  </span>
                  <input
                    :id="`input-image-${index}`"
                    v-model="form.images[index]"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    class="input-field pl-10"
                  />
                </div>
                <button
                  v-if="form.images.length > 1"
                  type="button"
                  :id="`btn-remove-image-${index}`"
                  @click="removeImage(index)"
                  class="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 dark:border-white/10 text-slate-400 hover:text-rose-500 hover:border-rose-200 dark:hover:border-rose-500/30 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all opacity-100 sm:opacity-50 sm:group-hover:opacity-100"
                  aria-label="Hapus URL"
                >
                  <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <button
              v-if="form.images.length < 4"
              type="button"
              id="btn-add-image"
              @click="addImage"
              class="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors mt-3"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Tambah URL Gambar Lainnya
            </button>
          </div>

          <!-- Actions -->
          <div class="flex flex-col-reverse sm:flex-row items-center gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
            <router-link
              to="/products"
              id="btn-cancel-create"
              class="w-full sm:w-auto px-8 h-12 flex items-center justify-center rounded-xl border border-slate-300 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/20 hover:bg-slate-50 dark:hover:bg-white/5 transition-all font-semibold text-sm"
            >
              Batal
            </router-link>
            <button
              type="submit"
              id="btn-submit-product"
              :disabled="submitting"
              class="btn-primary w-full sm:w-auto flex-1 h-12 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed text-[15px]"
            >
              <svg v-if="submitting" class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ submitting ? 'Menyimpan...' : 'Simpan Produk' }}</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/products'
import { useTheme } from '@/composables/useTheme'
import AppNavbar from '@/components/AppNavbar.vue'
import Swal from 'sweetalert2'

const router = useRouter()
const productStore = useProductStore()
const { isDark } = useTheme()
const submitting = ref(false)

const form = reactive({
  title: '',
  price: '',
  description: '',
  categoryId: '',
  images: [''],
})

const errors = reactive({
  title: '',
  price: '',
  categoryId: '',
})

function validateTitle() {
  if (!form.title) errors.title = 'Nama produk wajib diisi'
  else if (form.title.length > 150) errors.title = 'Nama produk maksimal 150 karakter'
  else errors.title = ''
}

function validatePrice() {
  if (form.price === '' || form.price === null) {
    errors.price = 'Harga wajib diisi'
  } else if (isNaN(Number(form.price)) || Number(form.price) < 0) {
    errors.price = 'Harga harus berupa angka positif'
  } else {
    errors.price = ''
  }
}

function validateCategory() {
  errors.categoryId = !form.categoryId ? 'Kategori wajib dipilih' : ''
}

function validate() {
  validateTitle()
  validatePrice()
  validateCategory()
  return !errors.title && !errors.price && !errors.categoryId
}

function addImage() {
  form.images.push('')
}

function removeImage(index) {
  form.images.splice(index, 1)
}

async function handleSubmit() {
  if (!validate()) return

  submitting.value = true
  try {
    const payload = {
      title: form.title,
      price: Number(form.price),
      description: form.description || 'No description',
      categoryId: Number(form.categoryId),
      images: form.images.filter((url) => url.trim() !== '') || ['https://placehold.co/600x400/1e293b/818cf8?text=New+Product'],
    }

    if (payload.images.length === 0) {
      payload.images = ['https://placehold.co/600x400/1e293b/818cf8?text=New+Product']
    }

    await productStore.createProduct(payload)

    await Swal.fire({
      title: 'Produk Berhasil Ditambahkan! 🚀',
      html: `<span class="text-slate-600 dark:text-slate-300">Produk <strong class="text-indigo-600 dark:text-indigo-300 font-bold">${payload.title}</strong> telah berhasil ditambahkan ke katalog.</span>`,
      icon: 'success',
      confirmButtonText: 'Lihat Daftar Produk',
      showCancelButton: true,
      cancelButtonText: 'Tambah Lagi',
      background: isDark.value ? '#1e1e2e' : '#ffffff',
      color: isDark.value ? '#e2e8f0' : '#1e293b',
      confirmButtonColor: '#6366f1',
      iconColor: '#6366f1',
      customClass: {
        cancelButton: isDark.value ? '!bg-transparent !border !border-white/20 !text-slate-300' : '!bg-white !border !border-slate-300 !text-slate-700',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/products')
      } else {
        // Reset form
        Object.assign(form, { title: '', price: '', description: '', categoryId: '', images: [''] })
        Object.assign(errors, { title: '', price: '', categoryId: '' })
      }
    })
  } catch (err) {
    const msg = err.response?.data?.message || 'Terjadi kesalahan saat menyimpan produk'
    await Swal.fire({
      title: 'Gagal Menyimpan Produk',
      text: msg,
      icon: 'error',
      confirmButtonText: 'Coba Lagi',
       background: isDark.value ? '#1e1e2e' : '#ffffff',
      color: isDark.value ? '#e2e8f0' : '#1e293b',
      confirmButtonColor: '#6366f1',
    })
  } finally {
    submitting.value = false
  }
}

onMounted(() => {
  if (productStore.categories.length === 0) {
    productStore.fetchCategories()
  }
})
</script>
