import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ROUTES from "../../routes/ROUTES";
import NavLinkComponent from "./NavLinkComponents";
import { Typography } from "@mui/material";
const pages = [
  {
    label: (
      <img
        width={40}
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

const favcard = [{ label: "הכרטיסים המועדפים", url: ROUTES.FAVCARDS }];
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

const Hamburger = () => {
  const isLoggedIn = useSelector(
    (bigPieBigState) => bigPieBigState.authSlice.isLoggedIn
  );
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const dispatch = useDispatch();

  const handleOpenNavBizMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavBizMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        flex: 1,
        display: { xs: "flex", md: "none" },
        justifyContent: "flex-end",
      }}
    >
      <IconButton size="large" onClick={handleOpenNavBizMenu} color="inherit">
        <MenuIcon />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavBizMenu}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        {pages.map((page) => (
          <NavLinkComponent
            onClick={handleCloseNavBizMenu}
            key={page.url}
            {...page}
          />
        ))}
        {isLoggedIn
          ? favcard.map((page) => (
              <NavLinkComponent
                onClick={handleCloseNavBizMenu}
                key={page.url}
                {...page}
              />
            ))
          : notAuthPages.map((page) => (
              <NavLinkComponent
                onClick={handleCloseNavBizMenu}
                key={page.url}
                {...page}
              />
            ))}
        {isLoggedIn && payload.biz
          ? isBiz.map((page) => (
              <NavLinkComponent
                onClick={handleCloseNavBizMenu}
                key={page.url}
                {...page}
              />
            ))
          : ""}
        {isLoggedIn && payload.isAdmin
          ? isAdmin.map((page) => (
              <NavLinkComponent
                onClick={handleCloseNavBizMenu}
                key={page.url}
                {...page}
              />
            ))
          : ""}
      
      </Menu>
    </Box>
  );
};
export default Hamburger;
