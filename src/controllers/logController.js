const uuid = require("uuid");
const fs = require("fs");

const logs = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/logs.json`, "utf-8")
);

exports.getAll = async (ctx) => {
  const logsPerPage = 10;
  let totalPage = 0;
  let newLogs = [];

  let { q, page } = ctx.request.query;
  page = page ? page : 1;

  let logsFilter = q
    ? logs.filter((item) => item.name.toLowerCase().includes(q.toLowerCase()))
    : logs;

  if (logsPerPage > logsFilter.length) {
    totalPage = 1;
    newLogs = logsFilter;
  } else {
    totalPage = Math.ceil(logsFilter.length / logsPerPage);
    for (let i = 0; i < logsFilter.length; i++) {
      if (
        (page - 1) * logsPerPage + 1 <= i + 1 &&
        i + 1 <= page * logsPerPage
      ) {
        newLogs.push(logsFilter[i]);
      }
    }
  }
  ctx.res.statusCode = 200;

  ctx.body = {
    status: "success",
    total: newLogs.length,
    totalLogs: logsFilter.length,
    page: 1,
    totalPage,
    data: {
      logs: newLogs,
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
