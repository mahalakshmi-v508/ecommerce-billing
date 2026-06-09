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


import WholesalerDashboard from './pages/wholesaler/WholesalerDashboard.jsx'
import WholesalerProducts from './pages/wholesaler/WholesalerProducts.jsx'
import WholesalerOrders from './pages/wholesaler/WholesalerOrders.jsx'

import WholesalerHome from './pages/wholesaler/Home/Home.jsx'

import WholesalerRegister from './pages/wholesaler/WholesalerRegister.jsx'
import WholesalerLogin from './pages/wholesaler/WholesalerLogin.jsx'
import WholesaleCart from './pages/wholesaler/WholesaleCart.jsx'
import WholesalerPayment from './pages/wholesaler/WholesalePayment.jsx'
import WholesaleInvoicePreview from './pages/wholesaler/InvoicePreview.jsx'
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
          <Route
            path="/wholesaler/home"
            element={
              <ProtectedRoute allowedRoles={['wholesaler']}>
                <WholesalerHome />
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
                <InvoicePreview />
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
          <Route
            path="/wholesaler-register"
            element={<WholesalerRegister />}
          />

          <Route
            path="/wholesaler-login"
            element={<WholesalerLogin />}
          />
          <Route
            path="/wholesalercart"
            element={<WholesaleCart />}
          />
          <Route
            path="/wholesalerpayment"
            element={<WholesalerPayment />}
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

          {/* whole saler */}
          {/* 🆕 WHOLESALER ROUTES (இத அப்படியே காப்பி பண்ணி போடுங்க) */}
          <Route
            path="/wholesaler/dashboard"
            element={
              // 🔽 'user' role-aiyum inga inner elements paaka allow panrom
              <ProtectedRoute allowedRoles={['wholesaler', 'user']}>
                <WholesalerDashboard />
              </ProtectedRoute>
            }
          />

<Route
  path="/wholesaler/products"
  element={
    <ProtectedRoute allowedRoles={['wholesaler', 'user']}> {/* 👈 'user' ஐச் சேர்க்கவும் */}
      <WholesalerProducts />
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
<Route
  path="/wholesaler/orders"
  element={
    <ProtectedRoute allowedRoles={['wholesaler', 'user']}> {/* 👈 'user' ஐச் சேர்க்கவும் */}
      <WholesalerOrders />
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