const uuid = require("uuid");
const fs = require("fs");

const logs = JSON.parse(fs.readFileSync(`${__dirname}/../data/logs.json`, "utf-8"));

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
  const { name, macAddress, IP, power } = ctx.request.body;

  const newLog = {
    id: uuid.v4(),
    name,
    macAddress,
    IP,
    power,
    createAt: new Date(),
  };

  if (!newLog.name || !newLog.macAddress || !newLog.IP || !newLog.power) {
    ctx.res.statusCode = 500;

    ctx.body = {
      status: "failed",
      message: "Missing name, mac address, IP or power",
    };

    return;
  }

  fs.writeFile(`${__dirname}/../data/logs.json`, JSON.stringify([...logs, newLog]), (err) => {
    if (err) {
      console.log("write file logs error: ", err);
    } else {
      console.log("write file logs success");
    }
  });

  ctx.res.statusCode = 200;

  ctx.body = {
    status: "success",
    data: {
      log: newLog,
    },
  };
};
