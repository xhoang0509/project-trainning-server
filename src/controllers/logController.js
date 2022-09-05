const uuid = require("uuid");
const fs = require("fs");

const logs = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/logs.json`, "utf-8")
);

exports.getAll = async (ctx) => {
  ctx.res.statusCode = 200;
  ctx.body = {
    status: "success",
    data: {
      logs,
    },
  };
};

exports.createLog = async (ctx) => {
  const { deviceId, name, action } = ctx.request.body;
  const newLog = {
    id: uuid.v4(),
    deviceId,
    name,
    action,
    createdAt: Date.now(),
  };

  if (!newLog.name || !newLog.deviceId || !newLog.action) {
    ctx.res.statusCode = 500;

    ctx.body = {
      status: "failed",
      message: "Missing name, device id or action",
    };

    return;
  }

  fs.writeFile(
    `${__dirname}/../data/logs.json`,
    JSON.stringify([...logs, newLog]),
    (err) => {
      if (err) {
        console.log("write file logs error: ", err);
      } else {
        console.log("write file logs success");
      }
    }
  );

  ctx.res.statusCode = 200;

  ctx.body = {
    status: "success",
    data: {
      log: newLog,
    },
  };
};
