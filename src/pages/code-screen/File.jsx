import { Box, colors } from "@mui/material";
import './style.css'
import {DiJavascript1} from 'react-icons/di'

const File = () => {
  return (
    <Box
      sx={{
        width: 160,
        height: "100vh",
        overflow: "none",
        borderRight: "3px solid rgba(255,255,255,0.1)",
        backgroundColor: "1E1E1E",
        p: 1
      }}
    >
      <Box
        className='rounded-md bg-orange-900 no-select hover:bg-orange-800 duration-75 flex gap-x-2 items-center'
        sx={{ color: "#fff", px: 1, py: 0.5, cursor: "pointer" }}
      >
          <DiJavascript1 className="h-4.5 w-4.5" />
        index.js
      </Box>
    </Box>
  );
};

export default File;
