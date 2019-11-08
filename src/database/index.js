const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const { Author, Post, Comments } = require('../models');

const connection = new Sequelize(dbConfig);

Author.init(connection);
Post.init(connection);
Comments.init(connection);

Author.associate(connection.models);
Post.associate(connection.models);
Comments.associate(connection.models);

module.exports = connection;
