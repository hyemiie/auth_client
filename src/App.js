import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth"; // import provider
import AuthDemo from './Auth';
import Dashboard from './Dashboard';
import AuthCallback from './GoogleAuth/GoogleAuth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthDemo />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
