const bunyan = require("bunyan");
const logger = bunyan.createLogger({
  name: "fmail",
  streams: [
    {
      type: "rotating-file",
      level: "info",
      path: "/tmp/fmail.log",
      period: "1d",
      count: 7
    }
  ]
});

module.exports = logger;
