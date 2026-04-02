# ShopVue — Frontend Technical Test

<div align="center">

![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Pinia](https://img.shields.io/badge/Pinia-2.x-FFA000?style=for-the-badge&logo=vue.js&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)

**Platform manajemen produk modern dibangun dengan Vue 3, Pinia, dan TailwindCSS v4.**

</div>

---

## 📋 Daftar Isi

- [Demo Credentials](#-demo-credentials)
- [Tech Stack](#-tech-stack)
- [Fitur](#-fitur)
- [Struktur Proyek](#-struktur-proyek)
- [Instalasi & Menjalankan Lokal](#-instalasi--menjalankan-lokal)
- [Menjalankan dengan Docker](#-menjalankan-dengan-docker)
- [API Reference](#-api-reference)
- [Arsitektur](#-arsitektur)
- [Validasi Form](#-validasi-form)

---

## 🔑 Demo Credentials

```
Email    : john@mail.com
Password : changeme
```

> Tersedia juga tombol **"Isi Otomatis"** di halaman login untuk kemudahan testing.

---

## 🛠 Tech Stack

| Teknologi | Versi | Kegunaan |
|-----------|-------|----------|
| [Vue.js](https://vuejs.org/) | 3.x | Framework frontend utama |
| [Vite](https://vitejs.dev/) | 5.x | Build tool & dev server |
| [Pinia](https://pinia.vuejs.org/) | 2.x | State management |
| [Vue Router](https://router.vuejs.org/) | 4.x | Client-side routing & middleware |
| [TailwindCSS](https://tailwindcss.com/) | 4.x | Utility-first CSS framework |
| [Axios](https://axios-http.com/) | 1.x | HTTP client |
| [SweetAlert2](https://sweetalert2.github.io/) | 11.x | Notifikasi sukses/error |
| [Nginx](https://nginx.org/) | 1.25 | Web server untuk production |
| [Docker](https://www.docker.com/) | - | Containerisasi aplikasi |

---

## ✨ Fitur

### 🔐 Autentikasi
- Form login dengan field **email** dan **password**
- Validasi form secara real-time (required, format email)
- Show/hide password toggle
- JWT token disimpan di `localStorage`
- Auto-redirect ke halaman yang dituju setelah login
- Notifikasi sukses / error menggunakan **SweetAlert2**

### 🛡️ Middleware Auth (Route Guard)
- Rute yang memerlukan autentikasi dilindungi via `router.beforeEach`
- Pengguna yang belum login diarahkan ke `/login` dengan `?redirect=` query param
- Pengguna yang sudah login tidak dapat mengakses halaman login (redirect ke `/products`)
- Axios interceptor otomatis menyertakan `Bearer token` di setiap request
- Jika token 401/expired, user otomatis di-logout dan diarahkan ke login

### 📦 Daftar Produk
- Menampilkan produk dari endpoint `GET /api/v1/products`
- Setiap kartu produk menampilkan: **gambar**, **nama**, **harga**, **kategori**
- Skeleton loading state saat data masih dimuat
- Graceful fallback jika gambar gagal dimuat
- **Search bar** dengan debounce untuk filter produk berdasarkan nama
- **Pagination** dengan navigasi halaman sebelum/berikutnya

### ➕ Tambah Produk
- Form dengan field: **title**, **price**, **description**, **categoryId**, **images**
- Validasi: title (required, max 150 char), price (required, number), categoryId (required)
- Images bersifat opsional, dapat menambah hingga 4 URL gambar
- Setelah submit, produk ditambahkan ke daftar **tanpa reload halaman** (update state lokal)
- Notifikasi sukses/error dengan **SweetAlert2**
- Halaman ini hanya dapat diakses setelah user login

---

## 📁 Struktur Proyek

```
technicaltest-frontend-BTSID/
├── public/                     # Static assets
├── src/
│   ├── components/
│   │   ├── AppNavbar.vue       # Komponen navigasi utama
│   │   ├── ProductCard.vue     # Kartu produk individual
│   │   └── AppPagination.vue   # Komponen paginasi
│   ├── views/
│   │   ├── LoginView.vue       # Halaman login
│   │   ├── ProductsView.vue    # Halaman daftar produk
│   │   ├── CreateProductView.vue # Halaman tambah produk
│   │   └── NotFoundView.vue    # Halaman 404
│   ├── stores/
│   │   ├── auth.js             # Pinia store: autentikasi
│   │   └── products.js         # Pinia store: produk & kategori
│   ├── services/
│   │   └── api.js              # Axios instance + interceptors
│   ├── router/
│   │   └── index.js            # Vue Router + auth middleware
│   ├── App.vue                 # Root component
│   ├── main.js                 # Entry point
│   └── style.css               # Global styles + Tailwind v4
├── Dockerfile                  # Multi-stage Docker build
├── docker-compose.yml          # Docker Compose config
├── nginx.conf                  # Nginx SPA config
├── .dockerignore
├── vite.config.js
└── README.md
```

---

## 🚀 Instalasi & Menjalankan Lokal

### Prasyarat
- **Node.js** >= 18.x
- **npm** >= 9.x

### Langkah-langkah

```bash
# 1. Clone repositori
git clone <URL_REPO>
cd technicaltest-frontend-BTSID

# 2. Install dependencies
npm install

# 3. Jalankan development server
npm run dev
```

Aplikasi akan berjalan di: **http://localhost:5173**

### Build Production

```bash
npm run build
npm run preview
```

---

## 🐳 Menjalankan dengan Docker

### Menggunakan Docker Compose (Direkomendasikan)

```bash
# Build dan jalankan container
docker compose up -d --build

# Lihat logs
docker compose logs -f

# Hentikan container
docker compose down
```

Aplikasi akan berjalan di: **http://localhost:3000**

### Menggunakan Docker CLI

```bash
# Build image
docker build -t shopvue-app .

# Jalankan container
docker run -d \
  --name shopvue-app \
  -p 3000:80 \
  --restart unless-stopped \
  shopvue-app

# Lihat status
docker ps

# Hentikan container
docker stop shopvue-app && docker rm shopvue-app
```

---

## 🌐 API Reference

**Base URL:** `https://api.escuelajs.co/api/v1`

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `POST` | `/auth/login` | Login dan mendapatkan JWT token |
| `GET` | `/auth/profile` | Mendapatkan profil user (requires auth) |
| `POST` | `/auth/refresh-token` | Refresh access token |
| `GET` | `/products?offset=0&limit=8` | Daftar produk dengan paginasi |
| `POST` | `/products` | Membuat produk baru |
| `GET` | `/categories` | Daftar kategori produk |

### Request Body — Login
```json
{
  "email": "john@mail.com",
  "password": "changeme"
}
```

### Request Body — Create Product
```json
{
  "title": "New Product",
  "price": 10,
  "description": "A description",
  "categoryId": 1,
  "images": ["https://placehold.co/600x400"]
}
```

---

## 🏗 Arsitektur

```
┌─────────────────────────────────────────────────┐
│                   Vue 3 App                     │
│                                                 │
│  ┌──────────┐    ┌──────────────────────────┐  │
│  │  Router  │───▶│         Views            │  │
│  │ (Guard)  │    │  Login / Products /      │  │
│  └──────────┘    │  CreateProduct / 404     │  │
│                  └────────────┬─────────────┘  │
│                               │                 │
│  ┌────────────────────────────▼─────────────┐  │
│  │            Pinia Stores                  │  │
│  │     authStore  │  productStore           │  │
│  └────────────────────────────┬─────────────┘  │
│                               │                 │
│  ┌────────────────────────────▼─────────────┐  │
│  │           Axios (api.js)                 │  │
│  │   Request Interceptor (attach token)     │  │
│  │   Response Interceptor (handle 401)      │  │
│  └────────────────────────────┬─────────────┘  │
│                               │                 │
└───────────────────────────────┼─────────────────┘
                                │
                    ┌───────────▼───────────┐
                    │   Platzi Fake API     │
                    │ api.escuelajs.co/v1   │
                    └───────────────────────┘
```

---

## ✅ Validasi Form

### Form Login
| Field | Aturan |
|-------|--------|
| email | Wajib diisi, format email valid |
| password | Wajib diisi |

### Form Tambah Produk
| Field | Aturan |
|-------|--------|
| title | Wajib diisi, maksimal 150 karakter |
| price | Wajib diisi, harus angka positif |
| description | Opsional |
| categoryId | Wajib dipilih |
| images | Opsional, URL gambar (maks 4) |

---

## 👤 Author

**Technical Test Frontend — BTSID**  
Built with ❤️ using Vue 3 + TailwindCSS v4 + Docker
