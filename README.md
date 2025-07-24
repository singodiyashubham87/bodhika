# Bodhika: The Enlightener

<div align="center">
Bodhika, derived from the Sanskrit word for "enlightenment," is a web platform designed to empower students and job seekers with a centralized hub of curated resources for career preparation. Explore study roadmaps, job preparation tools, online courses, and more!
</div>

---

## Tech Stack

- **NextJS**: Frontend framework using Next.js for building dynamic interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **MongoDB**: NoSQL database for storing resource metadata.
- **Auth0**: Authentication integration with Google and GitHub.
- **Vercel**: Platform for deployment and scaling.
- **Docker**: Containerization for consistent development and deployment environments.
- **Docker Compose**: Service orchestration for local dev (MongoDB + App).

---

# Code of Conduct

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT.md). By participating in this project you agree to abide by its terms.

---

# Contributing Guidelines

We believe in the power of collaboration. If you have ideas to improve College.ai, feel free to contribute! Check out our [Contribution Guidelines](CONTRIBUTING.md) to get started.

---

# Getting Started

### Comprehensive Guide for Installing and Setting Up Bodhika

#### Prerequisites

- **Node.js**: Install it from [nodejs.org](https://nodejs.org/)
- **Yarn**: (Optional) Recommended package manager for consistent builds.

---

## 🚀 Local Installation (Without Docker)

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bodhika.git
   cd bodhika
Install dependencies:

bash
Copy
Edit
yarn
Create a .env.local file in the root directory:

env
Copy
Edit
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
Start the app:

bash
Copy
Edit
yarn dev
🐳 Docker Setup
⚙️ Option 1: Run with Docker CLI
Useful for isolated production-like runs.

bash
Copy
Edit
# Build the Docker image
docker build -t bodhika-app .

# Run the app with required environment variables
docker run -p 3000:3000 \
  -e MONGODB_URI=your_mongodb_uri \
  -e NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain \
  -e NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id \
  -e NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000 \
  bodhika-app
⚙️ Option 2: Run with Docker Compose (Recommended for Dev)
Spins up both MongoDB and the Bodhika app locally.

1. Create a .env file in the root:
env
Copy
Edit
NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
2. Start the services:
bash
Copy
Edit
docker-compose up --build
3. Access the App:
🌐 http://localhost:3000

🛢️ MongoDB runs at mongodb://localhost:27017

✨ Features
Structured Study Roadmaps: Follow tailored paths for domains like Web Development, DSA, and AI/ML.

Job Preparation Resources: Access curated websites and articles for placement readiness.

Online Courses: Explore top-rated courses across various fields.

YouTube Playlists: Curated videos for technical and soft skills.

Interview Preparation: Guidance on coding questions, behavioral interviews, and resume building.

🤝 Contributions
You can find the contributing guideline here → CONTRIBUTING GUIDELINES

👤 Author
Shubham Singodiya - Lead developer and creator of the whiteboard web application.

📜 License


💖 Thanks to All the Contributors 😊
Thanks a lot for spending your time helping this project grow. Keep rocking!

<a href="https://github.com/singodiyashubham87/bodhika/graphs/contributors"> <img src="https://contrib.rocks/image?repo=singodiyashubham87/bodhika" /> </a>
📬 Message from PA
Thank you for visiting Bodhika! 💝
Feel free to explore the code, contribute, and provide feedback.
