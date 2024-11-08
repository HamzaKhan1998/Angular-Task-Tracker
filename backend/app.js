import express from 'express';
//import fs from 'fs';
import fs from 'node:fs/promises';
import path from 'path';
import bodyParser from "body-parser";

const app = express();
app.use(express.static("images"));
app.use(bodyParser.json());
//const tasksFilePath = path.join("C:", "Users", "HamzaKhan", "course-app", "backend", "data", "tasks.json");
const tasksFilePath = 'C:\\Users\\HamzaKhan\\course-app\\backend\\data\\tasks.json';


// CORS

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); 
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  next();
});

app.get("/tasks", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const fileContent = await fs.readFile("./data/tasks.json");

  //console.log(fileContent);

  const tasks = JSON.parse(fileContent);

  res.status(200).json({ data: tasks });
});

app.get("/users", async (req, res) => {
  const fileContent = await fs.readFile("./data/users.json");
  //console.log(fileContent);
  const users = JSON.parse(fileContent);

  res.status(200).json({ data: users });
});


app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  //console.log(id);
  const data = await fs.readFile("./data/tasks.json");
  const tasks = JSON.parse(data);
  //console.log(tasks)

  const updatedTasks = tasks.filter(task => task.id !== id);

  if (tasks.length === updatedTasks.length) {
    console.log('Task not found.');
    return;
  }

  await fs.writeFile(tasksFilePath, JSON.stringify(updatedTasks, null, 2));
  console.log(`Task with id ${id} deleted successfully.`);
  res.status(200).json({ message: 'Task deleted successfully.' });
  //console.log("after task deleted");
});

app.post('/tasks', async (req, res) => {
  console.log("req ",req);
  const newTask = req.body;

  //newTask.id = newTask.id || `t${Date.now()}`;
  console.log("newTask with id: ",newTask.id);
  try {
    const data = await fs.readFile("./data/tasks.json");
    const tasks = JSON.parse(data);

    tasks.push(newTask);

    await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2));

    res.status(201).json({ message: 'Task added successfully!', task: newTask });
  } catch (err) {
    console.error('Error adding task:', err);
    res.status(500).json({ error: 'Failed to add task.' });
  }
});


// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

app.listen(3000);