'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tele_chats', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      title: {
        allowNull: true,
        type: Sequelize.STRING
      },
      first_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      last_name: {
        allowNull: true,
        type: Sequelize.STRING
      },
      username: {
        allowNull: true,
        type: Sequelize.STRING
      },
      type: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isIn: [['private', 'group', 'supergroup', 'channel']]
        }
      },
      last_command: {
        allowNull: true,
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tele_chats');
  }
};