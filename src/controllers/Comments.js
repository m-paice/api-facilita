/* eslint-disable camelcase */
const { Comments, Post, Author } = require('../models');

const url = 'http://localhost:3001/comments';

module.exports = {
  /**
     * Nome do métodos
     * @param {Object} req
     * @param {Object} res
     */
  async index(req, res) {
    try {
      const comments = await Comments.findAll({
        include: [
          'author',
          {
            model: Post,
            as: 'post',
            include: [
              { model: Author, as: 'author' },
            ],
          },
        ],
      });

      return res.status(200).json({
        data: comments,
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
    const { author_id, post_id, text } = req.body;
    try {
      const isPost = await Post.findByPk(post_id); // verificar se existe post
      if (!isPost) {
        return res.status(400).json({ error: 'Post not found!' });
      }
      const isAuthor = await Author.findByPk(author_id); // verificar se existe post
      if (!isAuthor) {
        return res.status(400).json({ error: 'Author not found!' });
      }
      const comments = await Comments.create({
        text,
        author_id,
        post_id,
      });
      return res.status(200).json({
        data: comments,
        constent: {
          type: 'POST',
          url,
        },
      });
    } catch (error) {
      return res.status(500).json({
        error: error.message,
        request: {
          type: 'POST',
          url,
        },
      });
    }
  },
};
