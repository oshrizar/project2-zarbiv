import { Alert, Grid, TextField } from "@mui/material";

const Details = [
  "title",
  "subTitle",
  "description",
  "country",
  "city",
  "street",
  "houseNumber",
  "phone",
  "email",
];

const CreatCard = ({ item, inputState, onChange, inputsErrorState }) => {
  const isRequired = Details.includes(item);
  return isRequired ? (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id={item}
        label={item}
        name={item}
        type={item}
        value={inputState[item] ? inputState[item] : ""}
        onChange={onChange}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  ) : (
    <Grid item xs={12}>
      <TextField
        fullWidth
        id={item}
        label={item}
        name={item}
        type={item}
        value={inputState[item] ? inputState[item] : ""}
        onChange={onChange}
      />
      {inputsErrorState && inputsErrorState[item] && (
        <Alert severity="warning">
          {inputsErrorState[item].map((item) => (
            <div key={"{item}-errors" + item}>{item}</div>
          ))}
        </Alert>
      )}
    </Grid>
  );
};
export default CreatCard;
