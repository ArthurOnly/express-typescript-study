"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn("users", "id", {
      primaryKey: true,
      autoIncrement: true,
      type: Sequelize.INTEGER.UNSIGNED,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn("users", "id")
  },
}
