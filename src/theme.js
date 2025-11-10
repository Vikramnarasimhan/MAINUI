import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#cc7626ff',      // Lime green (main accent)
      contrastText: '#FFFADC', // Cream text on green
    },
    secondary: {
      main: '#dd8521ff',      // Other green for highlights
      contrastText: '#FFFADC',
    },
    success: {
      main: '#da771aff',      // Green for alerts/notifications
    },
    background: {
      default: '#FFFADC',   // Page background
      paper: '#FFFADC',     // Cards, panels, etc.
    },
    info: {
      main: '#64B5F6',      // Accent blue for buttons or highlight areas
    },
    text: {
      primary: '#333',      // Standard readable text
      secondary: '#333', // Green for secondary text
    },
  },
  typography: {
    fontFamily: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'].join(','),
  },
});
export default theme;
