import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { deleteTask, getTasks, Task } from "./taskApi";
import { useState } from "react";

interface Props {
  tasks: Task[];
  loading: boolean;
}

export default function TaskList({ tasks, loading }: Props) {
  const [task, setTasks] = useState<Task[]>([]);
  if (loading) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      {tasks.map((task) => (
        <Grid item xs={12} md={6} lg={4} key={task.id} {...({} as any)}>
          <Card
            sx={{
              backgroundColor: "transparent", // or use your theme color var
              boxShadow: "none", // optional: remove default shadow
            }}
          >
            {/* <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  deleteTask(task.id)
                    .then(() => {
                      // Update local state after deletion
                      setTasks((prev: Task[]) =>
                        prev.filter((t) => t.id !== task.id)
                      );
                    })
                    .catch((err) => {
                      console.error("Delete failed", err);
                    });
                }}
              >
                Delete
              </Button> */}

            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Silkscreen", sans-serif',
                fontWeight: 400, // bold
                fontStyle: "normal",
              }}
            >
              {task.title}
            </Typography>
            {/* <Typography>{task.description}</Typography>
              <Typography>Status: {task.status}</Typography>
              <Typography>Priority: {task.priority}</Typography>
              <Typography>Due: {task.due_date}</Typography> */}
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
