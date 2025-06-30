import {
  Card,
  Typography,
  CircularProgress,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Task, deleteTask } from "./taskApi";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import CreateTaskForm from "./createTaskForm";

interface Props {
  tasks: Task[];
  loading: boolean;
  onTasksUpdated: () => void; // callback to refetch tasks from parent
}

const PAGE_SIZE = 4;

export default function TaskList({ tasks, loading, onTasksUpdated }: Props) {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [page, setPage] = useState(1);

  if (loading) return <CircularProgress />;

  function formatDate(dateString?: string): string {
    if (!dateString) return "";
    try {
      const date = parseISO(dateString);
      return format(date, "MMMM dd, yyyy");
    } catch {
      return "";
    }
  }

  // Sort tasks by created_at descending (newest first)
  const sortedTasks = [...tasks].sort((a, b) => {
    const dateA = new Date(a.created_at || "").getTime();
    const dateB = new Date(b.created_at || "").getTime();
    return dateB - dateA;
  });

  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);

  const tasksToShow = sortedTasks.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  return (
    <>
      <Grid container spacing={2}>
        {tasksToShow.length === 0 ? (
          <Grid item xs={12} {...({} as any)}>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontFamily: '"Silkscreen", sans-serif',
                fontWeight: 400,
                fontStyle: "normal",
                padding: "2rem",
                color: "text.secondary",
              }}
            >
              Please add new task
            </Typography>
          </Grid>
        ) : (
          tasksToShow.map((task) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
              key={task.id}
              {...({} as any)}
              onClick={() => setSelectedTask(task)}
              sx={{
                borderBottom: "1px solid black",
                paddingBottom: "1rem",
                marginBottom: "1rem",
                cursor: "pointer",
                "&:last-child": {
                  borderBottom: "none",
                  marginBottom: 0,
                  paddingBottom: 0,
                },
              }}
            >
              <Card
                sx={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    paddingLeft: "1rem",
                    fontFamily: '"Silkscreen", sans-serif',
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  {task.title}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    paddingLeft: "1rem",
                    fontFamily: '"Silkscreen", sans-serif',
                    fontWeight: 400,
                    fontStyle: "normal",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <Typography>{task.description}</Typography>
                  <Typography>{formatDate(task.due_date)}</Typography>
                </div>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Pagination buttons */}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        {[...Array(totalPages)].map((_, i) => (
          <Button
            key={i}
            variant="text"
            onClick={() => setPage(i + 1)}
            sx={{
              marginX: 0.5,
              fontWeight: page === i + 1 ? "bold" : "normal",
              color: page === i + 1 ? "primary.main" : "text.primary",
              minWidth: "auto",
              padding: 0,
              textTransform: "none",
            }}
          >
            {i + 1}
          </Button>
        ))}
      </div>

      {/* View Task Dialog */}
      {selectedTask && (
        <Dialog
          open={true}
          onClose={() => setSelectedTask(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>{selectedTask.title}</DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              <strong>Description:</strong> {selectedTask.description}
            </Typography>
            <Typography gutterBottom>
              <strong>Status:</strong> {selectedTask.status}
            </Typography>
            <Typography gutterBottom>
              <strong>Priority:</strong> {selectedTask.priority}
            </Typography>
            <Typography gutterBottom>
              <strong>Due Date:</strong> {formatDate(selectedTask.due_date)}
            </Typography>
            <Typography gutterBottom>
              <strong>Created At:</strong> {formatDate(selectedTask.created_at)}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="error"
              onClick={async () => {
                await deleteTask(selectedTask.id);
                setSelectedTask(null);
                onTasksUpdated();
              }}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setEditingTask(selectedTask);
                setSelectedTask(null);
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Edit Task Dialog */}
      <Dialog
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        maxWidth="sm"
        fullWidth
      >
        <CreateTaskForm
          initialData={editingTask ?? undefined}
          onTaskCreated={() => {
            setEditingTask(null);
            onTasksUpdated();
          }}
        />
      </Dialog>
    </>
  );
}
