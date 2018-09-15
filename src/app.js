const express = require("express");
const path = require("path");
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const { emailRoutes, userRoutes } = require("./routes");
const logger = require("./lib/utils/logger");
const app = express();

app.disable("x-powered-by");

app.use(
  session({
    store: new RedisStore({
      port: process.env.REDIS_PORT || "6379",
      host: process.env.REDIS_HOST || "localhost"
    }),
    secret: process.env.SESSION_SECRET || "secret",
    name: "session",
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      maxAge: 3600000, // 60 * 60 * 1000
      httpOnly: true,
      secure: true
    }
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "dist")));
app.use("/", emailRoutes, userRoutes);

app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});

app.use((error, req, res, next) => {
  logger.error(error);
  res.status(error.status || 500).json({ error: error.message });
});

module.exports = app;
