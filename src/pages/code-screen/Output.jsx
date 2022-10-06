import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const Output = () => {
  const outputResult = useSelector((state) => state.output);

  const showOutput = outputResult.status.id !== 3 ? outputResult.stderr : outputResult.stdout;

  return (
    <Box sx={{ px: 2 }}>
      <Typography variant='h5'>Output</Typography>
      Presss Ctrl + Enter to run your code
      <Typography>{JSON.parse(showOutput)}</Typography>
    </Box>
  );
};

export default Output;
