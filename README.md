
# Stream Connect

StreamConnect is a powerful video streaming application designed with modern technologies to deliver a seamless and scalable experience:

- Google Authentication: Easy and secure login through Google accounts.
- JWT & Cookies: Secure session management using JSON Web Tokens and cookies.
- Chunked Uploads: Efficient handling of large video files with chunked uploads to the backend.
- Azure Storage: Scalable, secure storage of videos using Azure Storage.
- Transcoding Service: On-the-fly video transcoding using HLS to optimize playback across different devices and resolutions.
- Sleek UI: A user-friendly and modern interface built with React for a dynamic experience.
- State Management: Efficient state handling using Redux, ensuring smooth data flow and interactions.
- Scalable Backend: A fault-tolerant, scalable backend powered by Apache Kafka and PostgreSQL.
- Database: Robust data management with PostgreSQL and Prisma ORM.


https://github.com/user-attachments/assets/902d64d7-8d0d-4b73-bce9-bede16b72751








## Authors

- [@priyadarshan](https://www.github.com/Priyadarshan-coder)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL`

`JWT_SECRET`

`KAFKA_SECRET`

`VITE_FIREBASE_API_KEY`

`AZURE_STORAGE_CONNECTION_STRING`

`AZURE_STORAGE`

`KAFKA_PASS`

`KAFKA_USER`

`AZURE_SHARED_CREDENTIAL`

`containerName`


## Features

- User sign in and sign up
- Watch videos at different video quality
- Like
- Dislike
- Comment
- Upload videos with thumbnail
- Profile settings
- Signout

## Run Locally

Clone the project

```bash
  git clone https://github.com/Priyadarshan-coder/Stream_Connect_App.git
```
Install all dependenies:
```bash
npm install
```

Go to the client folder:

```bash
  cd client
```

Install frontend dependencies:

```bash
  npm install
```

Start the vite server at localhost:5173:

```bash
  npm run dev

```
Start backend server at localhost:4000:

```bash
npm run dev



## Tech Stack

**Client:** React, Redux, TailwindCSS

**Server:** Node, Express 

# Tech Stack

- ReactJs
- Redux
- NodeJS
- Firebase
- PostGreSql
- Prisma
- Azure Blob
- Apache Kafka
