import type { IronSessionOptions } from "iron-session";
import { User } from "@/types/User";

export const sessionOptions: IronSessionOptions = {
  cookieName: "sid",
  password:
    "password1234567890@~password1234567890@~password1234567890@~password1234567890@~",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};

declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}
