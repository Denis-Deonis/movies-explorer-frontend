import { Navigate } from "react-router-dom";

export default function AuthorizedRoute({
  component: Component,
  ...props
}) {
  return props.isLoggedIn ? (
    <Navigate to="/" replace />
  ) : (
    <Component {...props} replace />
  );
}
