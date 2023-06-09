import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import OrderDetails from "./pages/OrderDetails";
import CreatePancake from "./pages/CreatePancake";

function App() {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route element={<Home />} path="/" />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order/:orderNumber" element={<OrderDetails />} />
        <Route path="/order/:orderNumber/pancake" element={<CreatePancake />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
