const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      birthDate: DataTypes.DATE,
      phone: DataTypes.STRING,
      createdAt: DataTypes.DATE,
    },
    {
      sequelize,
    });
  }

  // static associate(models) {
  //   // this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
  //   // this.belongsTo(models.Author, { foreignKey: 'author_id', as: 'author' });
  // }
}

module.exports = User;
