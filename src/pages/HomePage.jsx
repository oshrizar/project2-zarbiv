import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import CardComponent from "../components/CardComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import useQueryParams from "../hooks/useQueryParams";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import IconCreatComponen from "../components/IconCreatcomponents";

const HomePage = () => {
  const [originalCardsArr, setOriginalCardsArr] = useState(null);
  const [cardsArr, setCardsArr] = useState(null);
  const navigate = useNavigate();
  let qparams = useQueryParams();
  const payload = useSelector((bigPie) => bigPie.authSlice.payload);
 useEffect(() => {
    axios
      .get("/cards/cards")
      .then(({ data }) => {
        filterFunc(data);
      })
      .catch((err) => {
        toast.error("Oops");
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

      toast.success("העסק נמחק בהצלחה");
    } catch (err) {}
  };

  const handlEditFromInitialCardArr = (id) => {
    const cardId=cardsArr.find((card)=>card._id==id)
    navigate(`/edit/${id}`,{state:{user_id:cardId.user_id}});
  };
  const handlMoreInfo = (id) => {
    navigate(`/moreInformation/${id}`);
  };
  if (!cardsArr) {
    return <CircularProgress />;
  }
  const deleteFav = () => {};
  return (
    <Box>
      <Typography variant="h3" sx={{
          
        textAlign :"right"
        }} >שלום</Typography>
      <Typography variant="h6" sx={{
          
        textAlign :"right"
        }}>
      .ברוכים הבאים לאתר העסקים הגדול באתר תוכלו לבחור או ליצור את העסק המתאים לכם
      
      </Typography>
       <Typography variant="h6"sx={{
          
        textAlign :"right"
        }}>      .כל סוגי העסקים קטנים וגדולים רצויים באתר לא משנה עם את מורה או מטיילת עם כלבים או בונה אתרים
</Typography>
 <Typography variant="h6" sx={{
          
        textAlign :"right"
        }}>      .עם המשתמש לא מחובר הוא יוכל לראות רק את הפרטים של העסק וטלפון
</Typography>
  <Typography variant="h6" sx={{
          
        textAlign :"right"
        }}>      .כדי שיהיה לכם עסקים מועדפים אתם צריכים להרשם בתור לקוח עסקי 
</Typography>
   <Typography variant="h6" sx={{
          
        textAlign :"right"
        }}>       .הירשמות בתור לקוח עסקי אינה כרוכה בעלות
</Typography>
    <Typography variant="h6" sx={{
          
        textAlign :"right"
        }}>       .מקווים לראות אתכם באתרנו גלישה נעימה 
</Typography><br></br>
      <Grid container spacing={2}>
        {cardsArr.map((item) => (
          <Grid item sm={6} md={4} xs={12} key={item._id + Date.now()}>
            <CardComponent
              id={item._id}
              cardNumber={item.bizNumber}
              title={item.title}
              subTitle={item.subTitle}
              phone={item.phone}
              address={
                item.country +
                " " +
                item.state +
                " " +
                item.city +
                " " +
                item.street +
                " " +
                item.houseNumber
              }
              img={item.image ? item.image.url : ""}
              onDelete={handlDeleteFromInitialCardArr}
              onEdit={handlEditFromInitialCardArr}
              moreIn={handlMoreInfo}
              onDeletefav={deleteFav}
              canEdit={
                payload &&
                (payload.biz || payload.isAdmin) &&
                item.user_id == jwt_decode(localStorage.token)._id
              }
              canDelete={
                payload &&
                (payload.isAdmin ||
                  (payload.biz &&
                    item.user_id == jwt_decode(localStorage.token)._id))
              }
              isFav={
                localStorage.token &&
                item.likes.includes(jwt_decode(localStorage.token)._id)
              }
            />
          </Grid>
        ))}

        <IconCreatComponen canCreate={payload && payload.biz} />
      </Grid>
    </Box>
  );
};

export default HomePage;
