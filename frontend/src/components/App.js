import React, { useState } from 'react';
import Routers from './Routers';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const useDarkMode = ()=>{
  const [themeType, setThemeType] = useState("light");

  const themeObject = {
    palette: {
      type: themeType
    }
  }

  const [theme, setTheme] = useState(themeObject);

  const { palette: {type} } = theme;

  const toggle = ()=>{
    const updateStyle = {
      ...theme,
      palette: {
        ...theme.palette,
        type: type === 'light' ? 'dark' : 'light'
      }
    }
    setTheme(updateStyle);
  }
  return [theme, toggle];
}

export default function App() {
  const [theme, toggle] = useDarkMode();

  const ThemeConfig = createMuiTheme(theme);

  return (
    <ThemeProvider theme={ThemeConfig}>
      <CssBaseline />
      <button onClick={toggle} >X</button>
      <Routers />
    </ThemeProvider>
  );
}
