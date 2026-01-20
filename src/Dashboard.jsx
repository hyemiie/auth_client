import { LogOutIcon, ShieldIcon } from "lucide-react";
import { useAuth } from "./hooks/useAuth";
import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ email, loading, authLabels = [], setupMFA }) => {
  const { user, logout } = useAuth();
  console.log("user dashboad", user)
  const navigate =useNavigate()
 

   useEffect(() => {
    if (!user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]); 


   if (user === undefined) {
    return <div>Loading dashboard...</div>;
  }

  const resolvedAuthLabels =
    authLabels.length > 0 ? authLabels : ["Google OAuth"];

 return (
      <div className="dashboard-container">
        <div className="dashboard-card">
          <div className="dashboard-header">
            <div>
              <h1>Dashboard</h1>
              <p className="subtitle">Welcome back, {user?.email || email}!</p>
            </div>
            <button onClick={logout} className="btn btn-danger">
              <LogOutIcon />
              Logout
            </button>
          </div>

        

          <div className="grid">
            <div className="info-card">
              <h3>Your Details</h3>
              <div className="info-item">
                <div className="info-label">Email:</div>
                <div className="info-value">{user?.email || email}</div>
              </div>
              <div className="info-item">
                <div className="info-label">Auth Method:</div>
                <div className="info-value">
<span>
  {authLabels.length > 0 ? authLabels.join(" + ") : "Unknown Auth"}
</span>

                </div>
              </div>
              {user?.username && (
                <div className="info-item">
                  <div className="info-label">Name:</div>
                  <div className="info-value">{user.username}</div>
                </div>
              )}
            </div>

            <div className="info-card">
              <h3>Security</h3>
              <button
                onClick={setupMFA}
                disabled={loading}
                className="btn btn-primary"
              >
                <ShieldIcon />
                {loading ? 'Setting up...' : 'Setup 2FA (TOTP)'}
              </button>
              <p className="input-hint" style={{textAlign: 'center', marginTop: '0.5rem'}}>
                Add an extra layer of security
              </p>
            </div>
          </div>

          <div className="features-box">
            <h4>Authentication Features Demonstrated:</h4>
            <ul>
              <li>✓ JWT-based authentication</li>
              <li>✓ Google OAuth 2.0 integration</li>
              <li>✓ TOTP (Time-based One-Time Password) 2FA</li>
              <li>✓ Secure password hashing with bcrypt</li>
              <li>✓ Token-based session management</li>
            </ul>
          </div>
        </div>
      </div>
    );
}

export default Dashboard

