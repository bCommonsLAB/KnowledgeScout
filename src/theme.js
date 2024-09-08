import { createTheme } from '@mui/material/styles';

const getTheme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode
          primary: {
            main: '#1976d2',
          },
          secondary: {
            main: '#f50057',
          },
          background: {
            default: '#f5f5f5',
            paper: '#ffffff',
          },
          header: {
            background: '#e0e0e0',
            text: '#333333',
          },
          footer: {
            background: '#e0e0e0',
            text: '#333333',
          },
          paperBackground: '#ffffff',
        }
      : {
          // Dark mode
          primary: {
            main: '#90caf9',
          },
          secondary: {
            main: '#f48fb1',
          },
          background: {
            default: '#303030',
            paper: '#424242',
          },
          header: {
            background: '#212121',
            text: '#ffffff',
          },
          footer: {
            background: '#212121',
            text: '#ffffff',
          },
          paperBackground: '#424242',
        }),
  },
  typography: {
    fontSize: 11,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#e0e0e0' : '#212121',
          color: mode === 'light' ? '#333333' : '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: mode === 'light' ? '#ffffff' : '#424242',
        },
      },
    },
  },
});

export default getTheme;
