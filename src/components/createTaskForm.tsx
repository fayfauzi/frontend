import React, { useState } from "react";
import { Button, TextField, MenuItem, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import { createTask } from "./taskApi";
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  onTaskCreated: () => void;
}

export default function CreateTaskForm({ onTaskCreated }: Props) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask(formData);
      alert("Task created!");
      setFormData({
        title: "",
        description: "",
        status: "pending",
        priority: 1,
        due_date: dayjs().format("YYYY-MM-DD"),
      });
      onTaskCreated(); // Call the parent callback
    } catch (err) {
      alert("Error creating task");
      console.error(err);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create Task
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} {...({} as any)}>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12} {...({} as any)}>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
          </Grid>
          <Grid item xs={6} {...({} as any)}>
            <TextField
              label="Status"
              name="status"
              select
              value={formData.status}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} {...({} as any)}>
            <TextField
              label="Priority"
              name="priority"
              type="number"
              value={formData.priority}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} {...({} as any)}>
            {/* <DatePicker
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
                  fullWidth: true,
                  name: "due_date",
                },
              }}
            /> */}
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
                    fullWidth: true,
                    name: "due_date",
                  },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} {...({} as any)}>
            <Button variant="contained" type="submit" fullWidth>
              Create Task
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
