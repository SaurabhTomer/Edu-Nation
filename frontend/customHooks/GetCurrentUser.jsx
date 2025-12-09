import axios from "axios";
import  { useEffect } from "react";
import { serverUrl } from "../src/App";
import { useDispatch} from 'react-redux'
import { setUserData } from "../src/redux/userSlice.js";

const GetCurrentUser = () => {
    //dispatch to set data
    const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });

        //set value in userslice and store
        dispatch(setUserData(result.data))
      } catch (error) {
        console.log(`Get current user error , ${error}`);

        // if error comes then again set null in user data
        dispatch(setUserData(null))
      }
    };
    fetchUser();
  }, []);
};

export default GetCurrentUser;
