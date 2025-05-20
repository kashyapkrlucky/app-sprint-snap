const Comment = require("../models/Comment");

module.exports = {
  // GET /comments?taskId=...
  getCommentsByTask: async (req, res) => {
    try {
      const { taskId } = req.query;
      if (!taskId) return res.status(400).json({ error: "taskId is required" });

      const comments = await Comment.find({ task: taskId }).sort({
        createdAt: -1,
      });
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /comments
  createComment: async (req, res) => {
    try {
      const { taskId, authorId, content } = req.body;
      if (!taskId || !authorId || !content) {
        return res
          .status(400)
          .json({ error: "taskId, authorId, and content are required" });
      }

      const comment = new Comment({ task: taskId, author: authorId, content });
      await comment.save();

      res.status(201).json(comment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /comments/:id
  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;
      const comment = await Comment.findByIdAndDelete(id);
      if (!comment) return res.status(404).json({ error: "Comment not found" });

      res.json({ message: "Comment deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
