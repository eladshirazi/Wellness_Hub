import React, { JSX } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import AIRecommendation from "./pages/AIRecommendation";
import Comments from "./pages/Comments";
import Navbar from "./components/Navbar";
import About from "./pages/About";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Redirect the root ("/") to "/login" */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/forum"
            element={
              <PrivateRoute>
                <Forum />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-recommend"
            element={
              <PrivateRoute>
                <AIRecommendation />
              </PrivateRoute>
            }
          />
          <Route
            path="/comments/:postId"
            element={
              <PrivateRoute>
                <Comments />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
