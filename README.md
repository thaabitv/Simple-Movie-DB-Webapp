# Movie App with Next.js, Node.js, Docker, and MongoDB

This is a movie application built with **Next.js** for the frontend and **Node.js** for the backend. The app pulls movie titles from **TMDb** (The Movie Database) and features a simple **AJAX search** functionality for searching movies by title. The application is containerized using **Docker**, and **MongoDB** is used for storing movie data. Docker ensures an easy setup without needing to manually install MongoDB or Node.js.

## Features

- Fetch movie titles from TMDb API.
- AJAX search functionality to search for movies by title.
- Backend server built with Node.js.
- Containerized with Docker for easy setup and deployment.
- MongoDB integration for storing movie data.
- Fast and responsive UI built with Next.js.

## Technologies Used

- **Next.js**: React framework for building the frontend app.
- **Node.js**: JavaScript runtime for the backend server.
- **MongoDB**: NoSQL database for storing movie data.
- **TMDb API**: To fetch movie titles and related information.
- **Docker**: Containerization for simplifying app deployment.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Docker](https://www.docker.com/get-started) for containerization.
- A [TMDb API Key](https://www.themoviedb.org/settings/api) (you can get it by signing up on their website).

## Installation

### Step 1: Clone the repository


git clone https://github.com/yourusername/movie-app.git
cd movie-

Step 2: Configure Environment Variables
You need to configure environment variables for both the client and server:

Client Side (.env.local)

Inside the client folder, create a .env.local file with the following content:


NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_TMDB_API_KEY=your_api_key


Server Side (.env)

Inside the server folder, create a .env file with the following content:


PORT=5000
MONGO_URI=mongodb://mongo:27017/moviedb
TMDB_API_KEY=your_api_key


Step 3: Build and Run with Docker
Use Docker to build and run the application:

Build the Docker containers:

docker-compose up --build

#This project has been set up with concurrently so you just need to run the above and it started everything.#

Step 4: Access the Application
Once the containers are up and running, navigate to:


http://localhost:3000
You should be able to see the app running.

Usage
Search for movies: Use the search bar to enter movie titles. The results will update dynamically as you type.

View movie details: Click on a movie to see more details.

Docker Compose
The docker-compose.yml file includes the necessary configuration to run both the Node.js backend server and MongoDB alongside the Next.js frontend. It ensures that MongoDB is properly linked to the app, making it easy to get started without manual setup.

Troubleshooting
If the app doesn't start, make sure Docker is running and there are no issues with the port.

Ensure the TMDb API key is valid and correctly set in the .env file.

Contributing
Feel free to fork this repository and submit pull requests for any improvements or bug fixes.

License
This project is open-source and available under the MIT License.