import { useEffect, useState } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import LoginIcon from "@mui/icons-material/Login";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import validateLoginSchema from "../validation/loginValidation";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import useLoggedIn from "../hooks/useLoggedIn";

const LoginPage = () => {
  const [inputState, setInputState] = useState({
    email: "",
    password: "",
  });

  const [inputsErrorState, setInputsErrorsState] = useState(null);
  const loggedIn = useLoggedIn();
  const navigate = useNavigate();
  const joiResponse = validateLoginSchema(inputState);
  const handeleBtnClick = async (ev) => {
    try {
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        toast.error("אחד מהפרטים שהכנסת אינן נכונים");
        return;
      }
      const { data } = await axios.post("/users/login", inputState);
      localStorage.setItem("token", data.token);
      loggedIn();
      navigate(ROUTES.HOME);
    } catch (err) {
      toast.error("משתמש לא רשום");
    }
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const newjoiResponse = validateLoginSchema(newInputState);
    setInputsErrorsState(newjoiResponse);
  };
  const details = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
     
      email: "",
      password:"",
    };
    setInputState(newInputState);
    const joiResponse = validateLoginSchema(inputState);
    if (!joiResponse) {
      return;
    }
    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
      inputsErrorState(newjoiResponse);
    });
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LoginIcon />
        </Avatar>
        <Typography  variant="h3">
          התחברות
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="כתובת איימיל"
                name="email"
                autoComplete="email"
                value={inputState.email}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.email && (
                <Alert severity="warning">
                  {inputsErrorState.email.map((item) => (
                    <div key={"email-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="סיסמה"
                type="password"
                id="password"
                autoComplete="new-password"
                value={inputState.password}
                onChange={handleInputChange}
              />
              {inputsErrorState && inputsErrorState.password && (
                <Alert severity="warning">
                  {inputsErrorState.password.map((item) => (
                    <div key={"password-errors" + item}>{item}</div>
                  ))}
                </Alert>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                onClick={details}
                href={ROUTES.HOME}
              >
               ביטול
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                href={ROUTES.LOGIN}
                endIcon={<CachedIcon />}
              ></Button>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={inputsErrorState !== null}
              onClick={handeleBtnClick}
            >
             התחבר
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to={ROUTES.REGISTER}>
                <Typography variant="body2">
                  האם יש לך חשבון ? הירשם
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default LoginPage;
