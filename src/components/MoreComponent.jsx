import { Box, Card, CardActionArea, CardContent, CardHeader,  Grid,  Typography } from "@mui/material";

 
const MoreComponent =({ inputState,item})=>{
  return (
    <Box sx={{ justifyContent: "center" }}>
       <Typography variant="h6">  {item}:<br />
       </Typography>
      <Typography variant="body1" style={{ wordBreak: "break-all" }}>
     
        {inputState[item] ? inputState[item] : ""}
        <br />
        <br />
      </Typography>
    </Box>
  );
};

export default MoreComponent ;
