import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import {Header} from './widgets/Header'
import { ProductPage } from "./pages/ProductPage";


export default function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/product/:id" element={<ProductPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}
