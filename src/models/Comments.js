const { Model, DataTypes } = require('sequelize');

class Comments extends Model {
  static init(sequelize) {
    super.init({
      text: DataTypes.STRING,
    },
    {
      sequelize,
    });
  }

  static associate(models) {
    this.belongsTo(models.Post, { foreignKey: 'post_id', as: 'post' });
    this.belongsTo(models.Author, { foreignKey: 'author_id', as: 'author' });
  }
}

module.exports = Comments;
