const Router = require("@koa/router");
const deviceController = require("../controllers/deviceController");
const router = new Router();

router.get("/", deviceController.getAll);

router.post("/", deviceController.createDevice);

module.exports = router;
