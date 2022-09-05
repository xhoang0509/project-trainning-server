const uuid = require("uuid");
const fs = require("fs");

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/../data/users.json`, "utf-8")
);

exports.login = (ctx, next) => {
  const { username, password } = ctx.request.body;

  if (!username || !password) {
    ctx.res.statusCode = 500;
    ctx.body = {
      status: "failed",
      message: "Missing Username or Password",
    };
    return true;
  }

  const userExist = users.find(
    (user) =>
      user.username === username.toLowerCase() && user.password === password
  );

  if (userExist) {
    ctx.res.statusCode = 200;
    ctx.body = {
      status: "success",
      data: {
        user: userExist,
      },
    };
    return;
  } else {
    ctx.res.statusCode = 500;
    ctx.body = {
      status: "failed",
      message: "Username or password incorrect!",
    };
    return;
  }
};

exports.register = (ctx, next) => {
  const { name, username, password } = ctx.request.body;

  const newUser = {
    id: uuid.v4(),
    name,
    username,
    password: password.toString(),
  };

  if (!newUser.name || !newUser.username || !newUser.password) {
    ctx.res.statusCode = 500;
    ctx.body = {
      status: "failed",
      message: "Missing Name, Username or Password",
    };
    return;
  }

  if (newUser.password.length < 4) {
    ctx.res.statusCode = 500;
    ctx.body = {
      status: "failed",
      message: "Password must be more than 4 characters",
    };
    return;
  }

  const userExist = users.find((user) => user.username === newUser.username);

  if (userExist) {
    ctx.res.statusCode = 500;
    ctx.body = {
      status: "failed",
      message: "Username already exist!",
    };
    return;
  }

  ctx.res.statusCode = 200;

  fs.writeFile(
    `${__dirname}/../data/users.json`,
    JSON.stringify([...users, newUser]),
    (err) => {
      if (err) {
        console.log("write file error: ", err);
      } else {
        console.log("write file users success");
      }
    }
  );

  ctx.body = {
    status: "success",
    data: {
      user: newUser,
    },
  };
};
