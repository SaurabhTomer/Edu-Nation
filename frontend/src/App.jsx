import { Routes, Route } from "react-router-dom";
import Home from "./pages/HOME";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ForgetPassword from './pages/ForgetPassword';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
      </Routes>
    </>
  );
};

export default App;
