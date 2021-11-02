import { createSlice } from "@reduxjs/toolkit";

interface Todo {
  id: string
  title: string
  completed: boolean
  userId: string
}

interface TodosState {
  todos: Array<Todo>
  is_loading: boolean
  error_msg: string
}

const initialState: TodosState = {
  todos: [],
  is_loading: false,
  error_msg: ''
}

const todos_slice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    getTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.todos.findIndex(item => item.id === action.payload.id);
      state.todos[index].completed = action.payload.completed;
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(item => item.id === action.payload.id);
      state.todos[index].title = action.payload.title;
    },
    removeTodos: (state) => {
      state.todos = [];
    }
  }
});

export default todos_slice.reducer;
export const { getTodos, addTodo, deleteTodo, toggleComplete, updateTodo, removeTodos } = todos_slice.actions;