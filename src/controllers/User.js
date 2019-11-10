const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();
    return res.json(users);
  },
  async store(req, res) {
    const user = await User.create(req.body);
    return res.json(user);
  },
  async login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email, password } });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    const token = jwt.sign({ user }, process.env.CHAVEJWT, {
      expiresIn: '8h',
    });

    return res.json({
      token,
      user,
    });
  },
  async update(req, res) {
    const { id_user } = req.params;

    const isUser = await User.findByPk(id_user);

    if (!isUser) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    const [user] = await User.update(
      { ...req.body },
      { where: { id: id_user }, returning: true },
    );

    return res.json(user[0]);
  },
  async destroy(req, res) {
    const { id_user } = req.params;

    const isUser = await User.findByPk(id_user);

    if (!isUser) {
      return res.status(404).json({
        error: 'User not found!',
      });
    }
    await User.destroy({ where: { id: id_user } });

    return res.status(200);
  },
};
