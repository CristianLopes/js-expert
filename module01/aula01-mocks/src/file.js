const { error } = require('./constants');
const { readFile } = require('fs/promises');

const DEFAULT_OPTION = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age'],
};

class File {
  static async csvToJSON(filePath) {
    const content = await readFile(filePath, 'utf8');
    var validation = this.isValid(content);
    if (!validation.valid) {
      throw new Error(validation.error);
    }

    return this.parseCsvToJSON(content);
  }

  static isValid(csvString, options = DEFAULT_OPTION) {
    const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/);
    const isValidHeaders = headers === options.fields.join();
    if (!isValidHeaders) {
      return {
        error: error.FILE_HEADER_ERROR_MESSAGE,
        valid: false,
      };
    }

    console.log(fileWithoutHeader);
    if (
      !fileWithoutHeader ||
      !fileWithoutHeader.length ||
      fileWithoutHeader.length == 0
    ) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false,
      };
    }

    return { valid: true };
  }

  static parseCsvToJSON(csvString) {
    const lines = csvString.split(/\r?\n/);
    const firstLine = lines.shift();
    const header = firstLine.split(',');

    const users = lines.map((line) => {
      const user = {};
      const columns = line.split(',');
      for (const index in columns) {
        user[header[index]] = columns[index].trim();
      }
      return user;
    });

    return users;
  }
}

module.exports = File;
