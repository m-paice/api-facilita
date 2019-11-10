const { Model, DataTypes } = require('sequelize');

class Service extends Model {
  static init(sequelize) {
    super.init({
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
      specialization: DataTypes.STRING,
      price_type: DataTypes.STRING,
      price: DataTypes.STRING,

    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

module.exports = Service;
