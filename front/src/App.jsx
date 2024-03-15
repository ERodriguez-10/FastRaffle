import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Details from "./pages/Details/Details.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/success" element={<Dashboard />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
