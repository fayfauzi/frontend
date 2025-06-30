import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTask, Task, updateTask } from "./taskApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "./createForm.css";

interface Props {
  onTaskCreated: () => void;
  initialData?: Task | null;
}

function CreateTaskForm({ onTaskCreated, initialData }: Props) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: 1,
    due_date: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "pending",
        priority: initialData.priority ?? 1,
        due_date:
          initialData.due_date?.split("T")[0] || dayjs().format("YYYY-MM-DD"),
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData) {
        // Update mode
        const updatedTask: Task = {
          ...initialData, // preserves id and created_at
          ...formData,
          priority: Number(formData.priority), // ensure it's number
        };

        await updateTask(updatedTask);
        alert("Task updated!");
      } else {
        // Create mode
        const newTask: Omit<Task, "id" | "created_at"> = {
          ...formData,
          priority: Number(formData.priority), // ensure it's number
        };

        await createTask(newTask);
        alert("Task created!");
      }

      // Reset the form after success
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: 1,
        due_date: dayjs().format("YYYY-MM-DD"),
      });

      onTaskCreated(); // Refresh + close dialog
    } catch (err) {
      alert("Error submitting task");
      console.error(err);
    }
  };

  const inputStyle = { mb: 2 };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: "1rem" }}>
      <Typography
        variant="h6"
        sx={{
          fontFamily: '"Silkscreen", sans-serif',
          fontWeight: 400,
          mb: 3,
          textAlign: "center",
        }}
      >
        Add New Task
      </Typography>

      <Paper elevation={0} sx={{ p: 3, bgcolor: "background.paper" }}>
        <form onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} {...({} as any)}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={inputStyle}
              />
            </Grid>

            <Grid item xs={12} sm={6} {...({} as any)}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={formData.due_date ? dayjs(formData.due_date) : null}
                  onChange={(newValue) =>
                    setFormData({
                      ...formData,
                      due_date: newValue ? newValue.format("YYYY-MM-DD") : "",
                    })
                  }
                  disablePast
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      sx: inputStyle,
                    },
                  }}
                />
              </LocalizationProvider>

              <TextField
                fullWidth
                label="Priority"
                name="priority"
                type="number"
                value={formData.priority}
                onChange={handleChange}
                sx={inputStyle}
              />

              <TextField
                fullWidth
                label="Status"
                name="status"
                select
                value={formData.status}
                onChange={handleChange}
                sx={inputStyle}
              >
                <MenuItem value="pending">Pending</MenuItem>
                <MenuItem value="in progress">In Progress</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
              </TextField>

              <Button
                fullWidth
                variant="contained"
                type="submit"
                sx={{ mt: 3 }}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default CreateTaskForm;
