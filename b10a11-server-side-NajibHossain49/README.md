# My Express App with Node Server

This is a basic **Express.js** application built with **Node.js**. The app is designed as a starting point for creating REST APIs or full-stack applications using Express.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Folder Structure](#folder-structure)
4. [Running the Application](#running-the-application)
5. [API Endpoints](#api-endpoints)
6. [Environment Variables](#environment-variables)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Contributing](#contributing)

---

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** and **npm** installed. You can verify by running:
  ```bash
  node -v
  npm -v
  ```

  If not installed, you can download and install **Node.js** from [here](https://nodejs.org/).

## Installation

Follow these steps to get the application up and running:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/programming-hero-web-course2/b10a11-server-side-NajibHossain49.git
   cd b10a11-server-side-NajibHossain49
   ```

2. **Install dependencies:**
   Run the following command to install the required Node.js packages:
   ```bash
   npm install -y
   ```

3. **Start the application:**
   Once the dependencies are installed, you can start the server:
   ```bash
   npm run dev
   ```

4. The application should now be running on `http://localhost:5000`.

---

## Folder Structure

Here’s the default folder structure for the application:

```
b10a11-server-side-NajibHossain49/
├── node_modules/       # Node.js dependencies
├── index.js            # Main entry point where routes are defined
├── package.json        # Project metadata and dependencies
├── .env                # Environment variables for configuration
└── README.md           # This file

```

- **`index.js`**: The entry point of the Express application where the server is created and routes are initialized.
- **`package.json`**: Contains project metadata, dependencies, and scripts.
- **`.env`**: Holds environment variables (such as server port or database credentials) for configuration.

---

## Running the Application

To run the app in development mode with automatic server restart on changes (using **Nodemon**):

```bash
npm install -g nodemon
npm run dev
```

## API Endpoints

This Express app defines a few basic routes:

### 1. **GET /**  
- **Description**: Returns a welcome message.
- **Response**:  
  ```json
  {
    "message": "Designed with love 💖 by Najib Hossain"
  }
  ```


 



---

## Environment Variables

This application uses environment variables for configuration. Create a `.env` file in the root directory and add any necessary variables.

Example `.env` file:

```
DB_USER=<SECRET_KEY>
SECRET_KEY=<SECRET_KEY>

SECRET_KEY_JWT=<SECRET_KEY>
```

- **PORT**: Port number to run the server (default is `5000`).


## Ensure you restart the server after modifying the `.env` file.

---


## Deployment

To deploy this app to **Vercel** or follow the instructions provided in the Google Docs, check out the full guide here:

[**Deploying Express to Vercel**](https://docs.google.com/document/d/1wCn-okRkwxXS6huLo3St2_EsEMeDDtaU7oLIGqWylrM/edit?tab=t.0#heading=h.svi3c6q2c9m6)

Follow the steps in the linked document to deploy your app on **Vercel** or to explore other deployment options.


## Contributing

We welcome contributions to this project. If you'd like to improve this project, feel free to:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add feature-name'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a Pull Request.

### Designed with love 💖 by Najib Hossain
---
