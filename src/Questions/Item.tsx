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
function Item(props: any) {
    const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
    console.log(props.currentIndex);
  return (
    <Paper className="ques-card">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">
          {props.item.question}
        </FormLabel>
        {props.item.type == "multiple" && (
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
          >
            {props.item.options &&
              props.item.options.map((item: string) => (
                <>
                  <FormControlLabel
                    value={item}
                    control={<Radio />}
                    label="Female"
                  />
                </>
              ))}
          </RadioGroup>
        )}
        {props.item.type == "text" && (
          <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        )}

        {props.item.type == "numeric_range" && (
          <Slider
            defaultValue={50}
            aria-label="Default"
            valueLabelDisplay="auto"
          />
        )}
        {props.item.type == "date_range" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateRangePicker
              startText="Check-in"
              endText="Check-out"
              value={value}
              onChange={(newValue: any) => {
                setValue(newValue);
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
}
export default Item;
