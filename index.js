import fs from "fs";
import express from "express";
import videoRoutes from './routes/videos.js';
import cors from 'cors';

import 'dotenv/config';
const PORT = process.env.PORT;

const app = express();
// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log('middleware inovcation', new Date().toLocaleTimeString());
  next();
});
app.use(express.static('public'));

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
