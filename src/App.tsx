import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FavoriteProvider } from "./context/FavoriteContext";
import { AuthProvider } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import FavoritePage from "./pages/FavoritePage";
// import CheckoutPage from "./pages/CheckoutPage";
import ThankYouPage from "./pages/ThankYouPage";
import StoresPage from "./pages/StoresPage";
import StoreDetailPage from "./pages/StoreDetailPage";
import ProfileLayout from "./pages/ProfileLayout";
import Overview from "./pages/profile/Overview";
import Settings from "./pages/profile/Settings";
import Stores from "./pages/profile/Stores";
import Products from "./pages/profile/Products";
import AddStore from "./pages/profile/AddStore";
import AddProduct from "./pages/profile/AddProduct";
import LoginPage from "./pages/LoginPage";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminPanelPage from "./pages/AdminPanelPage";
import RegisterPage from "./pages/RegisterPage";
import PublicRoute from "./components/PublicRoute";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {

  return(<QueryClientProvider client={queryClient}>
     <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_CLIENT_ID}>
    
      <AuthProvider>
        <LanguageProvider>
          <FavoriteProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/products/:id" element={<ProductDetailPage />} />
                    <Route path="/favorite" element={<FavoritePage />} />
                    {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
                    <Route path="/thank-you" element={<ThankYouPage />} />
                    <Route path="/stores" element={<StoresPage />} />
                    <Route path="/stores/:id" element={<StoreDetailPage />} />

                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <ProfileLayout />
                        </ProtectedRoute>
                      }
                    >
                      <Route path="stores" element={<Stores />} />
                      <Route path="stores/edit/:id" element={<AddStore />} />
                      <Route path="products" element={<Products />} />
                      <Route path="products/edit/:id" element={<AddProduct />} />                    
                      <Route path="add-product" element={<AddProduct />} />
                      <Route path="add-store" element={<AddStore />} />
                      <Route path="settings" element={<Settings />} />
                      <Route index element={<Overview />} />
                    </Route>
                
                
                  
                    <Route
                      path="/admin-panel"
                      element={
                        <ProtectedRoute requiredRoles="admin">
                          <AdminPanelPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/register" element={
                      <PublicRoute>
                        <RegisterPage />
                      </PublicRoute>
                    } />
                    <Route path="/login" element={
                      <PublicRoute>
                        <LoginPage />
                      </PublicRoute>
                    } />
                    <Route path="/unauthorized" element={<UnauthorizedPage />} />
                    <Route path="*" element={<NotFound />} />
                  </Route>
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </FavoriteProvider>
        </LanguageProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </QueryClientProvider>)
}



export default App;
