import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'

import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Home from './pages/Home/Home.jsx'
import Categories from './pages/Categories.jsx'
import Products from './pages/Products.jsx'
import ProductDetails from './pages/ProductDetails.jsx'

import RoleDashboard from './pages/RoleDashboard.jsx'
import Cart from './pages/Cart.jsx'
import Wishlist from './pages/Wishlist.jsx'
import Orders from './pages/Orders.jsx'
import Profile from './pages/Profile.jsx'
import PaymentPage from './pages/PaymentPage.jsx'
import SearchResults from './pages/SearchResults.jsx'
import Deals from './pages/Deals.jsx'

import ProtectedRoute from './routes/ProtectedRoute.jsx'
import InvoicePreview from './pages/InvoicePreview.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <Header />

      <main className="min-h-[calc(100vh-200px)]">

        <Routes>

          {/* AUTH */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* HOME */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* CATEGORIES */}
          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Categories />
              </ProtectedRoute>
            }
          />

          {/* PRODUCTS (CATEGORY WISE) */}
          <Route
            path="/products/:categoryId"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Products />
              </ProtectedRoute>
            }
          />

          {/* PRODUCT DETAILS */}
          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          {/* CART */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          {/* WISHLIST */}
          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />

          {/* ORDERS */}
          <Route
            path="/orders"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Orders />
              </ProtectedRoute>
            }
          />

            <Route
             path="/invoice/:invoiceNo"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <InvoicePreview/>
              </ProtectedRoute>
            }
          />

          

          {/* SEARCH */}
          <Route
            path="/search"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <SearchResults />
              </ProtectedRoute>
            }
          />

          {/* DEALS */}
          <Route
            path="/deals"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Deals />
              </ProtectedRoute>
            }
          />

          {/* PROFILE */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* PAYMENT */}
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route
            path="/superadmin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <RoleDashboard role="superadmin" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <RoleDashboard role="admin" />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cashier/dashboard"
            element={
              <ProtectedRoute allowedRoles={['cashier']}>
                <RoleDashboard role="cashier" />
              </ProtectedRoute>
            }
          />

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/login" replace />} />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App