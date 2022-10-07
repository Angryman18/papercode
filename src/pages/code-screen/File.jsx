import { Box } from "@mui/material";
import "./style.css";
import { DiJavascript1, DiJava, DiPython } from "react-icons/di";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { HiOutlineNewspaper } from "react-icons/hi";
import { LanguageSyntax as ext } from "helper/languages";
import { SiCplusplus, SiTypescript } from "react-icons/si";

const File = () => {
  const paperName = useSelector((state) => state?.codeEnv?.paperName);
  const paperLang = useSelector((state) => state.codeEnv?.paperLang);
  const paperLangExt = useSelector((state) => state?.codeEnv?.paperLangExt);

  let IconComponent = (props) => {
    switch (paperLangExt) {
      case ext.JAVASCRIPT:
        return <DiJavascript1 {...props} />;
      case ext.JAVA:
        return <DiJava {...props} />;
      case ext["C++"]:
        return <SiCplusplus {...props} />;
      case ext.TYPESCRIPT:
        return <SiTypescript {...props} />;
      case ext.PYTHON:
        return <DiPython {...props} />;
      default:
        return <HiOutlineNewspaper {...props} />;
    }
  };

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
      }}
    >
      <Box
        className='rounded-md bg-orange-900 no-select hover:bg-orange-800 duration-75 flex gap-x-2 items-center'
        sx={{ color: "#fff", px: 1, py: 0.5, cursor: "pointer" }}
      >
        <IconComponent className='h-4.5 w-4.5' />
        {paperName}.{paperLangExt.slice(0,10)}
      </Box>
    </Box>
  );
};

export default File;
