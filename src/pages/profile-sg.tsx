import React from "react";
import useUser from "@/hooks/useUser";
import useProfile from "@/hooks/useProfile";

type Props = {};

const ProfileSg = (props: Props) => {
  //   const { user, isLoading } = useUser({ redirectTo: "/login" });
  const { profile } = useProfile();

  return <div>ProfileSg {JSON.stringify(profile)}</div>;
};

export default ProfileSg;
