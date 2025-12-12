import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { IoArrowBackSharp } from "react-icons/io5";

function Profile() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <IoArrowBackSharp onClick={navigate("/home")} />

        <div>
          {userData?.photoUrl ? (
            <img src={userData?.photoUrl} alt="" />
          ) : (
            <div>{userData?.name.slice(0, 1).toUppercase()}</div>
          )}
          <h2> {userData.name} </h2>
          <p> {userData.role} </p>
        </div>

        <div>

            <div>
              <span>Email : </span>
              <span> {userData.email} </span>
            </div>

            <div>
              <span>Bio : </span>
              <span> {userData.description} </span>
            </div>

            <div>
              <span>Enrolled Courses : </span>
              <span> {userData.enrolledCourses.length} </span>
            </div>

        </div>
        <div>
          <button>
            Edit Profile 
          </button>
        </div>

      </div>
    </div>
  );
}

export default Profile;
