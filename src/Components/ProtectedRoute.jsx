import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Route protection component for EventFlow.
 * Enforces authentication and role-based authorization.
 *
 * @param {Object} props
 * @param {Array<string>} [props.allowedRoles] - Roles permitted to access this route (e.g. ['User', 'Faculty', 'Admin'])
 * @param {React.ReactNode} [props.children] - Child elements to render if authorized
 */
function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();

  let user = null;
  try {
    user =
      JSON.parse(localStorage.getItem("currentUser") || "null") ||
      JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    user = null;
  }

  // If not logged in, redirect to login page
  if (!user || !user.role) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  const userRole = String(user.role).trim().toLowerCase();

  // If role-based restrictions are specified, verify user's role
  if (allowedRoles && Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    const normalizedAllowed = allowedRoles.map((r) =>
      String(r).trim().toLowerCase()
    );

    if (!normalizedAllowed.includes(userRole)) {
      // Redirect to user's authorized home according to their role
      if (userRole === "admin") {
        return <Navigate to="/admin" replace />;
      }
      if (userRole === "faculty") {
        return <Navigate to="/faculty" replace />;
      }
      return <Navigate to="/Dashboard" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;
