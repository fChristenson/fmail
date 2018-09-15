const { Router } = require("express");
const catchExceptions = require("../lib/utils/catchExceptions");
const validateIncomingUserRequest = require("../lib/services/userService/validateIncomingUserRequest");
const userIsLoggedIn = require("../lib/utils/userIsLoggedIn");
const { userService } = require("../lib/services");
const UserView = require("../lib/services/userService/UserView");
const router = Router();

router.post(
  "/api/v1/users",
  validateIncomingUserRequest,
  catchExceptions(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.registerUser(email, password);
    req.session.userId = user.id;
    res.json(UserView(user));
  })
);

router.post(
  "/api/v1/login",
  validateIncomingUserRequest,
  catchExceptions(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.login(email, password);
    req.session.userId = user.id;
    res.json(UserView(user));
  })
);

router.get(
  "/api/v1/logout",
  catchExceptions(async (req, res) => {
    await req.session.destroy();
    res.end();
  })
);

router.get(
  "/api/v1/users/logged-in",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    const user = await userService.getUser(req.session.userId);
    res.json(UserView(user));
  })
);

module.exports = router;
