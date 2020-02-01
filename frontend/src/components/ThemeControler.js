import React, { useState } from 'react';
import Routers from './Routers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const myFirstContext = React.createContext();

function ThemeControler({ hijo }) {
  const [theme, setTheme] = useState('dark');

  const themeConfig = createMuiTheme({
    palette: {
      type: theme,
    },
  });

  const useDarkMode = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  }

  return (
      <ThemeControler theme={themeConfig}>
        <myFirstContext.Provider value={{useDarkMode, theme}}>
          {hijo}
        </myFirstContext.Provider>
      </ThemeControler>
  );
}

export { ThemeControler, myFirstContext }
