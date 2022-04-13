import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useStore } from 'effector-react';
import { $timeFilters, changeDateEnd, changeDateStart } from '../Table/Model';

export default function MaterialUIPickers() {
  const timeFilters = useStore($timeFilters);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Stack spacing={3}>
        <DateTimePicker
          label="StartDate"
          value={timeFilters.dateStart}
          onChange={changeDateStart}
          renderInput={(params) => <TextField {...params} />}
        />
        <DateTimePicker
          label="EndDate"
          value={timeFilters.dateEnd}
          onChange={changeDateEnd}
          renderInput={(params) => <TextField {...params} />}
        />
      </Stack>
    </LocalizationProvider>
  );
}