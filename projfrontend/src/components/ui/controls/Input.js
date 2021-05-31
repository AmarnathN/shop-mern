import { TextField } from "@material-ui/core";
import React from "react";

const Input = (props) => {
  const { name, value, label, errorText = null, onChange, ...other } = props;
  return (
    <TextField
      key={label}
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      {...other}
      {...(errorText && { error: true, helperText: errorText })}
    />
  );
};

export default Input;
