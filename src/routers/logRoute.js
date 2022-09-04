const Router = require("@koa/router");
const logController = require("../controllers/logController");
const router = new Router();

router.get("/", logController.getAll);

router.post("/", logController.createLog);

module.exports = router;
