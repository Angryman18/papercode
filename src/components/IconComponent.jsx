// PACKAGES
import { useSelector } from "react-redux";
// ICONS
import { DiJavascript1, DiJava, DiPython } from "react-icons/di";
import { HiOutlineNewspaper } from "react-icons/hi";
import { SiCplusplus, SiTypescript } from "react-icons/si";
// UTILS
import { LanguageSyntax as ext } from "helper/languages";

const IconComponent = (props) => {
  const paperLangExt = useSelector((state) => state?.codeEnv?.paperLangExt);
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

export default IconComponent;
