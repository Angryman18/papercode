import { Box } from "@mui/material";
import "./style.css";
import IconComponent from "components/IconComponent";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const File = () => {
  const paperLang = useSelector((state) => state.codeEnv?.paperLang);
  const paperLangExt = useSelector((state) => state?.codeEnv?.paperLangExt);

  if (!paperLang || !paperLangExt) {
    return <Navigate to='/' />;
  }

  return (
    <Box
      sx={{
        width: 160,
        height: "100vh",
        overflow: "none",
        borderRight: "3px solid rgba(255,255,255,0.1)",
        backgroundColor: "1E1E1E",
        p: 1,
        fontFamily: "Fira Code",
      }}
    >
      <Box
        className='rounded-md bg-orange-900 no-select hover:bg-orange-800 duration-75 flex gap-x-2 items-center'
        sx={{ color: "#fff", px: 1, py: 0.5, cursor: "pointer" }}
      >
        <IconComponent smallIcons={true} className='h-4.5 w-4.5' />
         {'main.' + paperLangExt}
      </Box>
    </Box>
  );
};

export default File;
