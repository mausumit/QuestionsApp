import React, { useEffect } from "react";
import { Paper, Button, TextField, Slider } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  DateRangePicker,
  DateRange,
} from "@mui/x-date-pickers-pro/DateRangePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
export type ItemProps = {
  currentIndex: number;
  item: any;
  pushAnswer: (ans:unknown) => void;
  answer: unknown[] 
};
const Item: React.FC<ItemProps> = ({
  currentIndex,
  item,
  pushAnswer,
  answer,
}: ItemProps) => {
  const [dateValue, setValue] = React.useState<DateRange<Date>>([null, null]);
  const getMultipleChoiceVal = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ans = [...answer];
    ans[currentIndex] = event.currentTarget.value;
    pushAnswer(event.currentTarget.value);
  };

  const getSliderVal = (
    event: Event,
    value: number | Array<number>,
    activeThumb: number
  ) => {
    pushAnswer(value);
  };
  return (
    <Paper className="ques-card">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          {item.question}
        </FormLabel>
        {item.type == "multiple" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={answer && answer[currentIndex]}
            name="radio-buttons-group"
            onChange={getMultipleChoiceVal}
          >
            {item.options &&
              item.options.map((item: string) => (
                <FormControlLabel
                  value={item}
                  control={<Radio />}
                  label={item}
                  key={item}
                />
              ))}
          </RadioGroup>
        )}
        {item.type == "text" && (
          <TextField
            value={answer[currentIndex]}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              pushAnswer(event.target.value);
            }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
          />
        )}

        {item.type == "numeric_range" && (
          <Slider
            defaultValue={(answer[currentIndex] as number) || 50}
            aria-label="Default"
            valueLabelDisplay="auto"
            value={answer[currentIndex] as number}
            onChange={getSliderVal}
          />
        )}
        {item.type == "date_range" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={dateValue}
              onChange={(newValue: any) => {
                setValue(newValue);
                pushAnswer(newValue);
              }}
              renderInput={(startProps: any, endProps: any) => (
                <React.Fragment>
                  <TextField {...startProps} />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        )}
      </FormControl>
    </Paper>
  );
};
export default Item;
