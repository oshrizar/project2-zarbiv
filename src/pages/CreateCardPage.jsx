import ROUTES from "../routes/ROUTES";
import CachedIcon from "@mui/icons-material/Cached";
import atom from "../logo.svg";
import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import validateEditCardParamsSchema from "../validation/editCardValidation";
import { toast } from "react-toastify";
import CreatCard from "../components/CreatComponent";

/* import atom from "../logo.svg"; */

const CreateCardPage = () => {
  const [inputState, setInputState] = useState({
    url: "",
    alt: "",
    title: "",
    subTitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    /* zip:"", */
  });
  useEffect(() => {
    const joiResponse = validateEditCardParamsSchema(inputState);
    setInputsErrorsState(joiResponse);
  }, []);
  const [inputsErrorState, setInputsErrorsState] = useState(null);
  const navigate = useNavigate();

  const handleSaveBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditCardParamsSchema(inputState);
      setInputsErrorsState(joiResponse);
      if (joiResponse) {
        return;
      }

      await axios.post("/cards/", inputState);
      toast.success("העסק נוצר בהצלחה!");
      navigate(ROUTES.HOME);
    } catch (err) {
    
    
    }
  };
  const handleCancelBtnClick = (ev) => {
    navigate(ROUTES.HOME);
  };
  const handleInputChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditCardParamsSchema(newInputState);
    setInputsErrorsState(joiResponse);
  };
  const details = () => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState = {
      url: "",
      alt: "",
      title: "",
      subTitle: "",
      description: "",
      phone: "",
      email: "",
      web: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      /* zip:"", */
    };
    setInputState(newInputState);
    const joiResponse = validateEditCardParamsSchema(inputState);
    if (!joiResponse) {
      return;
    }
    let newjoiResponse = JSON.parse(JSON.stringify(joiResponse));
    Object.keys(newjoiResponse).forEach((index) => {
      newjoiResponse[index] = "";
      inputsErrorState(newjoiResponse);
    });
  };

  const keys = Object.keys(inputState);
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <EditIcon />
        </Avatar>
        <Typography variant="h3">
          צור עסק
        </Typography>
        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
           
            {keys.map((item) => (
              <CreatCard
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleInputChange}
                inputsErrorState={inputsErrorState}
              />
            ))}

            <Grid item xs={12} >
              <Button
                size="large"
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={details}
                endIcon={<CachedIcon />}
              ></Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                onClick={handleCancelBtnClick}
              >
                ביטול
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 1, mb: 1 }}
                disabled={inputsErrorState !== null}
                onClick={handleSaveBtnClick}
              >
                הירשם
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default CreateCardPage;
