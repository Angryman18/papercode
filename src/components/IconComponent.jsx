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
  const {smallIcon, ...rest} = props

  switch (value) {
    case ext.JAVASCRIPT:
      return <DiJavascript1 {...rest} />;
    case ext.JAVA:
      return <DiJava {...rest} />;
    case ext["C++"]:
      return <SiCplusplus {...rest} />;
    case ext.TYPESCRIPT:
      return <SiTypescript {...rest} className={!smallIcon && 'h-10 w-10 text-white'} />; // overwriting className prop coz typscript icon is giant big
    case ext.PYTHON:
      return <DiPython {...rest} />;
    default:
      return <HiOutlineNewspaper {...rest} />;
  }
};

IconComponent.defaultProps = {
  value: null,
  smallIcon: false
};

export default IconComponent;
