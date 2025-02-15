const {Podcast ,Project} = require('../models');

const createPodcast = async (podcastData) => {
  const podcast = await Podcast.create(podcastData);
  await Project.findByIdAndUpdate(podcastData.projectId, { $inc: { podcastsCount: 1 } });
  return podcast;
};

const getPodcast = async (id) => {
  const podcast = await Podcast.findById(id);
  return podcast;
};

const updatePodcast = async (podcastData) => {
  const podcast = await Podcast.findByIdAndUpdate(podcastData.id, podcastData, {
    new: true,
  });
  return podcast;
};

const deletePodcast = async (id) => {
  const podcast = await Podcast.findByIdAndDelete(id);
  await Project.findByIdAndUpdate(podcast.projectId, { $inc: { podcastsCount: -1 } });
  return podcast;
};


const getAllPodcasts = async (projectId) => {
  const podcasts = await Podcast.find({projectId});
  return podcasts;
};

module.exports = {
  createPodcast,
  getPodcast,
  updatePodcast,
  deletePodcast,
  getAllPodcasts,
};