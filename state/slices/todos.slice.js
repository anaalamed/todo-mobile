import { createSlice } from "@reduxjs/toolkit";

const todos_slice = createSlice({
  name: "todos",
  initialState: {
    todo: [],
    is_loading: false,
    error_msg: "",
  },
  reducers: {
    getTodos: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      state.todo.unshift(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todo = state.todo.filter(todo => todo.id !== action.payload);
    },
    toggleComplete: (state, action) => {
      const index = state.todo.findIndex(item => item.id === action.payload.id);
      state.todo[index].completed = action.payload.completed;
    },
    updateTodo: (state, action) => {
      const index = state.todo.findIndex(item => item.id === action.payload.id);
      state.todo[index].title = action.payload.title;
    },
  }
});

export default todos_slice.reducer;
export const {getTodos, addTodo, deleteTodo, toggleComplete, updateTodo} = todos_slice.actions;