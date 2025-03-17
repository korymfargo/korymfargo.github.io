import { Navigate, Route, Routes } from "react-router-dom";
import Login from "@pages/Login";
import Match from "@pages/Match";
import Search from "@pages/Search";
import RouteGuard from "@components/RouteGuard";
import { useAPIGuard } from "@utils";

function App() {
  useAPIGuard();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Protected Routes */}
      <Route
        path="/search"
        element={
          <RouteGuard redirectTo="/login">
            <Search />
          </RouteGuard>
        }
      />

      <Route
        path="/match"
        element={
          <RouteGuard redirectTo="/login">
            <Match />
          </RouteGuard>
        }
      />
    </Routes>
  );
}

export default App;
