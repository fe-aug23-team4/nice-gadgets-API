/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises');
const path = require('path');
const { prepareData } = require('./prepareData');

module.exports = {
  async getData(pathToFile) {
    const filePath = path.join(__dirname, '../', pathToFile);

    // eslint-disable-next-line no-console
    console.log('📁PATH📁', path.join(__dirname, '../', pathToFile));

    const dataJson = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(dataJson);

    return data.map((item) => prepareData(item));
  },
};
