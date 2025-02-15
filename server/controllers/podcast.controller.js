const { podcastService } = require("../services");
const { ApiError, catchAsync } = require("../utils");

const createPodcast = async (req, res) => {
  const { name, transcript, projectId } = req.body;
  const podcast = await podcastService.createPodcast({
    name,
    transcript,
    projectId,
  });
  res.status(201).json(podcast);
};

const getPodcast = async (req, res) => {
  const { id } = req.params;
  const podcast = await podcastService.getPodcast(id);
  res.status(200).json(podcast);
};

const updatePodcast = async (req, res) => {
  const { id } = req.params;
  const { name, transcript } = req.body;
  const podcast = await podcastService.updatePodcast({
    id,
    name,
    transcript,
  });

  if (!podcast) {
    throw new ApiError(404, "Podcast not found");
  }
  res.status(200).json(podcast);
};

const deletePodcast = async (req, res) => {
  const { id } = req.params;
  const podcast = await podcastService.deletePodcast(id);

  if (!podcast) {
    throw new ApiError(404, "Podcast not found");
  }

  res.status(200).json(podcast);
};

const getAllPodcasts = async (req, res) => {
  const { projectId } = req.params;
  console.log(projectId);
  const podcasts = await podcastService.getAllPodcasts(projectId);
  res.status(200).json(podcasts);
};

module.exports = {
  createPodcast: catchAsync(createPodcast),
  getPodcast: catchAsync(getPodcast),
  updatePodcast: catchAsync(updatePodcast),
  deletePodcast: catchAsync(deletePodcast),
  getAllPodcasts: catchAsync(getAllPodcasts),
};
