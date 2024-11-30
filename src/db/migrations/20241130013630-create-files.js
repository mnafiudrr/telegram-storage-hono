'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      folder_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      chat_id: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      path: {
        allowNull: false,
        type: Sequelize.STRING
      },
      size: {
        type: Sequelize.INTEGER
      },
      mimes: {
        allowNull: false,
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      source: {
        allowNull: false,
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
    await queryInterface.dropTable('files');
  }
};