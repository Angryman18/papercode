import AppRouting from "router/react-router";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";
import Notification from "components/Notification";
import { deleteNotifications } from "actions/snack.action";

function App(props) {
  const { snacks } = props;

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      const showNotificationGlimpse = setTimeout(() => {
        deleteNotifications();
        clearTimeout(showNotificationGlimpse);
      }, 1000);
      return;
    }
    deleteNotifications();
  };

  return (
    <BrowserRouter>
      <AppRouting />
      <Notification status={snacks?.status} msg={snacks?.message} toggle={handleClose} />
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  const snacks = state?.snacks;
  return { snacks };
};

export default connect(mapStateToProps)(App);
