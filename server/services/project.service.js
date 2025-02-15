const { Project } = require("../models");

const createProject = async (projectData) => {
  console.log(projectData);
  const project = await Project.create(projectData);
  return project;
};

const getAllProjects = async (userId) => {
  const projects = await Project.find({userId});
  return projects;
};

module.exports = {
  createProject,
  getAllProjects,
};