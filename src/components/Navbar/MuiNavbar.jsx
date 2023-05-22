import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Hamburger from "./Hamburger";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import SearchPartial from "./SearchPartial";
import { authActions } from "../../store/auth";
import { Container } from "@mui/material";
import { darkThemeActions } from "../../store/darkTheme";
import NavLinkComponent from "./NavLinkComponents";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Avatar from "@mui/material/Avatar";
import AvatarM from "./AvatrComponent";
import { NavLink } from "react-router-dom";
const pages = [
  {
    label: (
      <img
        width={30}
        src="https://cdn.pixabay.com/photo/2016/12/27/13/10/logo-1933884_960_720.png"
      />
    ),
    url: ROUTES.HOME,
  },
  {
    label: "אודות",
    url: ROUTES.ABOUT,
  },
];

const notAuthPages = [
  {
    label: "הרשמה",
    url: ROUTES.REGISTER,
  },
  {
    label: "התחברות",
    url: ROUTES.LOGIN,
  },
];


const favcard = [{ label: "כרטיס מעודפים", url: ROUTES.FAVCARDS }];
const isBiz = [
  {
    label: "הכרטיסים שלי",
    url: ROUTES.MYCARDS,
  },
];
const isAdmin = [
  {
    label: "Sandbox",
    url: ROUTES.SANDBOX,
  },
];

const MuiNavbar = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  
  const dispatch = useDispatch();
  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkThemeSlice.isDarkTheme
  );
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const changeTheme = () => {
    dispatch(darkThemeActions.changeTheme());
  };
 
  const handleOpenNavBizMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <NavLinkComponent key={page.url} {...page} />
            ))}
            {isLoggedIn
              ? favcard.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isLoggedIn && payload.biz
              ? isBiz.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {isLoggedIn && payload.isAdmin
              ? isAdmin.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : ""}
            {!isLoggedIn
              ? notAuthPages.map((page) => (
                  <NavLinkComponent key={page.url} {...page} />
                ))
              : " "}
          </Box>
          <SearchPartial />
          <Box sx={{ my: 2, p: 1 }}>
            <IconButton onClick={changeTheme}>
              {isDarkTheme ? <WbSunnyIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

          
          <NavLink>
            <AvatarM onClick={handleOpenNavBizMenu} />
          </NavLink>

          <Typography
            sx={{
              my: 2,

              display: { xs: " none", md: "block" },
              p: 1,
            }}
          ></Typography>

          <Hamburger />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MuiNavbar;
