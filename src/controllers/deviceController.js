const uuid = require("uuid");
const fs = require("fs");

const devices = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/devices.json`, "utf-8")
);

exports.getAll = async (ctx) => {
  const { q } = ctx.request.query;

  const devicesFilter = q
    ? devices.filter((device) =>
        device.name.toLowerCase().includes(q.toLowerCase())
      )
    : devices;

  ctx.res.statusCode = 200;
  ctx.body = {
    status: "success",
    total: devicesFilter.length,
    data: {
      devices: devicesFilter,
    },
  };
};

exports.createDevice = async (ctx) => {
  const { name, IP, power } = ctx.request.body;
  const newDevice = {
    id: uuid.v4(),
    name,
    IP,
    power,
    colorChart: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
    macAddress: "00:1B:44:11:3A:B7",
    createdAt: new Date(),
  };

  fs.writeFile(
    `${__dirname}/../data/devices.json`,
    JSON.stringify([...devices, newDevice]),
    (err) => {
      if (err) {
        console.log("write file devices error: ", err);
      } else {
        console.log("write file devices success");
      }
    }
  );

  ctx.res.statusCode = 200;

  ctx.body = {
    status: "success",
    data: {
      device: newDevice,
    },
  };
};
