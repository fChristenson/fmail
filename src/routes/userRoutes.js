const { Router } = require("express");
const catchExceptions = require("../lib/utils/catchExceptions");
const userIsLoggedIn = require("../lib/utils/userIsLoggedIn");
const { userService } = require("../lib/services");
const router = Router();

router.post(
  "/api/v1/users",
  catchExceptions(async (req, res) => {
    const { email, password } = req.body;
    const user = await userService.registerUser(email, password);
    req.session.userId = user.id;
    res.end();
  })
);

router.get(
  "/api/v1/users/logged-in",
  userIsLoggedIn,
  catchExceptions(async (req, res) => {
    res.end();
  })
);

module.exports = router;
