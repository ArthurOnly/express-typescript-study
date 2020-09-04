module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable("users", {
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("users")
  },
}
