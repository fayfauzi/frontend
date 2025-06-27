import React, { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import TaskList from "./components/taskList";
import CreateTaskForm from "./components/createTaskForm";
import { Task, getTasks } from "./components/taskApi";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Box className="box">
        <div className="top-bar">
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Silkscreen", sans-serif',
              fontWeight: 400, // bold
              fontStyle: "normal",
            }}
          >
            Task Manager
          </Typography>
        </div>

        <div className="content">
          <div className="sidebar">
            <TaskList tasks={tasks} loading={loading} />
          </div>
          {/* <CreateTaskForm onTaskCreated={fetchTasks} /> */}
        </div>

        <div className="bottom-bar" />
      </Box>
    </Container>
  );
}

export default App;
