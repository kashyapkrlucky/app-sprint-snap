const Notification = require("../models/Notification");

module.exports = {
  // GET /notifications?userId=... - get notifications for a user
  getNotifications: async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId) return res.status(400).json({ error: "userId is required" });

      const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(50);

      res.json(notifications);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // POST /notifications - create a notification
  createNotification: async (req, res) => {
    try {
      const { userId, type, message, metadata } = req.body;
      if (!userId || !type || !message) {
        return res
          .status(400)
          .json({ error: "userId, type, and message are required" });
      }

      const newNotification = new Notification({
        user: userId,
        type,
        message,
        metadata,
      });

      await newNotification.save();
      res.status(201).json(newNotification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // PUT /notifications/:id/read - mark notification as read
  markAsRead: async (req, res) => {
    try {
      const { id } = req.params;
      const notification = await Notification.findByIdAndUpdate(
        id,
        { read: true },
        { new: true }
      );
      if (!notification)
        return res.status(404).json({ error: "Notification not found" });

      res.json(notification);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // DELETE /notifications/:id - delete notification
  deleteNotification: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Notification.findByIdAndDelete(id);
      if (!deleted)
        return res.status(404).json({ error: "Notification not found" });

      res.json({ message: "Notification deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
