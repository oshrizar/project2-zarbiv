import { Grid } from "@mui/material";
import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";

const SandBox = () => {
  return (
    <Fragment>
      <h1>Nested page</h1>
      <Fragment>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={2} md={2}>
            <Link to="/sandBox/nestedpage1">nested page 1</Link>{" "}
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <Link to="/sandBox/nestedpage2">nested page 2</Link>
          </Grid>
          <Grid item xs={2} sm={2} md={2}>
            <Link to="/sandBox/RRPButtonParcial">RRPButtonParcial</Link>
          </Grid>

          <Grid item xs={2} sm={2} md={2}>
            <Link to="/sandBox/RRPH3Parcial">RRPH3Parcial</Link>
          </Grid>
        </Grid>
        <Outlet />
      </Fragment>
    </Fragment>
  );
};
export default SandBox;
