import { ref, onMounted, watch } from 'vue'

export function useTheme() {
  const isDark = ref(true) // Default to dark mode based on initial requirement

  onMounted(() => {
    // Check local storage or system preference
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'light') {
      isDark.value = false
    } else if (storedTheme === 'dark') {
      isDark.value = true
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    updateTheme()
  })

  function toggleTheme() {
    isDark.value = !isDark.value
    updateTheme()
  }

  function updateTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }

  return {
    isDark,
    toggleTheme
  }
}
