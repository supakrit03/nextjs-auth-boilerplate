import { useAppDispatch } from "@/redux/hook";
import Router from "next/router";
import React from "react";

import { setAccessToken } from "@/auth/authSlice";
import { User } from "@/types/User";

type Props = {};

const Login = (props: Props) => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: any) => {
    e.preventDefault();

    const payload = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((user: User) => {
        dispatch(setAccessToken(user.accessToken));
        Router.push("/profile-sg");
      });
  };

  return (
    <section>
      <form onSubmit={onSubmit}>
        <input type="text" name="username" />
        <input type="password" name="password" />

        <button>Login</button>

        {/* <div>{authState.accessToken && "Logged In !!"}</div> */}
      </form>
    </section>
  );
};

export default Login;
