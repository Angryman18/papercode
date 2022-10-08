import { Snackbar, Slide, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";

const Notification = ({ status, toggle, msg }) => {
  const action = (
    <IconButton size='small' aria-label='close' color='inherit' onClick={toggle}>
      <IoClose fontSize='large' />
    </IconButton>
  );
  return (
    <Snackbar
      open={status}
      autoHideDuration={5000}
      onClose={toggle}
      TransitionComponent={Slide}
      resumeHideDuration={3000}
      message={msg}
      action={action}
    />
  );
};

export default Notification;
