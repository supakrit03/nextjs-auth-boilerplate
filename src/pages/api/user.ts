import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "@/lib/iron-session";
import { NextApiRequest, NextApiResponse } from "next";

async function userRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.session.user) {
    // in a real world application you might read the user id from the session and then do a database request
    // to get more information on the user if needed
    return res.json({
      ...req.session.user,
      isLoggedIn: true,
    });
  } else {
    return res.json({
      isLoggedIn: false,
    });
  }
}

export default withIronSessionApiRoute(userRoute, sessionOptions);
