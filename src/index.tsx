import ReactDOM from "react-dom/client";
import { App } from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

((): void => {
  const elem = document.getElementById("root");
  if (!elem) {
    console.error("no root node found");
    return;
  }
  const root = ReactDOM.createRoot(elem);

  root.render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Provider store={store}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>
  );
})();
