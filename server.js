import express from "express"
import dotenv from "dotenv"
import db from "./config/connection.js";
import usersRouter from "./routes/userRoutes.js"
import projectsRouter from "./routes/projectRoutes.js"
import taskRouter from "./routes/taskRoutes.js"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/users', usersRouter)
app.use('/api/projects', projectsRouter)
app.use('/api/tasks', taskRouter)

app.get('/', (req,res) => {
  res.send("TaskMaster!")
})

db.once("open", () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});