import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { Box, Button } from "@mui/material";

const CreateModal = ({open, toggle}) => {
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
            helperText="not mandatory"
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={toggle}>Cancel</Button>
        <LoadingButton loading={false} variant='contained' onClick={toggle}>
          Create Paper
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;