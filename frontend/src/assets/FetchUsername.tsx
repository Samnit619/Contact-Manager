import { axiosInstance } from "@/pages/Login/axiosInstance";
import { useEffect, useState } from "react";

export interface CurrentUser {
  username: string;
  email: string;
  id: string;
}

const FetchUsername = () => {
  const [UserName, setUserName] = useState("");
  useEffect(() => {
    const getUserName = async () => {
      const res = await axiosInstance.get<CurrentUser>("/users/current");
      setUserName(res.data.username);
    };
    getUserName();
  },[] );
  return { UserName };
};

export default FetchUsername;
