import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../context/CurrentUserContext";

export default function ProtectedRoute({ element: Component, ...props }) {
  const { loggeIn } = useContext(CurrentUserContext);

  return loggeIn ? <Component {...props} /> : <Navigate to="/" replace />;
}
