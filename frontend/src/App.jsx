import { Routes, Route } from "react-router-dom";
import Home from "./pages/HOME";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {ToastContainer} from 'react-toastify';
import GetCurrentUser from "../customHooks/GetCurrentUser";


 export const serverUrl = "http://localhost:8000"

const App = () => {

  // when we comes to home page then this hook will run
  GetCurrentUser()

  return (
    <>
    <ToastContainer />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
      </Routes>
    </>
  );
};

export default App;
