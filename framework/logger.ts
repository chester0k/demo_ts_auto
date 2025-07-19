import winston, { format } from 'winston';

const myFormat = format.printf(({ level, message, timestamp }) => {
  return `[${level}] - ` + `${timestamp}` + `: ${message}`;
});

const logger = winston.createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.colorize({ all: true }), myFormat),

  transports: [
    new winston.transports.Console({}),
    new winston.transports.File({
      filename: './logs/error.log',
      level: 'info',
      maxsize: 5242880,
      options: { flags: 'w' },
      maxFiles: 1
    })
  ]
});

export default logger;
