import { Todo } from "./Todo";

export interface TodoState {
  todos: Todo[];
  completedTodos: Todo[];
  loading: boolean;
  error: string | null;
}