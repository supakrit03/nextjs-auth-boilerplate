import { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";

import { sessionOptions } from "@/lib/iron-session";
import { loginApi } from "@/api/login";

import type { User } from "@/types/User";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  try {
    const { authToken, accessToken, userId } = await loginApi({
      username,
      password,
    });

    const user: User = { isLoggedIn: true, userId, accessToken, authToken };
    console.log({ session: user });
    req.session.user = user;
    await req.session.save();

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
