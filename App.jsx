import { BrowserRouter, Routes, Route } from "react-router-dom";
import CashierRoute from "./CashierManagement/Cashierroutees/AppRoutes";
import Register from "./WelcomePage/UserAuthentication/Register";
import Login from "./WelcomePage/UserAuthentication/Login";
import LandingPage from "./WelcomePage/LandingPage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main/*" element={<CashierRoute />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;