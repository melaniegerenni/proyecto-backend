import winston from "winston";
import config from "./config/config.js";

const customWinstonOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "orange",
    warning: "yellow",
    info: "blue",
    http: "green",
    debug: "white",
  },
};

winston.addColors(customWinstonOptions.colors);
const createLogger = (env) => {
  if (env === "production") {
    return winston.createLogger({
      levels: customWinstonOptions.levels,
      transports: [
        new winston.transports.Console({
          level: "info",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
        new winston.transports.File({
          level: "error",
          filename: "errors.log",
          format: winston.format.simple(),
        }),
      ],
    });
  } else {
    return winston.createLogger({
      levels: customWinstonOptions.levels,
      transports: [
        new winston.transports.Console({
          level: "debug",
          format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
          ),
        }),
      ],
    });
  }
};

const logger = createLogger(config.app.enviroment);

export default logger
