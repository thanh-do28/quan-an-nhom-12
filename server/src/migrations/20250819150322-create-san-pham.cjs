'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('SanPhams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ten_mon: {
        type: Sequelize.STRING
      },
      anh: {
        type: Sequelize.STRING
      },
      gia: {
        type: Sequelize.DECIMAL
      },
      mo_ta: {
        type: Sequelize.TEXT
      },
      don_vi: {
        type: Sequelize.STRING
      },
      kich_co: {
        type: Sequelize.STRING
      },
      trang_thai: {
        type: Sequelize.STRING
      },
      phan_loai: {
        type: Sequelize.STRING
      },
      chi_tiet_phan_loai: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('SanPhams');
  }
};