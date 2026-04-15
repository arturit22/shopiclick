import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { Header } from './widgets/Header'
import { ProductPage } from './pages/ProductPage'
import { Toaster } from 'react-hot-toast'

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: { borderRadius: '12px', padding: '12px 16px' },
        }}
      />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  )
}
