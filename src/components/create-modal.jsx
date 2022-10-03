// PACKAGES
import { useState } from "react";

// COMPONENTS
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

const defaultState = {
  paperLang: "",
  paperName: "",
};

const CreateModal = ({ open, toggle, loading, handleCreateButton }) => {
  const [paperInfo, setPaperInfo] = useState({ ...defaultState });

  const getInputValue = (e) => {
    setPaperInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const createPaperHandler = (e) => {
    e.preventDefault();
    if (!paperInfo.paperLang) return;
    handleCreateButton(paperInfo);
  };

  return (
    <Dialog maxWidth='xs' fullWidth={true} open={open} onClose={toggle}>
      <DialogTitle>Create a Blank Paper</DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2, display: "flex", flexDirection: "column", gap: "10px" }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>Paper Language</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              label='Paper Language'
              name='paperLang'
              onChange={getInputValue}
            >
              <MenuItem value='javascript'>NodeJS</MenuItem>
              <MenuItem value='typescript'>Typescript</MenuItem>
              <MenuItem value='python'>Python</MenuItem>
              <MenuItem value='java'>Java</MenuItem>
              <MenuItem value='c++'>C++</MenuItem>
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            id='name'
            label='Paper Name'
            type='text'
            fullWidth
            helperText='not mandatory'
            variant='outlined'
            name='paperName'
            value={paperInfo.paperName}
            onChange={getInputValue}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <LoadingButton
          loading={loading}
          variant='contained'
          disabled={!paperInfo.paperLang}
          onClick={createPaperHandler}
        >
          Create Paper
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

CreateModal.defaultProps = {
  loading: false,
  handleCreateButton: () => {},
};

export default CreateModal;
