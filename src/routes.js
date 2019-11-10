
const express = require('express');
const { User, Service } = require('./controllers');
// const auth = require('./middlewares/auth');

const routes = express.Router();

// USER
routes.post('/users/login', User.login);
routes.get('/users', User.index);
routes.post('/users', User.store);
routes.put('/users/:id_user', User.update);
routes.delete('/users/:id_user', User.destroy);

// SERVICE
routes.get('/services', Service.index);
routes.post('/services', Service.store);
routes.put('/services/:id_service', Service.update);
routes.delete('/services/:id_service', Service.destroy);


module.exports = routes;
