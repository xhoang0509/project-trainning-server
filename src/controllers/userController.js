const fs = require("fs");

const users = JSON.parse(fs.readFileSync(`${__dirname}/../data/devices.json`, "utf-8"));

exports.getAll = async (ctx, next) => {
  const { req, res } = ctx;

  res.statusCode = 200;

  ctx.body = {
    status: "ok",
    data: {
      users,
    },
  };
};
