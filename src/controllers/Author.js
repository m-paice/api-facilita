const jwt = require('jsonwebtoken');
const { Author } = require('../models');

const url = 'http://localhost:3001/author';

module.exports = {
  /**
   * Nome do métodos
   * @param {Object} req
   * @param {Object} res
   */
  async index(req, res) {
    try {
      const author = await Author.findAll();
      return res.status(200).json({
        data: author,
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
    const {
      name, username, password, age,
    } = req.body;
    try {
      // AUTENTICAÇÃO
      // if author exists
      const isAuthor = await Author.findAll({ where: { username, password } });
      if (isAuthor) {
        return res.json({
          error: 'Author already exists!',
          request: {
            type: 'POST',
            url,
          },
        });
      }

      if ((username.lenght < 2) || (username === ' ') || (username !== username.typeof(Number)) || (username !== username.typeof(String))) {
        return res.json({
          error: 'Username invalid!',
          request: {
            type: 'POST',
            url,
          },
        });
      }
      const author = await Author.create({
        name,
        username,
        password,
        age,
      });
      return res.json({
        data: author,
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
    const { username, password } = req.body;
    try {
      const author = await Author.findOne({ where: { username, password } });

      if (!author) {
        return res.status(404).json({
          error: 'Author not found',
          request: {
            type: 'POST',
            url: `${url}/login`,
          },
        });
      }

      const token = jwt.sign({ author }, process.env.CHAVEJWT, {
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
    const { id_author } = req.params;
    try {
      const isAuthor = await Author.findByPk(id_author);

      if (!isAuthor) {
        return res.status(404).json({
          error: 'Author not found',
          request: {
            type: 'PUT/:id',
            url: `${url}/:id`,
          },
        });
      }
      const [author] = await Author.update(
        { ...req.body },
        { where: { id: id_author }, returning: true },
      );

      return res.status(200).json({
        data: author[0],
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
    const { id_author } = req.params;
    try {
      const isAuthor = await Author.findByPk(id_author);

      if (!isAuthor) {
        return res.status(404).json({
          error: 'Author not exists!',
          request: {
            type: 'DELETE/:id',
            url: `${url}/:id`,
          },
        });
      }
      await Author.destroy({ where: { id: id_author } });
      return res.status(200).json({
        data: 'Author deleted!',
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
