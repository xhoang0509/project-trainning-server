const Router = require("@koa/router");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

const router = new Router();

router.get("/", userController.getAll);

router.post("/login", authController.login);

router.post("/register", authController.register);

module.exports = router;
