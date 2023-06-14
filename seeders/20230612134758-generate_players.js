/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

const verifyUser = async (queryInterface) => {
  const user = await queryInterface.sequelize.query(
    `SELECT id FROM users WHERE id = 1;`,
  );
  if (!user[0].length) {
    await queryInterface.insert({
      id: 1,
      name: 'user 1 ',
      password: bcrypt.hashSync('123456', 10),
    });
    return 1;
  }
  return 1;
};

const createPlayerData = (user_id) => {
  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      name: `player ${i + 1}`,
      skill_level: Math.floor(Math.random() * 101),
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  return data;
};

module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = await verifyUser(queryInterface, Sequelize);
    const data = createPlayerData(userId);
    return queryInterface.bulkInsert('players', data);
  },

  async down(queryInterface) {
    const playersData = await queryInterface.sequelize.query(
      `SELECT id FROM players where user_id = 1;`,
    );
    const playersIds = playersData[0].map((player) => player.id);
    return queryInterface.bulkDelete('players', { id: playersIds });
  },
};
