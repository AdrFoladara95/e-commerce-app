import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Startup from "../pages/Startup";
import Onboarding from "../pages/OnboardingPage";
import GetStarted from "../pages/GetStarted";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import ChangePassword from "../pages/auth/ChangePassword";

import Home from "../pages/Home";
import TrendingProductsPage from "../pages/TrendingProductsPage";
import ProductDetails from "../pages/ProductDetails";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import Wishlist from "../pages/Wishlist";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import Payment from "../pages/Payment";
import OrderSuccess from "../pages/OrderSuccess";
import Orders from "../pages/Orders";

import Help from "../pages/Help";
import OrdersDelivery from "../pages/help/OrdersDelivery";
import Payments from "../pages/help/Payments";
import ShippingReturns from "../pages/help/ShippingReturns";
import GeneralQuestions from "../pages/help/GeneralQuestions";
import ChatSupport from "../pages/help/ChatSupport";

import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

function AppRouter() {
  const location = useLocation();

  const [isFreshLaunch, setIsFreshLaunch] = useState(() => {
    return !sessionStorage.getItem("appSessionStarted");
  });

  useEffect(() => {
    if (isFreshLaunch) {
      sessionStorage.setItem("appSessionStarted", "true");
      setIsFreshLaunch(false);
    }
  }, [isFreshLaunch]);

  /*
    If this is a fresh app/browser session and the browser
    restored an old page such as /home, send the user to
    Startup first.
  */
  if (
    isFreshLaunch &&
    location.pathname !== "/" &&
    location.pathname !== "/onboarding" &&
    location.pathname !== "/getstarted"
  ) {
    return <Navigate to="/" replace />;
  }

  return (
    <Routes>
      {/* App Entry */}
      <Route path="/" element={<Startup />} />
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/getstarted" element={<GetStarted />} />

      {/* Public Routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Home />} />

        <Route
          path="/trending-products"
          element={<TrendingProductsPage />}
        />

        <Route
          path="/product-details/:id"
          element={<ProductDetails />}
        />

        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />

        {/* Help & Support */}
        <Route path="/help" element={<Help />} />
        <Route path="/help/orders" element={<OrdersDelivery />} />
        <Route path="/help/payments" element={<Payments />} />
        <Route path="/help/shipping" element={<ShippingReturns />} />
        <Route path="/help/general" element={<GeneralQuestions />} />
        <Route path="/help/chat" element={<ChatSupport />} />
      </Route>

      {/* Unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function AppRoutes() {
  return <AppRouter />;
}