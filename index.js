const koa = require("koa");
const koaBody = require("koa-body");
const cors = require("@koa/cors");
const Router = require("@koa/router");
const deviceRouter = require("./src/routers/deviceRoute");
const logRouter = require("./src/routers/logRoute");
const userRouter = require("./src/routers/userRoute");

const app = new koa();
const router = new Router();

app.use(koaBody());
app.use(cors());

router
  .use("/api/v1/devices", deviceRouter.routes())
  .use("/api/v1/logs", logRouter.routes())
  .use("/api/v1/users", userRouter.routes());

app.use(router.routes());

app.use(async (ctx) => {
  ctx.body = "Hello World this is my koa app";
});

app.listen(8080, () => {
  console.log(`Server is running on port ${8080}`);
});
