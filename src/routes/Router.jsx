import { Link, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import AboutPage from "../pages/AboutPage";
import EditCardPage from "../pages/EditCardPage";
import ROUTES from "./ROUTES";
import { Typography } from "@mui/material";
import MyCards from "../pages/Mycards";
import LogoutPags from "../pages/LogoutPags";
import ProtectedRoute from "../components/ProtectedRoute";
import SuperProtectedRoute from "../components/SoperProtectedRoute";
import FavCards from "../pages/FavCards";
import MoreInformation from "../pages/MoreInformation";
import SandBox from "../pages/Sandbox";
import NestedPage1 from "../pages/NestedRoutePage/NestedPage1";
import NestedPage2 from "../pages/NestedRoutePage/NestedPage2";
import ProtectedEditRoute from "../components/ProtectedEditRoute";
import ProfilePage from "../pages/ProfilePage";
import RRPButtonParcial from "../pages/ReRenderPage/RRPButtonParcial";
import RRPH3Parcial from "../pages/ReRenderPage/RRPH3Parcial";
import CreateCardPage from "../pages/CreateCardPage";
import ShareIcon from '@mui/icons-material/Share';
let Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />

      <Route
        path={ROUTES.LOGOUT}
        element={<ProtectedRoute element={<LogoutPags />} />}
      />
      <Route path={ROUTES.MYCARDS} element={<MyCards />} />

      <Route path={ROUTES.FAVCARDS} element={<FavCards />} />
      <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
     

      <Route
        path="/edit/:id"
        element={
          <ProtectedEditRoute
            isAdmin={true}
            isBiz={true}
            element={<EditCardPage />}
          />
        }
      />

      <Route
        path="/create"
        element={
          <SuperProtectedRoute
            isAdmin={false}
            isBiz={true}
            element={<CreateCardPage />}
          />
        }
      />

      <Route path="/moreInformation/:id" element={<MoreInformation />} />
      <Route
        path="/sandbox"
        element={
          <SuperProtectedRoute
            isAdmin={true}
            isBiz={false}
            element={<SandBox />}
          />
        }
      >
        <Route path="nestedpage1" element={<NestedPage1 />} />
        <Route path="nestedpage2" element={<NestedPage2 />} />
        <Route path="RRPButtonParcial" element={<RRPButtonParcial />} />
        <Route path="RRPH3Parcial" element={<RRPH3Parcial />} />
      </Route>

      <Route
        path="*"
        element={
          <Link to={ROUTES.HOME}>
            <Typography>
          .הדף לא קיים לחץ כדי לחזור לדף הבית
            </Typography>
          </Link>
        }
      />
    </Routes>
  );
};
export default Router;
