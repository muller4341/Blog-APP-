import { useSelector } from "react-redux";
import {PropTypes } from "prop-types";

const ThemeProvider= ({children})=>  {
const {theme} = useSelector((state=>state.theme) );
console.log('theme', theme)

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
const themeClass = theme === 'light' ? 'bg-white text-black' : 'dark:bg-black dark:text-white';

    console.log('themeClass', themeClass)

  return (
    <div className={themeClass}>
      {/* <div className="bg-white text-black dark:bg-black dark:text-white">
     
     </div> */}
     {children}

    </div>
  );
}   

export default ThemeProvider;

