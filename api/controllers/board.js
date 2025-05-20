const Board = require("../models/Board");

module.exports = {
  // GET /boards - list all boards or filter by project/user if needed
  getBoards: async (req, res) => {
    try {
      // Optional filters, e.g. projectId, userId
      const filters = {};
      if (req.query.projectId) filters.project = req.query.projectId;
      if (req.query.userId) filters.members = req.query.userId;

      const boards = await Board.find(filters).sort({ createdAt: -1 });
      res.json(boards);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // GET /boards/:id - get single board by ID
  getBoardById: async (req, res) => {
    try {
      const { id } = req.params;
      const board = await Board.findById(id);
      if (!board) return res.status(404).json({ error: "Board not found" });

      res.json(board);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /boards - create new board
  createBoard: async (req, res) => {
    try {
      const { name, description, projectId, members } = req.body;
      if (!name || !projectId)
        return res.status(400).json({ error: "Name and projectId required" });

      const newBoard = new Board({
        name,
        description,
        project: projectId,
        members,
      });

      await newBoard.save();
      res.status(201).json(newBoard);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /boards/:id - update board details
  updateBoard: async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedBoard = await Board.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedBoard)
        return res.status(404).json({ error: "Board not found" });

      res.json(updatedBoard);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /boards/:id - delete board
  deleteBoard: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Board.findByIdAndDelete(id);
      if (!deleted) return res.status(404).json({ error: "Board not found" });

      res.json({ message: "Board deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
