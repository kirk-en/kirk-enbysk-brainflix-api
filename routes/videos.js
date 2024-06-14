/* eslint-disable no-restricted-syntax */
import { timeStamp } from "console";
import express from "express";
import fs from "fs";

const router = express.Router();

router.get("/", (req, res) => {
  try {
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json"));
    // Map the full dataset to return a array of all videos with reduced info on each video
    const allVideos = videoData.map((video) => {
      const outputObj = {};
      for (const prop in video) {
        if (["id", "title", "channel", "image"].includes(prop)) {
          outputObj[prop] = video[prop];
        }
      }
      return outputObj;
    });
    res.status(200).json(allVideos);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:videoId", (req, res) => {
  try {
    const id = req.params.videoId;
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json"));
    const singleVideoData = videoData.find((video) => video.id === id);
    res.status(200).json(singleVideoData);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", (req, res) => {
  try {
    // Read file
    const videoData = JSON.parse(fs.readFileSync("./data/videos.json"));
    // Create new video object to be added to videoData
    const newUpload = {
      id: crypto.randomUUID(),
      title: req.body.title,
      channel: "User",
      image: req.body.image,
      description: req.body.description,
      views: Math.floor(Math.random() * 1000000).toLocaleString(),
      likes: Math.floor(Math.random() * 10000).toLocaleString(),
      duration: "1:00",
      video: "/videos/test-stream.mp4",
      timestamp: Date.now(),
      comments: [
        {
          id: crypto.randomUUID(),
          name: "Pikachu",
          comment:
            "Pika! Pika! Your channel sparks my curiosity every time. The way you explain things is electrifying. Keep up the amazing work! Pika-chu!",
          likes: 25,
          timestamp: 1691558262000,
        },
        {
          id: crypto.randomUUID(),
          name: "Bulbasaur",
          comment:
            "Bulba! Your videos plant the seeds of knowledge in my mind. I especially enjoyed the latest one. Keep nurturing our minds with great content!",
          likes: 18,
          timestamp: 1691558262000,
        },
        {
          id: crypto.randomUUID(),
          name: "Charmander",
          comment:
            "Char! Char! Your channel ignites my interest. The discussion was fiery and full of insight. Keep the flame burning with more excellent videos!",
          likes: 20,
          timestamp: 1691558262000,
        },
      ],
    };
    // Create combined array of existing data + new entry/"uploaded" video
    const newVideoData = [...videoData, newUpload];

    // Write to JSON
    fs.writeFileSync("./data/videos.json", JSON.stringify(newVideoData));

    // send success status code
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
  }
});

export default router;
