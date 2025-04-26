# Bodhika - Career Preparation Platform

<div align="center">Bodhika, derived from the Sanskrit word for "enlightenment," is a web platform designed to empower students and job seekers with a centralized hub of curated resources for career preparation. Explore study roadmaps, job preparation tools, online courses, and more!</div>

## Tech Stack

- **NextJS**: Frontend framework using Next.js for building dynamic interfaces.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **MongoDB**: NoSQL database for storing resource metadata.
- **OAuth**: Authentication integration with Google and GitHub.
- **Vercel**: Platform for deployment and scaling.

## Getting Started
Follow these steps to get started with Bodhika:

### Prerequisites

- Node.js (https://nodejs.org/) installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bodhika.git
   cd bodhika
   ```
2. Install dependencies
   ```bash
   yarn
   ```
3. Set up environment variables:
 - Create a .env file in the root directory.
- Add your MongoDB URI, and OAuth credentials (e.g., Google Client ID, GitHub Client Secret).
   ```bash
   MONGODB_URI=your_mongodb_uri
   NEXT_PUBLIC_AUTH0_DOMAIN=your-auth0-domain
   NEXT_PUBLIC_AUTH0_CLIENT_ID=your-auth0-client-id
   NEXT_PUBLIC_AUTH0_REDIRECT_URI=http://localhost:3000
   ```
4. Start the app
   ```bash
   yarn dev
   ```

### FEATURES

- **Structured Study Roadmaps**: Follow tailored paths for domains like Web Development, DSA, and AI/ML.
- **Job Preparation Resources**: Access curated websites and articles for placement readiness.
- **Online Courses**: Explore top-rated courses across various fields.
- **YouTube Playlists**: Curated videos for technical and soft skills.
- **Interview Preparation**: Guidance on coding questions, behavioral interviews, and resume building.

### AUTHOR
* <a href="https://shubham-s-socials.vercel.app/"><i>Shubham Singodiya</i></a>