'use strict';
var fs = require('fs');
const util = require('util');
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;


const logDirectory = '../../log/';
if(!fs.existsSync(logDirectory)) {fs.mkdirSync(logDirectory);}

const logger = createLogger({
  level: 'verbose',
  format: combine(
    timestamp(),
    format.splat(),
    format.simple()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `info.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: '../../log/error.log', level: 'error' }),
    new transports.File({ filename: '../../log/info.log' })
  ]
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
// 
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}

exports.logger = logger;