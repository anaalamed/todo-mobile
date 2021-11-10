import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
  description?: string
  createdAt: Date
  updatedAt?: Date
}

interface TodosState {
  todos: Array<Todo>
  filteredTodos: Array<Todo>
  is_loading: boolean
  error_msg: string
}

const initialState: TodosState = {
  todos: [],
  filteredTodos: [],
  is_loading: false,
  error_msg: ''
}

const todos_slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
      state.filteredTodos = action.payload
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
      state.filteredTodos.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.filteredTodos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.todos.findIndex(item => item.id === action.payload.id);
      state.todos[index].completed = action.payload.completed;
      state.todos[index].updatedAt = action.payload.updatedAt;

      const indexF = state.filteredTodos.findIndex(item => item.id === action.payload.id);
      state.filteredTodos[indexF].completed = action.payload.completed;
      state.filteredTodos[indexF].updatedAt = action.payload.updatedAt;
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(item => item.id === action.payload.id);
      state.todos[index] = action.payload;

      const indexF = state.filteredTodos.findIndex(item => item.id === action.payload.id);
      state.filteredTodos[indexF] = action.payload;
    },
    removeTodos: (state) => {
      state.todos = [];
      state.filteredTodos = [];
    },
    filterTodos: (state, action) => {
      state.filteredTodos = action.payload;
    }
  }
});

export default todos_slice.reducer;
export const { getTodos, addTodo, deleteTodo, toggleComplete, updateTodo, removeTodos, filterTodos } = todos_slice.actions;