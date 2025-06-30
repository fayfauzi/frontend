import axios from "axios";

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: string;
  priority: number;
  due_date?: string;
  created_at?: string;
}

const API_BASE = "http://localhost:5000/api";

export const getTasks = async (searchTerm = ""): Promise<Task[]> => {
  const res = await axios.get<Task[]>(`${API_BASE}/tasks`, {
    params: searchTerm ? { search: searchTerm } : {},
  });
  return res.data;
};

export const createTask = async (
  task: Omit<Task, "id" | "created_at">
): Promise<Task> => {
  const res = await axios.post<Task>(`${API_BASE}/tasks`, task);
  return res.data;
};

export const updateTask = async (task: Task): Promise<Task> => {
  const res = await axios.put<Task>(`${API_BASE}/tasks/${task.id}`, task);
  return res.data;
};

export const deleteTask = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/tasks/${id}`);
};
