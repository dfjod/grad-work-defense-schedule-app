# Setup Guide

Follow the steps below to set up and run the application in development mode.

---

## Prerequisites

Before starting, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) (Package Manager)

---

## Backend Setup

1. **Pull the Docker image**:
  ```sh
  docker pull ghcr.io/agrissh/combopt2024:latest
  ```
2. **Run the docker container**:
  ```sh
  docker run --rm -it -p 8082:8080 ghcr.io/agrissh/combopt2024:latest
  ```

---

## Frontend Setup
1. **Create a `.env` file in the project's root directory with the following content**:
  ```txt
  VITE_API_URL="http://localhost:8082"
  ```
2. **Install project dependencies**
  ```sh
  pnpm i
  ```
3. **Run the application in development mode**:
  ```sh
  pnpm run dev
  ```

---

# Accesing the Application
Once the application is running, you can access it by navigating to the URL provided by the development server:
```txt
http://localhost:8080
```

---

# Additional Notes
- Ensure the backend container is running before starting the frontend.
- If you encounter any issues, verify that the ports (8082 for the backend and 8080 for the frontend) are not being used by other applications.
