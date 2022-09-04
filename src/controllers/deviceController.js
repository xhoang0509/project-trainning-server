const uuid = require("uuid");
const fs = require("fs");

const devices = JSON.parse(fs.readFileSync(`${__dirname}/../data/devices.json`, "utf-8"));

exports.getAll = async (ctx) => {
  ctx.res.statusCode = 200;
  ctx.body = {
    status: "success",
    data: {
      devices,
    },
  };
};

exports.createDevice = async (ctx) => {
  const { name, macAddress, IP, power } = ctx.request.body;
  const newDevice = {
    id: uuid.v4(),
    name,
    macAddress,
    IP,
    power,
    createAt: new Date(),
  };

  fs.writeFile(`${__dirname}/../data/devices.json`, JSON.stringify([...devices, newDevice]), (err) => {
    if (err) {
      console.log("write file devices error: ", err);
    } else {
      console.log("write file devices success");
    }
  });

  ctx.res.statusCode = 200;

  ctx.body = {
    status: "success",
    data: {
      device: newDevice,
    },
  };
};
