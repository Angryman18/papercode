import AppRouting from "router/react-router";
import { BrowserRouter, Routes } from "react-router-dom";
import { connect } from "react-redux";
import Notification from "components/Notification";
import { deleteNotifications } from "actions/snack.action";

function App(props) {
  const { snacks, dispatch } = props;
  // useEffect(() => {
  //   (async () => {
  //     try {
  //       const resp = await graphqlQuery(getCodeQuery);
  //       setCode(JSON.parse(resp.data?.testcode[0].code));
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      const showNotificationGlimpse = setTimeout(() => {
        deleteNotifications();
        clearTimeout(showNotificationGlimpse)
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
