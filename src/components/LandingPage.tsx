import * as React from 'react';
import { PaletteMode,  } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './AppBar';


export default function LandingPage() {
    const [mode, setMode] = React.useState<PaletteMode>('light');
      const defaultTheme = createTheme({ palette: { mode } });
    const toggleColorMode = () => {
        setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
        </ThemeProvider>
    );
}
