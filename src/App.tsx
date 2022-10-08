import React, { useState } from "react";
import { teal } from "@mui/material/colors";
import { Paper, Tab, Tabs } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import LabTestCalculator from "./calculators/LabTestCalculator";
import CssBaseline from "@mui/material/CssBaseline";
import Footer from "./Footer";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
});

const PageBody = styled(Box)({
  margin: theme.spacing(2),
});

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

function getCurrentPageInfo(index: number): { title: string, body: JSX.Element } {
  switch (index) {
    case 0: return {
      title: "When should I schedule my lab tests?",
      body: <LabTestCalculator/>
    } 
    default: {
      return {
        title: "Not Found",
        body: <p>The page you are looking for could not be found</p>
      }
    }
  }
}

function App() {
  const [value, setValue] = useState(0);
  const currentPageInfo = getCurrentPageInfo(value);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={(e, v) => setValue(v)} 
            variant="scrollable"
            scrollButtons="auto"
            aria-label="select calculator">
            <Tab label="Lab Test Scheduling" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <PageBody>
          <h1>{currentPageInfo.title}</h1>
          <Paper elevation={3}>
            {currentPageInfo.body}
          </Paper>
          <Footer />
        </PageBody>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
