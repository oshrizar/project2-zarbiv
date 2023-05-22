import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useNavigate, useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import ProfileValidation from "../validation/validatProfile";
import ROUTES from "../routes/ROUTES";
import axios from "axios";
import { toast } from "react-toastify";
import CachedIcon from "@mui/icons-material/Cached";
import RegisterComponent from "../components/RegisterComponent";
import { Alert, CircularProgress, TextField } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
const MemberPage = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const [inputsErrorState, setinputsErrorState] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const joiResponse = ProfileValidation(inputState);
    setinputsErrorState(joiResponse);
    (async () => {
      try {
        const errors = ProfileValidation();
        if (errors) {
          navigate("*");
          return;
        }
        const { data } = await axios.get("/users/userInfo/");
        let newInputState = {
          ...data,
        };
        delete newInputState._id;
        delete newInputState.isAdmin;
        delete newInputState.password;
        setInputState(newInputState);
      } catch (err) {}
    })();
  }, [id]);
  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = ProfileValidation(inputState);
      setinputsErrorState(joiResponse);
      if (!joiResponse) {
        await axios.put("/users/userInfo", inputState);

        navigate(ROUTES.LOGIN);
        toast.success("העדכון הצליח אתה צריך להתחבר מחדש");
      }
      if (inputState.zipCode == "") {
        inputState.zipCode = null;
      }
    } catch (err) {
   
    }
  };
  const details = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      firstName: "",
      middleName: "",
      lastName: "",
      phone: "",
      email: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      biz: false,
    };
    setInputState(newInputState);
    const joiResponse = ProfileValidation(inputState);
    if (!joiResponse) {
      return;
    }
    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
    });
    setinputsErrorState(newjoiResponse);
  };
  const handleChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = ProfileValidation(newInputState);
    setinputsErrorState(joiResponse);
  };
  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }
  const handleBizChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState["biz"] = ev.target.checked;
    setInputState(newInputState);
  };
  const cancel = () => {
    navigate(ROUTES.HOME);
  };
  const keys = Object.keys(inputState);
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
          <CreateIcon />
        </Avatar>
        <Typography  variant="h3">
       פרופיל
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <RegisterComponent
                fullWidt={item}
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleChange}
                inputsErrorState={inputsErrorState}
              />
            ))}
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    id="biz"
                    checked={inputState.biz}
                    color="primary"
                    onClick={handleBizChange}
                  />
                }
                label="לקוח עסקי"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
                color="primary"
                onClick={cancel}
              >
                ביטול
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={details}
                endIcon={<CachedIcon />}
              ></Button>
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={handeleBtnClick}
              >
                עדכון
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
export default MemberPage;
