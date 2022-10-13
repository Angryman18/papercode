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
  const value = props?.value || paperLangExt;
  const smallIcons = props.smallIcons;

  switch (value) {
    case ext.JAVASCRIPT:
      return <DiJavascript1 {...props} />;
    case ext.JAVA:
      return <DiJava {...props} />;
    case ext["C++"]:
      return <SiCplusplus {...props} />;
    case ext.TYPESCRIPT:
      return <SiTypescript {...props} className={!smallIcons && 'h-10 w-10 text-white'} />; // overwriting className prop coz typscript icon is giant big
    case ext.PYTHON:
      return <DiPython {...props} />;
    default:
      return <HiOutlineNewspaper {...props} />;
  }
};

IconComponent.defaultProps = {
  value: null,
  smallIcons: null
};

export default IconComponent;
