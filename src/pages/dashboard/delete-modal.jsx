// PACKAGES
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from "@mui/material";

const DeleteModal = ({ showModal, toggle, handleDeleteAction, paperInfo }) => {
  return (
    <Dialog
      open={showModal}
      onClose={toggle}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure you want to delete the paper named <b>"{paperInfo?.paperName}"</b> ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <Button onClick={handleDeleteAction} autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
