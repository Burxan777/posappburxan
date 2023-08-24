import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import CartPage from './Components/pages/CartPage'
import HomePage from './Components/pages/HomePage'
import BillPage from './Components/pages/BillPage'
import CustomerPage from "./Components/pages/CustomerPage";
import StatisticPage from "./Components/pages/StatisticPage";
import Register from "./Components/pages/auth/Register";
import Login from "./Components/pages/auth/Login";
import { ProductPage } from "./Components/pages/ProductPage";
import { useEffect } from "react";
import { useSelector } from "react-redux";





function App() {

  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);



  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
      <RouteControl>
        <HomePage />
      </RouteControl>} />


      <Route path="/cart" element={
        <RouteControl>
      <CartPage />
      </RouteControl>} />


      <Route path="/bills" element={
      <RouteControl>
        <BillPage />
        </RouteControl>} />
      <Route path="/customers" element={
      <RouteControl>
        <CustomerPage />
        </RouteControl>} />

      <Route path="/statistic" element={
      <RouteControl>
        <StatisticPage />
        </RouteControl>} />

      <Route path="/products" element={
      <RouteControl>
        <ProductPage />
        </RouteControl>} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;

export const RouteControl =({children}) =>{
  if(localStorage.getItem("posUser")){
    return children
  }else{
    return <Navigate to="/login"/>
  }
}
