import React, { useState } from "react";
import {
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { styled } from "@mui/material/styles";

export const ResultTextEmphasized = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  display: "block",
  fontSize: "200%",
}));

export const ResultTextSmall = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  padding: theme.spacing(0, 1),
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  margin: theme.spacing(1, 0),
}));

export type InputDefaultProps = TextFieldProps & {
  defaultValue: any
};

export function useInput({ defaultValue, ...inputProps }: InputDefaultProps) {
  const [value, setValue] = useState(defaultValue);
  const input = (
    <StyledTextField
      variant="outlined"
      fullWidth={true}
      {...inputProps}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );

  return [value, input, setValue];
};

export function useNumericInput({ defaultValue, ...inputProps }: InputDefaultProps) {
  const [value, setValue] = useState(defaultValue);
  const input = (
    <StyledTextField
      variant="outlined"
      fullWidth={true}
      {...inputProps}
      value={value}
      onChange={(e) => {
        var f = Number.parseFloat(e.target.value);
        if (Number.isNaN(f))
          f = 0;
        setValue(f);
      }}
    />
  );

  return [value, input, setValue];
}

export function useDateTimeInput({ defaultValue, label, ...inputProps }: InputDefaultProps) {
  const [value, setValue] = useState(defaultValue);
  const input = (
    <DateTimePicker
      renderInput={(props) => (
        <StyledTextField 
          fullWidth={true} 
          variant="outlined"
          {...inputProps} 
          {...props}
          />
      )}
      label={label}
      value={value}
      onChange={setValue}
    />
  );
  return [value, input, setValue];
}