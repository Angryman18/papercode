import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const OutputBox = styled(Box)(({ theme }) => ({
  ...theme,
  [theme.breakpoints.up("lg")]: {
    width: "400px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "600px",
  },
}));

const Output = () => {
  const outputResult = useSelector((state) => state.output);

  const showOutput = outputResult.status?.id !== 3 ? outputResult?.stderr : outputResult?.stdout;
  const status = outputResult.status?.id;

  return (
    <OutputBox sx={{ px: 2 }}>
      <Typography variant='h5'>Output</Typography>
      <Typography variant='caption'>Presss Ctrl + Enter to run your code</Typography>
      <Typography
        sx={{ fontFamily: "monospace", fontSize: "medium" }}
        color={status === 3 ? "green" : status === 1 ? "yellow" : "red"}
      >
        {showOutput}
      </Typography>
    </OutputBox>
  );
};

export default Output;
