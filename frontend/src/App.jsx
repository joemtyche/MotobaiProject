import "./App.css";
import Header from "./Components/Header/Header.jsx";
import Accounts from "./Components/Pages/Customers/Accounts.jsx";
import WalkIn from "./Components/Pages/Customers/WalkIn";
import Products from "./Components/Pages/Product/Products";
import Inventory from "./Components/Pages/Inventory/Inventory";
import StockLogs from "./Components/Pages/Inventory/StockLogs.jsx";
import StockOutLogs from "./Components/Pages/Inventory/StockOutLogs.jsx";
import Orders from "./Components/Pages/Orders/Orders";
import OrderHistory from "./Components/Pages/Orders/OrderHistory";
import Login from "./Components/Pages/Authentication/Login.jsx";
import Register from "./Components/Pages/Authentication/Register.jsx";
import Suppliers from "./Components/Pages/Suppliers/Suppliers";
import Employees from "./Components/Pages/Employees/Employees";
import NotFound from "./Components/Pages/NotFound/NotFound";
import { Route, Routes, Navigate } from "react-router-dom";
import Container from "./Components/Container.jsx";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <>
      <Container>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/accounts" element={
            <ProtectedRoute>
              <Accounts />
            </ProtectedRoute>
          } />

          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />

          <Route path="/suppliers" element={
            <ProtectedRoute>
              <Suppliers />
            </ProtectedRoute>
          } />

          <Route path="/employees" element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          } />

          <Route path="/inventory" element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          } />

          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />

          <Route path="/orderList" element={
            <ProtectedRoute>
              <OrderHistory />
            </ProtectedRoute>
          } />

          <Route path="/walkIn" element={
            <ProtectedRoute>
              <WalkIn />
            </ProtectedRoute>
          } />

          <Route path="/stockinlogs" element={
            <ProtectedRoute>
              <StockLogs />
            </ProtectedRoute>
          } />

          <Route path="/stockoutlogs" element={
            <ProtectedRoute>
              <StockOutLogs />
            </ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/login" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
