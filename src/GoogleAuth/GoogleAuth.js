import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../hooks/useAuth";

function AuthCallback() {
  // const [user, setUser] = useState(null)
  const navigate = useNavigate();
  const hasProcessed = useRef(false);


  const { login } = useAuth();

useEffect(() => {
  if (hasProcessed.current) return;
  hasProcessed.current = true;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    navigate("/login?error=auth_failed", { replace: true });
    return;
  }

  try {
    const decoded = jwtDecode(token);

    login(decoded.user); 

    navigate("/dashboard", { replace: true });
  } catch (e) {
    navigate("/login?error=invalid_token", { replace: true });
  }
}, [login, navigate]);


  return <p>Signing you in...</p>;
}

export default AuthCallback;