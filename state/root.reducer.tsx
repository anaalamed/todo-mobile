import { combineReducers } from "redux";
import todos_slice from "./slices/todos.slice";
import users_slice from "./slices/users.slice";


const rootReducer = combineReducers({
  todos: todos_slice,
  users: users_slice
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>