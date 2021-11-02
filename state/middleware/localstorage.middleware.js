export const save_state_locally = store => next => action => {
  next(action);
  localStorage.setItem("app_data", JSON.stringify(store.getState()));
};

export const get_local_state = () =>
  JSON.parse(localStorage.getItem("app_data")) || {};
