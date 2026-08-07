import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Page/Home";
import Log from "./Page/Log";
import Login from "./Page/Login";
import Register from "./Page/Register";
import ProtectedRoute from "./Components/auth/ProtectedRoute";
import MainLayout from "./Layouts/MainLayout";
// import Settings from "./Page/Setting";
import ForgetPassword from "./Page/ForgetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected pages */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Home />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/log"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Log />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Settings />
              </MainLayout>
            </ProtectedRoute>
          }
        /> */}

        {/* Public pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
