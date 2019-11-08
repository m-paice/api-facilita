
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('posts', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    author_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id',
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
    },

  }),

  down: (queryInterface) => queryInterface.removeTable('posts'),
};
