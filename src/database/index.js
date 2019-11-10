const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const { User, Service } = require('../models');

const connection = new Sequelize(dbConfig);

User.init(connection);
Service.init(connection);

User.associate(connection.models);
Service.associate(connection.models);

module.exports = connection;
