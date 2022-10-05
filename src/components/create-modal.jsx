// PACKAGES
import { useState, useEffect } from "react";

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

// UTILS
import { Languages } from "helper/languages";

const defaultState = {
  paperLang: "",
  paperName: "",
};

const CreateModal = ({ open, toggle, loading, handleCreateButton }) => {
  const [paperInfo, setPaperInfo] = useState({ ...defaultState });

  const getInputValue = (e) => {
    setPaperInfo((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    setPaperInfo({ ...defaultState });
  }, [open]);

  const createPaperHandler = (e) => {
    e.preventDefault();
    if (!paperInfo.paperLang || !paperInfo.paperName) return;
    const paperLangExt = Languages.find(i => i.name === paperInfo.paperLang).ext
    paperInfo.paperLangExt = paperLangExt
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
              value={paperInfo.paperLang}
            >
              {Languages.map((item) => {
                return <MenuItem key={item.ext} value={item.name}>{item.display}</MenuItem>;
              })}
            </Select>
          </FormControl>
          <TextField
            margin='dense'
            id='name'
            label='Paper Name'
            type='text'
            fullWidth
            helperText='* name of your file'
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
          disabled={!paperInfo.paperLang || paperInfo.paperName.length < 3}
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
