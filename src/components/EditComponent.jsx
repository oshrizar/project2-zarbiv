import { Alert, Grid, TextField } from "@mui/material";

const Deatils = [
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

const EditComponent = ({ item, inputState, onChange, inputsErrorState }) => {
  const isRequired = Deatils.includes(item);
  return isRequired ? (
    <Grid item xs={12}>
      <TextField
        required
        fullWidth
        id={item}
        label={item}
        name={item}
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

export default EditComponent;
