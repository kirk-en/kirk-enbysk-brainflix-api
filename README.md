# Brainflix API
![Brainflix logo](https://raw.githubusercontent.com/kirk-en/kirk-enbysk-brainflix/0b614d82f85bf281e6741bba669bd39cf70c5a36/src/assets/logo/BrainFlix-logo.svg)

A simple video upload and streaming platform API built with Express. It supports viewing a list of videos, getting details of a single video, and adding new videos to a JSON-based database.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework to handle routing and HTTP requests.
- **fs (File System)**: Used to read and write video data stored as JSON files.
- **Crypto**: For generating unique IDs for videos and comments.
- **CORS**: Cross-Origin Resource Sharing to allow cross-origin requests.

## Features

- **GET /videos**: Fetches a list of all videos with basic information (ID, title, channel, image).
- **GET /videos/:videoId**: Fetches details of a specific video by its ID.
- **POST /videos**: Adds a new video to the collection with random views, likes, and a sample video URL. Includes predefined comments.

## Future Improvements

- Integrate a real database (e.g., MongoDB) for persistent storage.
- Add user authentication for personalized video management.
- Implement video streaming capabilities.

## License

MIT
