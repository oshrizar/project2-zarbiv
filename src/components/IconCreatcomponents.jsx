import { Avatar, Box, IconButton } from "@mui/material";
import { Fragment } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ROUTES from "../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import { blue } from "@mui/material/colors";

const IconCreatComponen = ({ canCreate }) => {
  const navigate = useNavigate();
  const btnCraet = () => {
    navigate(ROUTES.CREATE);
  };

  return (
    <Box sx={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
      {canCreate ? (
        <Avatar sx={{ bgcolor: blue[600] }} size="large" onClick={btnCraet}>
          +{" "}
        </Avatar>
      ) : (
        " "
      )}
    </Box>
  );
};
export default IconCreatComponen;
