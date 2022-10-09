import { Box, styled, Typography } from "@mui/material";
import { useSelector } from "react-redux";

const OutputBox = styled(Box)(({ theme }) => ({
  ...theme,
  fontFamily: "Fira Code",
  [theme.breakpoints.up("lg")]: {
    width: "400px",
  },
  [theme.breakpoints.up("xl")]: {
    width: "600px",
  },
}));

const MTypography = styled(Typography)(({ theme }) => ({
  ...theme,
  fontFamily: "Fira Code",
  whiteSpace: "pre-line;",
}));

const Output = () => {
  const outputResult = useSelector((state) => state.output);

  let showOutput;
  switch (outputResult.status) {
    case 11:
      showOutput = outputResult.stdout;
    default:
      showOutput = outputResult.stdout;
  }

  const status = outputResult.status?.id;

  const OutputLoader = () => {
    if (outputResult?.loading) {
      return <MTypography sx={{ fontSize: "0.9rem" }}>Running Code...</MTypography>;
    } else {
      return (
        <MTypography
          sx={{ fontSize: "0.9rem" }}
          color={status === 3 ? "#6abe83" : status === 1 ? "yellow" : "red"}
        >
          {showOutput}
        </MTypography>
      );
    }
  };

  return (
    <OutputBox sx={{ px: 2 }}>
      <MTypography sx={{ fontWeight: "bold" }} variant='h5'>
        Output
      </MTypography>
      <MTypography variant='caption'>Presss Ctrl + Enter to run your code</MTypography>
      <OutputLoader />
    </OutputBox>
  );
};

export default Output;
