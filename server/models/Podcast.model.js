const mongoose = require("mongoose");


const podcastSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    transcript: { type: String , required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

const Podcast = mongoose.model("Podcast", podcastSchema);

module.exports = Podcast 
