import fs from 'fs';

import { readIBFRecord } from './IBFRecord/IBFRecordReader.js';
import { parseLogRecord } from './LogRecord/LogRecordParser.js';
import { LogRecordType, HistoryLogRecordType } from './LogRecord/LogRecord.js';

export default function parseOmnipodFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, buffer) => {
      if (err) {
        reject(err);
        return;
      }

      let record;
      // TODO: add support for the file headers and profile entries -- skip them until then
      let recordCount = -18;
      let output = [];

      while (true) {
        [record, buffer] = readIBFRecord(buffer);
        if (record == null || buffer.length == 0) {
          resolve(output);
          break;
        }
        recordCount++;
        if (recordCount >= 0) {
          let [err, parsed] = parseLogRecord(record);
          if (err) {
            reject(err);
          } else {
            let recordType;
            if (typeof parsed['historyLogRecordType'] !== 'undefined') {
              recordType = HistoryLogRecordType[parsed['historyLogRecordType']];
            } else {
              recordType = LogRecordType[parsed.logType];
            }
            output.push({...parsed, recordCount, recordType});
          }
        }
      }
    });
  });
}
