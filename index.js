import fs from "fs";
import express from "express";
import videoRoutes from './routes/videos.js';

const app = express();
app.use('/videos', videoRoutes)
app.use(express.static('public'));

// Middleware
app.use((req, res, next) => {
  console.log('middleware inovcation',  new Date().toLocaleTimeString());
  next();
});

app.use('/videos', videoRoutes);

app.listen(8080, () => {
  console.log('Server running on port 8080');
});
