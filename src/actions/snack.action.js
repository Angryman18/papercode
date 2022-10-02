import store from "store/redux";
import { getSnacks, deleteSnack } from "reducer/SnackReducer";

const pushNotification = (msg) => {
  return store.dispatch(getSnacks(msg));
};

const deleteNotifications = () => {
  return store.dispatch(deleteSnack());
};

export { pushNotification, deleteNotifications };
