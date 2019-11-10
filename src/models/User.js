const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      birth_date: DataTypes.DATE,
    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.hasMany(models.Service, { foreignKey: 'user_id', as: 'service' });
  }
}

module.exports = User;
