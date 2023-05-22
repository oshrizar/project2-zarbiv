import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  Switch,
  CssBaseline,
  AppBar,
  CircularProgress,
} from "@mui/material";

import { ToastContainer } from "react-toastify";

import "./App.css";
import MuiNavbar from "../src/components/Navbar/MuiNavbar";
import FooterComp from "../src/components/Navbar/MuiFooter";

import TableFooter from "@mui/material/TableFooter";

import Router from "./routes/Router";
import { useSelector } from "react-redux";
import useLoggedIn from "./hooks/useLoggedIn";

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

function App() {
   const [isLoading, setIsLoading] = useState(true);
   const loggedIn = useLoggedIn();
   useEffect(() => {
     (async () => {
       await loggedIn();
       setIsLoading(false);
     })();
   }, []);
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );

  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        theme="dark"
      />
     
      <Container>
        <header>
          <MuiNavbar />{" "}
        </header>
        <main> {isLoading ? <CircularProgress /> : <Router />}</main>

        <footer>
          <FooterComp />
        </footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
