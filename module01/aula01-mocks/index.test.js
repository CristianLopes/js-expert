const { error } = require('./src/constants');
const File = require('./src/file');
const assert = require('assert');
//IFEE
(async () => {
  {
    const filePath = './mocks/emptyFile-invalid.csv';
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/invalid-header.csv';
    const expected = new Error(error.FILE_HEADER_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await assert.rejects(result, expected);
  }

  {
    const filePath = './mocks/threeitems-valid.csv';
    const expected = [
      {
        id: 1,
        name: 'Lucas',
        profession: 'Programador',
        age: 45,
      },
      {
        id: 2,
        name: 'Fernando',
        profession: 'Enfermeiro',
        age: 25,
      },
      {
        id: 4,
        name: 'Leticia',
        profession: 'Enfermeira',
        age: 38,
      },
    ];
    const result = await File.csvToJSON(filePath);
    assert.deepEqual(result, expected);
  }
})();
