import { Navigate } from "react-router-dom";
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  isTokenExpired,
} from "../authTokens";

function ProtectedRoute({ children }) {
  const accessToken = getAccessToken();
  const refreshToken = getRefreshToken();

  if (!accessToken || !refreshToken || isTokenExpired(refreshToken)) {
    clearAuthTokens();
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
