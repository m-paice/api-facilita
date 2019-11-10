
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      required: true,
    },
    phone: Sequelize.STRING,
    birth_date: Sequelize.DATE,
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: (queryInterface, Sequelize) => queryInterface.dropTable('users'),
};
