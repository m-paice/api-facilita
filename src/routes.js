
const express = require('express');
const { User } = require('./controllers');
// const auth = require('./middlewares/auth');

const routes = express.Router();

// USER
routes.post('/users/login', User.login);
routes.get('/users', User.index);
routes.post('/users', User.store);
routes.put('/users/:id_author', User.update);
routes.delete('/users/:id_author', User.destroy);


module.exports = routes;
