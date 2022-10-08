import React, { useEffect, useState } from "react";
import { Box, Divider, InputAdornment, Typography } from "@mui/material";
import { default as Grid } from "@mui/material/Unstable_Grid2/Grid2";
import { useTheme } from "@mui/material/styles";
import { addHours, format } from "date-fns";
import {
  useDateTimeInput,
  useNumericInput,
  ResultTextEmphasized,
  ResultTextSmall,
} from "./common";

function computeDate(startDate: Date, offsetHours: number): Date | null {
  if (!startDate || !offsetHours) return null;
  if (!(startDate instanceof Date) || Number.isNaN(startDate.getTime()))
    return null;
  if (typeof offsetHours !== "number") return null;
  return addHours(startDate, offsetHours);
}

function useLocalComputation(startDate: Date, offsetHours: number): Date {
  const [value, setValue] = useState<Date | null>(new Date());
  useEffect(() => {
    const newDate = computeDate(startDate, offsetHours);
    setValue(newDate);
  }, [startDate, offsetHours]);
  return value!;
}

function LabTestCalculator() {
  const theme = useTheme();

  // input fields
  const [lastDose, lastDoseInput] = useDateTimeInput({
    defaultValue: new Date(),
    label: "Last Dose",
    required: true,
  });

  const [testingWindowStartHours, testingWindowStartHoursInput] =
    useNumericInput({
      defaultValue: 86,
      label: "Testing Window Start",
      InputProps: {
        endAdornment: <InputAdornment position="end">hours</InputAdornment>,
      },
    });

  const [testingWindowIdealHours, testingWindowIdealHoursInput] =
    useNumericInput({
      defaultValue: 90,
      label: "Ideal Testing Time",
      InputProps: {
        endAdornment: <InputAdornment position="end">hours</InputAdornment>,
      },
    });

  const [testingWindowEndHours, testingWindowEndHoursInput] = useNumericInput({
    defaultValue: 92,
    label: "Testing Window End",
    InputProps: {
      endAdornment: <InputAdornment position="end">hours</InputAdornment>,
    },
  });

  // computed fields
  const computedWindowIdeal = useLocalComputation(
    lastDose,
    testingWindowIdealHours
  );

  const computedWindowStart = useLocalComputation(
    lastDose,
    testingWindowStartHours
  );

  const computedWindowEnd = useLocalComputation(
    lastDose,
    testingWindowEndHours
  );

  const includeDayOfWeek =
    (!!computedWindowEnd && computedWindowEnd.getDate() !== computedWindowIdeal.getDate()) ||
    (!!computedWindowStart && computedWindowStart.getDate() !== computedWindowIdeal.getDate());

  // presentation
  return (
    <Grid container spacing={theme.spacing(2)}>
      <Grid sm={6}>
        <Box sx={{ m: theme.spacing(1, 2) }}>
          {lastDoseInput}
          {testingWindowStartHoursInput}
          {testingWindowIdealHoursInput}
          {testingWindowEndHoursInput}
        </Box>
      </Grid>
      <Grid sm={6}>
        <Box sx={{ m: theme.spacing(3, 1) }}>
          {computedWindowIdeal && (
            <Box sx={{ m: theme.spacing(1) }}>
              <Typography component="div">
                Given the information above you should schedule your lab tests
                for
                <ResultTextEmphasized variant="body2">
                  {format(computedWindowIdeal, "EEEE',' MMM d")}
                </ResultTextEmphasized>
                at
                <ResultTextEmphasized variant="body2">
                  {format(computedWindowIdeal, "h:mm aa")}
                </ResultTextEmphasized>
              </Typography>
            </Box>
          )}
          {computedWindowIdeal && computedWindowStart && computedWindowEnd && (
            <Divider variant="middle" />
          )}
          {computedWindowStart && computedWindowEnd && (
            <Box sx={{ m: theme.spacing(1) }}>
              <Typography component="div">
                Your testing window spans from
                <ResultTextSmall variant="body2">
                  {format(
                    computedWindowStart,
                    includeDayOfWeek ? "EEEE 'at' h:mm a" : "h:mm a"
                  )}
                </ResultTextSmall>
                to
                <ResultTextSmall variant="body2">
                  {format(
                    computedWindowEnd,
                    includeDayOfWeek ? "EEEE 'at' h:mm a" : "h:mm a"
                  )}
                </ResultTextSmall>
              </Typography>
            </Box>
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

export default LabTestCalculator;
