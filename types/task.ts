export interface Task {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  createdAt: string;
}

export interface CreateTaskPayload {
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
}
