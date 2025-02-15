const { projectService } = require("../services");
const { catchAsync } = require("../utils");

const createProject = async (req, res) => {
  const userId = req.user.sub;
  const { name } = req.body;
  const project = await projectService.createProject({ name, userId });
  res.status(201).json(project);
};

const getAllProjects = async (req, res) => {
  const userId = req.user.sub;

  const projects = await projectService.getAllProjects(userId);
  res.status(200).json(projects);
};

module.exports = {
  createProject: catchAsync(createProject),
  getAllProjects: catchAsync(getAllProjects),
};
