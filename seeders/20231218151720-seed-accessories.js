/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use strict';

const env = require('dotenv');
const { getData } = require('../src/helpers/getData');

env.config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    const phones = await getData('../public/api/accessories.json');

    try {
      await queryInterface.bulkInsert('accessories', phones, {
        transaction,
      });
      await transaction.commit();
    } catch (error) {
      console.log('🔴INSERT🔴', error);
      await transaction.rollback();
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkDelete('accessories', null, {});
      await transaction.commit();
    } catch (error) {
      console.log('🔴DELETE🔴', error);
      await transaction.rollback();
    }
  },
};
