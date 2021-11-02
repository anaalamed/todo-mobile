import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import rootReducer from "./root.reducer";
import logger from "./middleware/logger.middleware";
import {
  save_state_locally,
  get_local_state
} from "./middleware/localstorage.middleware";

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: get_local_state(),
  middleware: [...getDefaultMiddleware(), logger, save_state_locally],
  devTools: process.env.NODE_ENV !== "production"
});

// setAuthToken(localStorage.jwtToken);

// Enable Webpack hot module replacement for reducers
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./root.reducer", () => {
    store.replaceReducer(rootReducer);
  });
}
export default store;
