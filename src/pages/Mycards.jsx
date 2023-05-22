import axios from "axios";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CardComponent from "../components/CardComponent";

import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import IconCreatComponen from "../components/IconCreatcomponents";
import ROUTES from "../routes/ROUTES";

const MyCards = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);

  useEffect(() => {
    axios
      .get("/cards/my-cards/")
      .then(({ data }) => {
        filterFunc(data);
      })

      .catch((err) => {
        if (!cardsArr) {
          toast.error("אין לך עסקים שמורים שיצרת");
        }
      });
  }, []);

  const filterFunc = (data) => {
    if (!originalCardsArr && !data) {
      return;
    }
    let filter = "";
    if (qparams.filter) {
      filter = qparams.filter;
    }
    if (!originalCardsArr && data) {
      setOriginalCardsArr(data);
      setCardsArr(
        data.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
      return;
    }

    if (originalCardsArr) {
      let neworiginalCardsArr = JSON.parse(JSON.stringify(originalCardsArr));
      setCardsArr(
        neworiginalCardsArr.filter(
          (card) =>
            card.title.startsWith(filter) || card.bizNumber.startsWith(filter)
        )
      );
    }
  };
  useEffect(() => {
    filterFunc();
  }, [qparams.filter]);

  const handlDeleteFromInitialCardArr = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setCardsArr((currentCardsArr) =>
        currentCardsArr.filter((item) => item._id != id)
      );
    } catch (err) {
      toast.success("התמונה נמחקה בהצלחה");
    }
  };
  
  const favCards=()=>{

  }

   const handlMoreInfo = (id) => {
     navigate(`/moreInformation/${id}`);
   };
  const handlEditFromInitialCardArr = (id) => {
    navigate(`/edit/${id}`);
  };
  if (cardsArr == 0) {
    toast.error(
      "לא יצרת עדין את העסק שלך "
    );
  }
  if (!cardsArr) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Typography variant="h3">הכרטיסים שלי</Typography>
      <Typography variant="h5">
        .הכרטיסים של העסק שלך אתה יכול בכל זמן לערוך וגם למחוק את הכרטיסים
      </Typography>
      {cardsArr.length === 0 ? (
        <Box>
          <Typography variant="h6">לא יצרת עדין עסק</Typography>
          {/*   <CreatComponentNew canCreate={payload && payload.biz} /> */}
        </Box>
      ) : (
        <Grid container spacing={2}>
          {cardsArr.map((item) => (
            <Grid item sm={6} md={4} xs={12} key={item._id + Date.now()}>
              <CardComponent
                id={item._id}
                phone={item.phone}
                address={
                  item.street + " " + item.houseNumber + ", " + item.city
                }
                cardNumber={item.bizNumber}
                title={item.title}
                subTitle={item.subTitle}
                description={item.description}
                img={item.image ? item.image.url : ""}
                onDelete={handlDeleteFromInitialCardArr}
               onDeletefav={favCards}
                moreIn={handlMoreInfo}
                onEdit={handlEditFromInitialCardArr}
                canEdit={
                  payload &&
                  (payload.isAdmin || payload.biz) &&
                  item.user_id == jwt_decode(localStorage.token)._id
                }
                isFav={
                  localStorage.token &&
                  item.likes.includes(jwt_decode(localStorage.token)._id)
                }
                canDelete={
                  (payload && payload.isAdmin) ||
                  (payload.biz &&
                    item.user_id == jwt_decode(localStorage.token)._id)
                }
              />
            </Grid>
          ))}

          <IconCreatComponen canCreate={payload && payload.biz} />
        </Grid>
      )}
    </Box>
  );
};

export default MyCards;
