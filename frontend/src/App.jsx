import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import RoleHeader from './components/headers/RoleHeader.jsx'
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

// Wholesaler Imports
import WholesalerDashboard from './pages/wholesaler/WholesalerDashboard.jsx'
import WholesalerProducts from './pages/wholesaler/WholesalerProducts.jsx'
import WholesalerOrders from './pages/wholesaler/WholesalerOrders.jsx'
import WholesalerHome from './pages/wholesaler/Home/Home.jsx'
import WholesalerRegister from './pages/wholesaler/WholesalerRegister.jsx'
import WholesalerLogin from './pages/wholesaler/WholesalerLogin.jsx'
import WholesaleCart from './pages/wholesaler/WholesaleCart.jsx'
import WholesalerPayment from './pages/wholesaler/WholesalePayment.jsx'
import WholesaleInvoicePreview from './pages/wholesaler/InvoicePreview.jsx'
import WholesalerWishlist from './pages/wholesaler/WholesalerWishlist.jsx'
import WholesalerProfile from './pages/wholesaler/WholesalerProfile.jsx'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster position="top-right" />
      <RoleHeader />

      <main className="min-h-[calc(100vh-200px)]">
        <Routes>
          // ==================== PUBLIC ROUTES ====================
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/wholesaler-login" element={<WholesalerLogin />} />
          <Route path="/wholesaler-register" element={<WholesalerRegister />} />

          // ==================== USER ROUTES ====================
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route
            path="/categories"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Categories />
              </ProtectedRoute>
            }
          />

          <Route
            path="/products/:categoryId"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Products />
              </ProtectedRoute>
            }
          />

          <Route
            path="/product/:productId"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <ProductDetails />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Wishlist />
              </ProtectedRoute>
            }
          />

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
                <InvoicePreview />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <SearchResults />
              </ProtectedRoute>
            }
          />

          <Route
            path="/deals"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <Deals />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={['user', 'wholesaler']}>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          // ==================== WHOLESALER ROUTES ====================
          <Route
            path="/wholesaler/dashboard"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesaler/home"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerHome />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesaler/products"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerProducts />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesaler/orders"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerOrders />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesaler/wishlist"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerWishlist />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesalercart"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesaleCart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesalerpayment"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerPayment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/wholesaler/profile"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/wholesaler/invoice/:invoiceNo"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesaleInvoicePreview />
              </ProtectedRoute>
            }
          />

          // ==================== ADMIN ROUTES ====================
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

          // ==================== FALLBACK ROUTE ====================
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  )
}

export default App