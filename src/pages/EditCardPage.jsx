import { useState, useEffect } from "react";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import Alert from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import validateEditCardSchema, {
  validateEditCardParamsSchema,
} from "../validation/editCardValidation";
import ROUTES from "../routes/ROUTES";
import CreateIcon from "@mui/icons-material/Create";

import { CircularProgress } from "@mui/material";
import axios from "axios";
import atom from "../logo.svg";
import { toast } from "react-toastify";

import EditComponent from "../components/EditComponent";

const EditCardPage = () => {
  const { id } = useParams();

  const [inputState, setInputState] = useState(null);
  const [inputsErrorState, setinputsErrorState] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const errors = validateEditCardParamsSchema({ id });
        if (errors) {
          navigate("*");
          return;
        }
        const { data } = await axios.get("/cards/card/" + id);
        let newInputState = {
          ...data,
        };
        if (data.image && data.image.url) {
          newInputState.url = data.image.url;
        } else {
          newInputState.url = "";
        }
        if (data.image && data.image.alt) {
          newInputState.alt = data.image.alt;
        } else {
          newInputState.alt = "";
        }
        if (data.zipCode == null) {
          newInputState.zipCode = "";
        }
        delete newInputState.image;
        delete newInputState.likes;
        delete newInputState._id;
        delete newInputState.user_id;
        delete newInputState.bizNumber;
        delete newInputState.createdAt;
        delete newInputState.address;
        delete newInputState.__v;
        setInputState(newInputState);
      } catch (err) {}
    })();
  }, [id]);
  const handeleBtnClick = async (ev) => {
    try {
      const joiResponse = validateEditCardSchema(inputState);
      setinputsErrorState(joiResponse);
      if (!joiResponse) {
        await axios.put("/cards/" + id, inputState);
        navigate(ROUTES.HOME);
         toast.success("השינוי נוצר בהצלחה");
      }
    } catch (err) {
    
    }
  };
  const handleChange = (ev) => {
    let newInputState = JSON.parse(JSON.stringify(inputState));
    newInputState[ev.target.id] = ev.target.value;
    setInputState(newInputState);
    const joiResponse = validateEditCardSchema(newInputState);
    setinputsErrorState(joiResponse);
  };
  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }
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
          ערוך עסק
        </Typography>
        <Box
          component="img"
          sx={{
            height: 233,
            width: 350,
            maxHeight: { xs: 233, md: 167 },
            maxWidth: { xs: 350, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />

        <Box component="div" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {keys.map((item) => (
              <EditComponent
                key={item}
                item={item}
                inputState={inputState}
                onChange={handleChange}
                inputsErrorState={inputsErrorState}
              />
            ))}
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
                            onClick={handeleBtnClick}
            >
              שמירה
            </Button>{" "}
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 1 }}
              onClick={cancel}
            >
              ביטול
            </Button>
          </Grid>
          <Grid container justifyContent="flex-end">
          
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditCardPage;
