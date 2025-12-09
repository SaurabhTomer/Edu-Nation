import axios from "axios";
import React, { useEffect } from "react";
import { serverUrl } from "../src/App";

const GetCurrentUser = () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/user/getcurrentuser`, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(`Get current user error , ${error}`);
      }
    };
  }, []);
};

export default GetCurrentUser;
