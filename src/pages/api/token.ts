import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { refreshTokenApi } from "@/api/refreshToken";

async function refreshTokenRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    const { authToken } = req.session.user;
    const { accessToken } = await refreshTokenApi(authToken);

    req.session.user.accessToken = accessToken;
    await req.session.save();

    return res.status(200).json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    return res.json({
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(refreshTokenRoute, sessionOptions);
