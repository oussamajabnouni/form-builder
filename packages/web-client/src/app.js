import React from "react";
import { useAuth } from "./context/auth-context";
import { FullPageSpinner } from "./components/lib";
import { Routes, Route } from "react-router-dom";
import { FormScreen } from "./screens/form/index";
const AuthenticatedApp = React.lazy(() => import("./authenticated-app"));
const UnauthenticatedApp = React.lazy(() => import("./unauthenticated-app"));

function App() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      <Routes>
        <Route
          path="*"
          element={user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        />
        <Route path="/form/:id" element={<FormScreen />} />
      </Routes>
    </React.Suspense>
  );
}

export { App };
