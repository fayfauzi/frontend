import React, { useState } from "react";
import { Button, TextField, MenuItem, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTask, Task, updateTask } from "./taskApi";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import "./createForm.css";
import { Padding } from "@mui/icons-material";

interface Props {
  onTaskCreated: () => void;
  initialData?: Task | null;
}

function CreateTaskForm({ onTaskCreated, initialData }: Props) {
  type NewTask = Omit<Task, "id">;
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [priority, setPriority] = useState(initialData?.priority || "");
  const [status, setStatus] = useState(initialData?.status || "");
  const [dueDate, setDueDate] = useState(
    initialData?.due_date?.split("T")[0] || ""
  );
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: 1,
    due_date: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   try {
  //     await createTask(formData);
  //     alert("Task created!");
  //     setFormData({
  //       title: "",
  //       description: "",
  //       status: "pending",
  //       priority: 1,
  //       due_date: dayjs().format("YYYY-MM-DD"),
  //     });
  //     onTaskCreated(); // Call the parent callback
  //   } catch (err) {
  //     alert("Error creating task");
  //     console.error(err);
  //   }
  // };

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

  const inputStyle = { width: "130px", paddingBottom: "1rem" };
  const column = {
    width: "150px",
    paddingLeft: "1rem",
    paddingBottom: "1rem",
  };

  return (
    <div className="main-box">
      <div className="top-bar">
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Silkscreen", sans-serif',
            fontWeight: 400,
            fontStyle: "normal",
          }}
        >
          Add New Task
        </Typography>
      </div>
      <br />
      <Paper
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid size={6}>
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                sx={column}
              />
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={3}
                sx={column}
              />
            </Grid>
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Due Date"
                  value={dayjs(formData.due_date)}
                  onChange={(newValue: Dayjs | null) => {
                    setFormData({
                      ...formData,
                      due_date: newValue?.format("YYYY-MM-DD") || "",
                    });
                  }}
                  disablePast
                  slotProps={{
                    textField: {
                      name: "due_date",
                    },
                  }}
                  sx={inputStyle}
                />
              </LocalizationProvider>
              <TextField
                label="Priority"
                name="priority"
                type="number"
                value={formData.priority}
                onChange={handleChange}
                sx={inputStyle}
              />

              <TextField
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

              <Button variant="text" type="submit" sx={inputStyle}>
                save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}

export default CreateTaskForm;
