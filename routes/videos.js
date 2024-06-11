/* eslint-disable no-restricted-syntax */
import { timeStamp } from 'console';
import express from 'express';
import fs from 'fs';
// import {v4 as uuidv4} from 'uuid';

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
  const singleVideoData = videoData.find((video) => video.id === id);
  res.status(200).json(singleVideoData);
});

router.post('/', (req, res) => {
  // Read file
  const videoData = JSON.parse(fs.readFileSync('./data/videos.json'));
  console.log(req.body);
  // Create new video object to be added to videoData
  const newUpload = {
    id: crypto.randomUUID(),
    title: req.body.title,
    channel: 'uploaded by user',
    image: '/images/upload-image.jpg',
    description: req.body.description,
    views: Math.floor(Math.random() * 1000000).toLocaleString(),
    likes: Math.floor(Math.random() * 10000).toLocaleString(),
    duration: '1:00',
    video: '',
    timeStamp: Date.now(),
    comments: [
      {
        id: crypto.randomUUID(),
        name: 'Pikachu',
        comment:
          'Pika! Pika! Your channel sparks my curiosity every time. The way you explain things is electrifying. Keep up the amazing work! Pika-chu!',
        likes: 25,
        timestamp: 1691558262000,
      },
      {
        id: crypto.randomUUID(),
        name: 'Bulbasaur',
        comment:
          'Bulba! Your videos plant the seeds of knowledge in my mind. I especially enjoyed the latest one. Keep nurturing our minds with great content!',
        likes: 18,
        timestamp: 1691558262000,
      },
      {
        id: crypto.randomUUID(),
        name: 'Charmander',
        comment:
          'Char! Char! Your channel ignites my interest. The discussion was fiery and full of insight. Keep the flame burning with more excellent videos!',
        likes: 20,
        timestamp: 1691558262000,
      },
    ],
  };
  // Create combined array of existing data + new entry/"uploaded" video
  const newVideoData = [...videoData, newUpload];

  // Write to JSON
  fs.writeFileSync('./data/videos.json', JSON.stringify(newVideoData));

  // send success status code
  res.sendStatus(201);
});

export default router;
