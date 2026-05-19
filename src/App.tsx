import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { LoginPage } from "./pages/Login";
import { Users } from "./pages/Users";
import { Plans } from "./pages/Plans";
import { SystemHealth } from "./pages/SystemHealth";
import { Evaluations } from "./pages/Evaluations";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLogin} />;
  }

  return (
    <Router>
      <Routes>
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/health" element={<SystemHealth />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
