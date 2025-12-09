import axios from "axios";
import logo from "../assets/logo.jpg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";

function Nav() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showHem, setShowHem] = useState(false);

  //handle log out function
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      console.log("logout successfully");
      toast.success("Logout successfully");
      navigate("/");
    } catch (error) {
      console.log("logout error", error.message);
      toast.error("Logout error");
    }
  };

  return (
    <div>
      <div className="w-full h-[70px] fixed top-0 px-5 py-2.5 flex items-center justify-between bg-[#00000047] z-10">
        {/* logo div */}
        <div className="lg:w-[20%] w-[40%] lg:pl-[50px]">
          <img
            src={logo}
            alt="logo"
            className="w-[60px] rounded-2xl border-2 border-white "
          />
        </div>

        {/* right div */}
        <div>
          {!userData && (
            <IoPersonCircleSharp onClick={() => setShow((prev) => !prev)} />
          )}
          {userData && (
            <div onClick={() => setShow((prev) => !prev)}>
              {/* { userData?.name.slice(0,1).toUpperCase()} */}
            </div>
          )}

          {/* login and logout and dashboard */}
          {/* if user role is educator then show this  */}
          {/* { userData?.role === "educator" && <div>Dashboard</div>} */}
          {/* if userdata is present then show this and that */}
          {!userData ? (
            <span onClick={navigate("/login")}>Login</span>
          ) : (
            <span onClick={handleLogOut}>LogOut</span>
          )}

          {/* when hover on profile icon popup comes */}

          {show && (
            <div>
              <span>My Profile</span>
              <span>My Courses</span>
            </div>
          )}
        </div>

        {/* hamburger icon when screen is small */}
        <RxHamburgerMenu onClick={() => setShowHem((prev) => !prev)} />

        {/* popup  show when click */}
        <div>
          <RxCross1 onClick={() => setShowHem((prev) => !prev)} />

          {!userData && <IoPersonCircleSharp />}
          {userData && (
            <div>{/* { userData?.name.slice(0,1).toUpperCase()} */}</div>
          )}




            <div>My Profile </div>
            <div>My Courses </div>
           {/* { userData?.role === "educator" && <div>Dashboard</div>} */}
            {!userData ? (
            <span onClick={navigate("/login")}>Login</span>
          ) : (
            <span onClick={handleLogOut}>LogOut</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Nav;
