import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import SynthsPage from "@/pages/synths.tsx";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import ProtectedRoute from "./components/protectedRoute";
import ComparePage from "./pages/compare";
import Privacy from "./pages/privacy";
import AuthRoute from "./components/authRoute";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<SynthsPage />} path="/synths" />
      <Route element={<ComparePage />} path="/compare" />
      <Route
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
        path="/dashboard"
      />
      <Route
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
        path="/login"
      />
      <Route
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
        path="/register"
      />
      <Route element={<Privacy />} path="/privacy" />
    </Routes>
  );
}

export default App;
