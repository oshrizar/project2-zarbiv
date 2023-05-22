import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate, useParams } from "react-router-dom";
import { CircularProgress, IconButton, BottomNavigation, Avatar } from "@mui/material";
import axios from "axios";
import atom from "../logo.svg";
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes";
import MoreComponent from "../components/MoreComponent";
const MoreInf = () => {
  const { id } = useParams();
  const [inputState, setInputState] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      let { data } = await axios.get("/cards/card/" + id);
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

      delete newInputState.image;
      delete newInputState.likes;
      delete newInputState._id;
      delete newInputState.user_id;
      delete newInputState.address;
      delete newInputState.__v;
      setInputState(newInputState);
    })();
  }, [id]);

  const handeleBtnClick = async (ev) => {
    navigate(-1);
  };
  if (!inputState) {
    return <CircularProgress color="secondary" />;
  }
  let cardsArrIn = Object.keys(inputState);
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
        <SpeakerNotesIcon/>
        </Avatar>
        <Typography variant="h3">פרטים על העסק</Typography>
        <Box
          component="img"
          sx={{
            height: 180,
            width: 250,
            maxHeight: { xs: 180, md: 167 },
            maxWidth: { xs: 250, md: 250 },
          }}
          alt={inputState.alt ? inputState.alt : ""}
          src={inputState.url ? inputState.url : atom}
        />
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {cardsArrIn.map((item) => (
              <MoreComponent
                inputState={inputState}
                key={item + Date.now()}
                item={item}
              />
            ))}
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 1, mb: 1 }}
            color="primary"
            onClick={handeleBtnClick}
          >
           .חזרה לעמוד
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default MoreInf;
