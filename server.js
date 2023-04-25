const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
app.use(router);

const authTokenSecret = "secret1";
const accessTokenSecret = "secret2";

const users = [
  {
    id: "101",
    firstName: "Supakrit",
    lastName: "Jitklang",
    dob: new Date("1997-01-03"),
    favAnime: ["DR.Stone 🪨 🌕", "Steins;Gate ⏳", "Hell Paradise 🥷🏼"],
    username: "fluke",
    password: "fluke",
  },
];

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};

const signAccessToken = (payload) => {
  return jwt.sign(payload, accessTokenSecret, { expiresIn: 60 });
};

router.get("/", (req, res) => {
  res.send("NEXT-AUTH-BOILERPLATE-API");
});

router.get("/profile", authenticateJWT, (req, res) => {
  const { userId } = req.user;

  const user = users.find((user) => user.id === userId);
  res.status(200).json({ user });
});

router.post("/token", (req, res) => {
  const { authToken } = req.body;

  jwt.verify(authToken, authTokenSecret, (err, user) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    const payload = { userId: user.userId };
    res.status(200).json({ accessToken: signAccessToken(payload) });
  });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user)
    throw res.status(401).json({ message: "username or password invalid" });

  const payload = { userId: user.id };
  const authToken = jwt.sign(payload, authTokenSecret, { expiresIn: "7 days" });
  const accessToken = signAccessToken(payload);
  res.status(200).json({ accessToken, authToken, user });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("server start at port " + PORT);
});
