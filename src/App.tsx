import { useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "./layouts/AdminLayout";
import { Dashboard } from "./pages/Dashboard";
import { Users } from "./pages/Users";
import { Plans } from "./pages/Plans";
import { SystemHealth } from "./pages/SystemHealth";
import { Evaluations } from "./pages/Evaluations";
import { Profile } from "./pages/Profile";
import { SettingsPage } from "./pages/Settings";
import { Billing } from "./pages/Billing";
import { ForgotPassword } from "./pages/ForgotPassword";
import { CreateAccount } from "./pages/CreateAccount";
import { LoginPage } from "./pages/Login";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    localStorage.getItem("toknow_auth") === "true" &&
    Boolean(localStorage.getItem("toknow_token"))
  );

  const handleLogin = useCallback(() => {
    localStorage.setItem("toknow_auth", "true");
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("toknow_token");
    localStorage.removeItem("toknow_auth");
    setIsAuthenticated(false);
  }, []);

  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage onLoginSuccess={handleLogin} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route element={<AdminLayout onLogout={handleLogout} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/health" element={<SystemHealth />} />
          <Route path="/evaluations" element={<Evaluations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
