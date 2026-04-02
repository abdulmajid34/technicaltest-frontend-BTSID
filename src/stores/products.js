import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

const ITEMS_PER_PAGE = 8

export const useProductStore = defineStore('products', () => {
  const products = ref([])
  const allProducts = ref([])
  const categories = ref([])
  const loading = ref(false)
  const error = ref(null)
  const currentPage = ref(1)
  const totalItems = ref(0)
  const searchQuery = ref('')

  const filteredProducts = computed(() => {
    if (!searchQuery.value) return products.value
    const q = searchQuery.value.toLowerCase()
    return products.value.filter((p) =>
      p.title.toLowerCase().includes(q)
    )
  })

  const totalPages = computed(() =>
    Math.ceil(totalItems.value / ITEMS_PER_PAGE)
  )

  async function fetchProducts(page = 1) {
    loading.value = true
    error.value = null
    currentPage.value = page
    try {
      const offset = (page - 1) * ITEMS_PER_PAGE
      const [productsRes, allRes] = await Promise.all([
        api.get(`/products?offset=${offset}&limit=${ITEMS_PER_PAGE}`),
        api.get('/products?offset=0&limit=200'),
      ])
      products.value = productsRes.data
      allProducts.value = allRes.data
      totalItems.value = allRes.data.length
    } catch (err) {
      error.value = err.response?.data?.message || 'Gagal memuat produk'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategories() {
    try {
      const { data } = await api.get('/categories')
      categories.value = data
    } catch {
      categories.value = []
    }
  }

  async function createProduct(payload) {
    const { data } = await api.post('/products/', payload)
    // Prepend to local list without full reload
    products.value.unshift(data)
    totalItems.value += 1
    return data
  }

  function setSearchQuery(query) {
    searchQuery.value = query
    currentPage.value = 1
  }

  return {
    products,
    allProducts,
    categories,
    loading,
    error,
    currentPage,
    totalItems,
    totalPages,
    searchQuery,
    filteredProducts,
    fetchProducts,
    fetchCategories,
    createProduct,
    setSearchQuery,
  }
})
