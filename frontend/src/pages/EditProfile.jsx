import { IoArrowBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { toast } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

function EditProfile() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [name, setName] = useState(userData.name || "");
  const [description, setDescription] = useState(userData.description || "");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  //image is send in formdata only
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);


  //handle edit function
  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/profile`,
        { formData },
        { withCredentials: true }
      );
      dispatch(setUserData(result.data))
      setLoading(false)
      navigate("/")
      toast.success("Profile Updated")
    } catch (error) {
        setLoading(false)
        toast.error("Update profile error")
        console.log(error);
        
    }
  };

  return (
    <div>
      <div>
        <IoArrowBackSharp onClick={() => navigate("/profile")} />
        <h2>Edit Profile</h2>

        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            {userData?.photoUrl ? (
              <img src={userData?.photoUrl} alt="" />
            ) : (
              <div>{userData?.name.slice(0, 1).toUppercase()}</div>
            )}
          </div>

          <div>
            <label htmlFor="image">Select Avatar</label>
            <input
              type="file"
              id="image"
              name="photoUrl"
              placeholder="PhotoUrl"
              accept="image/*"
              onChange={(e) => setPhotoUrl(e.target.files[0])}
            />
          </div>

          <div>
            <label htmlFor="name">UserName</label>
            <input
              type="text"
              id="name"
              placeholder={userData.name}
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>

          {/* email cannot be chnaged thats why it is readonly */}
          <div>
            <label> Email </label>
            <input type="text" readOnly placeholder={userData.email} />
          </div>

          <div>
            <label> Bio : </label>
            <textPath
              name="description"
              placeholder="tell us about yourself"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            />
          </div>

          <button onClick={handleEditProfile}  >{loading ? <ClipLoader size={30} color="white" /> : "Save Changes" }</button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
