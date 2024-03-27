import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

export default function BasicDateTimePicker({ DateTimeChange }) {
  return (
    <DemoContainer components={["DateTimePicker"]}>
      <DateTimePicker
        label="Basic date time picker"
        onAccept={DateTimeChange}
      />
    </DemoContainer>
  );
}
