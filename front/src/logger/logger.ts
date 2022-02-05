import pino from "pino";
import { PinoPretty } from "pino-pretty";

export default pino({
  enabled: true,
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      ignore: "pid,hostname",
      translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
    },
  },
  prettifier: PinoPretty,
});
