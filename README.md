# 🛒 ShopiClick

Современное e-commerce приложение на React с продуманной архитектурой, тестами и UX.

---

## 🚀 Demo

👉 https://shopiclick.vercel.app/

---

## 🧠 О проекте

ShopiClick — это интернет-магазин с фокусом на:

- чистую архитектуру
- удобный UX
- тестируемость

Проект реализован как production-ready приложение с использованием Redux для управления состоянием и покрыт unit и integration тестами.

---

## ✨ Основные фичи

### 🛍️ Каталог
- список товаров
- переход на страницу товара

### 🔎 Поиск
- поиск товаров
- debounce для оптимизации

### 🛒 Корзина
- добавление / удаление товаров
- изменение количества
- подсчёт общей суммы и количества
- сохранение состояния (persist)

### 🧩 Mini Cart (в Header)
- отображение товаров без перехода
- удаление товара прямо в dropdown
- закрытие:
  - по клику вне
  - по Escape
  - при смене страницы
- анимации (framer-motion)

### ⚡ UX
- skeleton loading
- toast уведомления
- плавные анимации

---

## 🧪 Тестирование

- **Unit тесты**
  - reducers
  - selectors

- **Integration тесты**
  - компоненты
  - пользовательские сценарии (клики, изменение состояния)

---

## 🏗️ Архитектура

- `features/` — бизнес-логика (Redux slices)
- `entities/` — доменные модели
- `widgets/` — UI-блоки (Header, Cart и т.д.)
- `shared/` — переиспользуемые вещи

👉 бизнес-логика изолирована в Redux, UI остаётся максимально “чистым”

---

## 🛠️ Стек

- React
- TypeScript
- Redux Toolkit
- React Router
- Vite
- Tailwind CSS
- Framer Motion
- Vitest + Testing Library
- ESLint + Prettier

---

## 📦 Установка и запуск

```bash
git clone https://github.com/your-username/shopiclick.git
cd shopiclick

npm install
npm run dev
