/* eslint-disable no-restricted-syntax */
import express from 'express';
import fs from 'fs';

const router = express.Router();
// app.use(express.json());

router.get('/', (req, res) => {
  console.log('GET videos endpoint hit!');
  const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
  // Map the full dataset to return a array of all videos with reduced info on each video
  const allVideos = videoData.map((video) => {
    const outputObj = {};
    for (const prop in video) {
      if (['id', 'title', 'channel', 'image'].includes(prop)) {
        outputObj[prop] = video[prop];
      }
    }
    return outputObj;
  });
  res.status(200).json(allVideos);
});

router.get('/:videoId', (req, res) => {
  const id = req.params.videoId;
  const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
  const singleVideoData = videoData.find((video) => video.id === id)
  res.status(200).json(singleVideoData);
});



export default router;
