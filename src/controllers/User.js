const jwt = require('jsonwebtoken');
const { User } = require('../models');

const url = 'http://localhost:3001/user';

module.exports = {
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json({
        data: users,
        request: {
          type: 'GET',
          url,
        },
      });
    } catch (error) {
      return res.json({
        error: error.message,
        request: {
          type: 'GET',
          url,
        },
      });
    }
  },
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async store(req, res) {
    try {
      const user = await User.create({
        ...req.body,
      });
      return res.status(200).json({
        data: user,
        request: {
          type: 'POST',
          url,
        },
      });
    } catch (error) {
      return res.json({
        error: error.message,
        request: {
          type: 'POST',
          url,
        },
      });
    }
  },
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ where: { email, password } });

      if (!user) {
        return res.status(404).json({
          error: 'User not found',
          request: {
            type: 'POST',
            url: `${url}/login`,
          },
        });
      }

      const token = jwt.sign({ user }, process.env.CHAVEJWT, {
        expiresIn: '1h',
      });

      return res.status(200).json({
        data: token,
        request: {
          type: 'POST',
          url: `${url}/login`,
        },
      });
    } catch (error) {
      return res.status(404).json({
        error: error.message,
        request: {
          type: 'POST',
          url: `${url}/login`,
        },
      });
    }
  },
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async update(req, res) {
    const { id_user } = req.params;
    try {
      const isUser = await User.findByPk(id_user);

      if (!isUser) {
        return res.status(404).json({
          error: 'User not found',
          request: {
            type: 'PUT/:id',
            url: `${url}/:id`,
          },
        });
      }
      const [user] = await User.update(
        { ...req.body },
        { where: { id: id_user }, returning: true },
      );

      return res.status(200).json({
        data: user[0],
        request: {
          type: 'PUT/:id',
          url: `${url}/:id`,
        },
      });
    } catch (error) {
      return res.status(404).json({
        error: error.message,
        request: {
          type: 'PUT/:id',
          url: 'http://localhost:3001/:id',
        },
      });
    }
  },
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async destroy(req, res) {
    const { id_user } = req.params;
    try {
      const isUser = await User.findByPk(id_user);

      if (!isUser) {
        return res.status(404).json({
          error: 'User not exists!',
          request: {
            type: 'DELETE/:id',
            url: `${url}/:id`,
          },
        });
      }
      await User.destroy({ where: { id: id_user } });
      return res.status(200).json({
        data: 'User deleted!',
        content: {
          type: 'DELETE/:id',
          url: `${url}/:id`,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        request: {
          type: 'DELETE/:id',
          url: 'http://localhost:3001/:id',
        },
      });
    }
  },
};
