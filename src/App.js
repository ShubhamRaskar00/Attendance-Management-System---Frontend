import "./assets/style/App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import MainPage from "./pages/MainPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route
            path="/home/*"
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>Not found</div>} />
        </Routes>
      </Router>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
