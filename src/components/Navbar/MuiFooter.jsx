import * as React from "react";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import InfoTwoToneIcon from "@mui/icons-material/InfoTwoTone";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import { AppBar, Container, IconButton, Typography } from "@mui/material";
import ROUTES from "../../routes/ROUTES";
import { useSelector } from "react-redux";
import { Fragment } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import ShareIcon from '@mui/icons-material/Share';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import WorkIcon from '@mui/icons-material/Work';
const Footer = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
  const isLoggedIn = useSelector((bigState) => bigState.authSlice.isLoggedIn);
  const fav = ()=>{
   navigate(ROUTES.FAVCARDS)
  }
  const myCards = () =>{
    navigate(ROUTES.MYCARDS)
  }
  const about = () =>{
    navigate(ROUTES.ABOUT)
  }
  return (
    <footer>
      <AppBar position="static" color="warning">
        <Container maxWidth="xl">
          <Typography variant="h5" align="center" fontWeight={700}>
            © האתר נבנה על ידי אושרי זרביב
          </Typography>

          <BottomNavigation
            showLabels
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="אודות"
              icon={<InfoTwoToneIcon />}
              onClick={about}
              color="warning"
            />
            {isLoggedIn && (payload.biz || payload.isAdmin) ? (
              <BottomNavigationAction
                label="הכרטסים שלי"
                onClick={myCards}
                icon={<WorkIcon />}
              />
            ) : (
              " "
            )}

            {isLoggedIn ? (
              <BottomNavigationAction
                label="הכרטיסים המועדפים"
                onClick={fav}
                icon={<FavoriteTwoToneIcon />}
                color="warning"
              />
            ) : (
              " "
            )}
                          {isLoggedIn ? (
              <BottomNavigationAction href="https://www.facebook.com/"
                label="שיתוף"
                
                icon={<ShareIcon />}
                color="warning"
              />
            ) : (
              " "
            )}
                {isLoggedIn ? (
              <BottomNavigationAction href="https://wa.me/972546464092 "
                label="שאלות"
                
                icon={<WhatsAppIcon />}
                color="warning"
              />
            ) : (
              " "
            )}
          </BottomNavigation>
        </Container>
      </AppBar>
    </footer>
  );
};
export default Footer;
