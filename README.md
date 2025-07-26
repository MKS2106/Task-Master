# Task Master API - Productivity Inc

This backend project provides a simple and secure user authentication system using **Node.js**, **Express**, **MongoDB**, **bcrypt**, and **JWT**. It allows users to register and log in to the Productivity portal and manage projects and tasks.

## Features
#### Authenticated user profile acces
- User Login with JWT authentication

#### Project Management
- Create, Read, Update and Delete projects
- Each project is owned by a user

#### Task Management 
- Create, Read, Update and Delete Tasks nested under respective projects
- Tasks are protcted by project ownerhip verification
- MongoDB integration via Mongoose
- Secure password handling using bcrypt
- Environment-based configuration using dotenv 
- Modular Code Structure

## Technologies Used
- Node.js  
- Express.js  
- JSON for data exchange  
- DataBase: MongoDB Atlas
- ODM: Mongoose
- Environment Management: dotenv
- bcrypt
- JWT

### Prerequisites
- Node.js installed on your machine  
- nodemon Installed(npm i -D nodemon)
- dotenv Installed(npm i dotenv)
- mongoose Installed(npm i mongoose)
- express installed (npm i express)
- Postman installed
- install bcrypt library (npm install bcrypt)
- install jsonwebtoken (npm install jsonwebtoken)

### Steps to run 
- Clone the repository 
- Navigate to project directory(cd to directory)
- Install dependencies npm init y 
- Update pakage.json file as per requirement
- Add and update .env file and add the DB connection key
- Run the server (npm run dev)

### API End points for Users:
- POST : 
1. `/api/users/register`
request body:
{
    "username": "user1",
     "email": "user1@test.com",
    "password": "password"

}
2. `/api/users/login`
request body:
{
    "email": "user1@test.com",
    "password": "password"

}

### API end pounts for Projects
- POST
1. `api/projects/`
request body:
{
    "name": "string",
    "description": "string"

}

2. GET
`api/projects/`

3. PUT
`api/projects/:projectid`
request body:
{
    "name": "string",
    "description": "string"
   
}

4. DELETE
`api/projects/:projectid`

### API end pounts for tasks
- POST: post a new task under a project
 `api/tasks/:projectId/tasks`
request body:
{
    "title": "string",
    "description": "string"

}

2. GET: All tasks of a secific project
`api/tasks/:projectId/tasks`

3. PUT
`api/tasks/:taskid`
request body:
{
    "title": "string",
    "description": "string"
   
}

4. DELETE
`api/tasks/:taskid`

### Full Flow Steps
1. register with username, email, password
2. Login with email, password --> token will be generated
3. Provide the generated token for the Authorization in postman 
4. carryout request for projects ansd tasks api s with the mentioned endpoints