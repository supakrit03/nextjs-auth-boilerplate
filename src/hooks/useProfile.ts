import axios from "@/lib/axios";
import { useEffect, useState } from "react";

type Props = {};

type UserProfileResponse = {
  id: string;
  firstName: string;
  lastName: string;
  dob: string;
  favAnime: string[];
  username: string;
  password: string;
};

const useProfile = () => {
  const [profile, setProfile] = useState<UserProfileResponse>();

  useEffect(() => {
    axios.get<{ user: UserProfileResponse }>("/profile").then((res) => {
      setProfile(res.data.user);
    });
  }, []);

  return { profile };
};

export default useProfile;
