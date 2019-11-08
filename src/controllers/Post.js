/* eslint-disable camelcase */
const { Post, Author } = require('../models');

module.exports = {
  /**
         * Nome do métodos
         * @param {Object} req
         * @param {Object} res
         */
  async index(req, res) {
    try {
      const posts = await Post.findAll({ include: 'author' });
      return res.status(200).json({
        data: posts,
        request: {
          type: 'GET',
          url: 'http://localhost:3001',
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        request: {
          type: 'GET',
          url: 'http://localhost:3001',
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
    const author_id = req.user;
    const { title, body } = req.body;
    try {
      const isAuthor = await Author.findByPk(author_id); // verificar se existe autor
      if (!isAuthor) {
        return res.status(400).json({ error: 'Author not found!' });
      }
      const post = await Post.create({
        author_id,
        title,
        body,
      });
      return res.status(200).json({
        data: post,
        request: {
          type: 'POST',
          url: 'http://localhost:3001',
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        request: {
          type: 'POST/:id',
          url: 'http://localhost:3001',
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
    const { id_post } = req.params;
    try {
      const post = Post.update({ ...req.body }, { where: { id: id_post } });
      return res.status(200).json({
        data: post,
        request: {
          type: 'PUT',
          url: 'http://localhost:3001',
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        request: {
          type: 'PUT',
          url: 'http://localhost:3001',
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
    const { id_post } = req.params;
    try {
      const isPost = await Post.findByPk(id_post); // verificar se existe post

      if (!isPost) {
        return res.status(404).json({
          error: 'Post not found!',
          request: {
            type: 'DELETE/:id',
            url: 'http://localhost:3001/:id',
          },
        });
      }
      await Post.destroy({ where: { id: id_post } });

      return res.status(200).json({
        data: 'Post deleted!',
        request: {
          type: 'DELETE/:id',
          url: 'http://localhost:3001/:id',
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
