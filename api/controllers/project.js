const Project = require("../models/Project");
const Sprint = require("../models/Sprint");

// Helper: Generate burndown data
const generateBurndownData = (sprint) => {
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
  const data = [];

  for (let i = 0; i <= totalDays; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const remainingTasks = sprint.tasks.filter(
      (task) => !task.completed || new Date(task.completedDate) > date
    ).length;

    data.push({ date: date.toISOString().split("T")[0], remainingTasks });
  }

  return data;
};

module.exports = {
  // GET /projects?userId=...
  getProjects: async (req, res) => {
    try {
      const { userId } = req.query;
      if (!userId)
        return res
          .status(400)
          .json({ error: "userId query param is required" });

      const projects = await Project.find({ members: userId })
        .populate("members")
        .sort({ createdAt: -1 });
      res.json(projects);
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error fetching projects: ${err.message}` });
    }
  },

  // GET /projects/:id
  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate(
        "members tasks notifications"
      );
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (err) {
      res.status(500).json({ error: `Error fetching project: ${err.message}` });
    }
  },

  // POST /projects
  createProject: async (req, res) => {
    try {
      const {
        name,
        description,
        startDate,
        endDate,
        status,
        initials,
        member,
      } = req.body;

      if (!name || !member)
        return res.status(400).json({ error: "Name and member are required" });

      const project = new Project({
        name,
        description,
        startDate,
        endDate,
        status,
        initials,
        members: [member],
      });

      await project.save();
      res.status(201).json(project);
    } catch (err) {
      res.status(500).json({ error: `Error creating project: ${err.message}` });
    }
  },

  // PUT /projects/:id
  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      const project = await Project.findByIdAndUpdate(id, updates, {
        new: true,
      });
      if (!project) return res.status(404).json({ error: "Project not found" });

      res.json(project);
    } catch (err) {
      res.status(500).json({ error: `Error updating project: ${err.message}` });
    }
  },

  // DELETE /projects/:id
  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;

      const project = await Project.findByIdAndDelete(id);
      if (!project) return res.status(404).json({ error: "Project not found" });

      res.json({ message: "Project deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: `Error deleting project: ${err.message}` });
    }
  },

  // GET /sprints?projectId=...
  getSprints: async (req, res) => {
    try {
      const { projectId } = req.query;
      if (!projectId)
        return res
          .status(400)
          .json({ error: "projectId query param is required" });

      const sprints = await Sprint.find({ project: projectId }).sort({
        createdAt: -1,
      });
      res.json(sprints);
    } catch (err) {
      res.status(500).json({ error: `Error fetching sprints: ${err.message}` });
    }
  },

  // POST /sprints
  createSprint: async (req, res) => {
    try {
      const { name, projectId } = req.body;
      if (!name || !projectId)
        return res
          .status(400)
          .json({ error: "Name and projectId are required" });

      const sprint = new Sprint({ name, project: projectId });
      await sprint.save();
      res.status(201).json(sprint);
    } catch (err) {
      res.status(500).json({ error: `Error creating sprint: ${err.message}` });
    }
  },

  // GET /sprints/:id/burndown
  getBurndownData: async (req, res) => {
    try {
      const { id } = req.params;
      const sprint = await Sprint.findById(id).populate("tasks");
      if (!sprint) return res.status(404).json({ error: "Sprint not found" });

      const data = generateBurndownData(sprint);
      res.json(data);
    } catch (err) {
      res
        .status(500)
        .json({ error: `Error generating burndown data: ${err.message}` });
    }
  },

  // Add more controller methods for tasks, boards, comments, notifications similarly
};
