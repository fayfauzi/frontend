import React, { useEffect, useState } from "react";
import { Box, Container, Dialog, Typography } from "@mui/material";
import TaskList from "./components/taskList";
import CreateTaskForm from "./components/createTaskForm";
import { Task, getTasks } from "./components/taskApi";
import "./App.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [setEditingTask] = useState<Task | null>(null);

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const result = await getTasks(searchTerm);
      setTasks(result);
      setLoading(false);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <Container sx={{ mt: 4 }}>
      <Box className="box">
        <div className="top-bar">
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Silkscreen", sans-serif',
              fontWeight: 400,
              fontStyle: "normal",
            }}
          >
            Task Manager
          </Typography>
        </div>
        <div className="content">
          <div className="sidebar">
            <div className="task-section">
              <div className="search-bar">
                <input
                  id="search"
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "6px",
                    border: "1px solid #ccc",
                    fontSize: "14px",
                    marginBottom: "1rem",
                    width: "100%", // optional
                  }}
                />
              </div>
              <TaskList
                tasks={tasks}
                loading={loading}
                onTasksUpdated={fetchTasks}
              />
            </div>
          </div>
          <AddCircleOutlineIcon
            fontSize="large"
            sx={{
              color: "#f9a8d4",
              paddingLeft: "330px",
              paddingTop: "1rem",
              cursor: "pointer",
            }}
            onClick={() => setShowForm(true)}
          />
          <Dialog
            open={showForm}
            onClose={() => setShowForm(false)}
            maxWidth="sm"
          >
            <CreateTaskForm
              onTaskCreated={() => {
                fetchTasks();
                setShowForm(false);
              }}
            />
          </Dialog>
        </div>

        <div
          className="bottom-bar"
          style={{ textAlign: "left", padding: "1rem" }}
        >
          {tasks.length > 0 ? (
            <Typography variant="body2" color="text.secondary">
              {tasks.length} task{tasks.length > 1 ? "s" : ""} added
            </Typography>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No task :(
            </Typography>
          )}
        </div>
      </Box>
    </Container>
  );
}

export default App;
