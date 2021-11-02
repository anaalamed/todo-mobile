const logger = store => next => action => {
  console.group(action.type);
  console.log(
    `%c prev state`,
    "background: magenta; color: blue",
    store.getState()
  );
  console.info("action", action);
  next(action);
  console.log(
    `%c next state`,
    "background: yellow; color: blue",
    store.getState()
  );
  console.groupEnd();
};
export default logger;
