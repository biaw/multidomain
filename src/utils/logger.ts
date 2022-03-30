import DailyRotateFile from "winston-daily-rotate-file";
import expressWinston from "express-winston";
import { format } from "winston";

export const expressLogger = expressWinston.logger({
  format: format.json(),
  transports: [
    new DailyRotateFile({
      filename: "logs/express-info.%DATE%",
      level: "info",
      maxSize: process.env.LOG_MAX_SIZE ?? "25m",
      maxFiles: process.env.LOG_MAX_FILES ?? "14d",
      zippedArchive: (process.env.LOG_ZIP ?? "true") === "true",
      extension: ".log",
    }),
  ],
});
