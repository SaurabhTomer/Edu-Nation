import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/HOME";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {ToastContainer} from 'react-toastify';
import GetCurrentUser from "../customHooks/GetCurrentUser";
import { useSelector } from "react-redux";
import Profile from "./pages/Profile";
import ForgetPassword from "./pages/ForgetPassword";



 export const serverUrl = "http://localhost:8000"

const App = () => {

  // when we comes to home page then this hook will run
  GetCurrentUser()
  const {userData} = useSelector(state => state.user)


  return (
    <>
    <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={ !userData ?   <Signup /> : <Navigate to={"/"} /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={ userData ? <Profile /> : <Navigate to={"/signup"} /> } />
        <Route path="/forget" element={ userData ? <ForgetPassword /> : <Navigate to={"/"} /> } />
        
      </Routes>
    </>
  );
};

export default App;
