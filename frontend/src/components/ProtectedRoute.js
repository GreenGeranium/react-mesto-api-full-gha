import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, ...props }) {
  return props.loggedIn ? (
    <Component {...props}></Component>
  ) : (
    <Navigate to="/sign-in" replace></Navigate>
  );
}

export default ProtectedRoute;
