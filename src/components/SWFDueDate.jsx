import React, { useState } from "react";
import calcuateSWFDueDate from "../swfDueDateUtil";
import { getDayOfWeek } from "../swfDueDateUtil";

const SWFDueDate = (props) => {
  const [startDate, setStartDate] = useState("");
  let dueDate;
  let validDate;

  const inRange =
    Number(startDate.split("-")[0]) <= 2044 &&
    Number(startDate.split("-")[0]) >= 2020;

  switch (props.term) {
    case "Winter":
      if (startDate.split("-")[1] === "01" && inRange) {
        validDate = true;
        dueDate = calcuateSWFDueDate(startDate);
      } else {
        validDate = false;
      }
      break;
    case "Summer":
      if (
        startDate.split("-")[1] === "05" &&
        Number(startDate.split("-")[0]) === props.year + 1 &&
        inRange
      ) {
        validDate = true;
        dueDate = calcuateSWFDueDate(startDate);
      } else {
        validDate = false;
      }
      break;
    case "Fall":
      if (
        startDate.split("-")[1] === "09" &&
        Number(startDate.split("-")[0]) === props.year + 1 &&
        inRange
      ) {
        validDate = true;
        dueDate = calcuateSWFDueDate(startDate);
      } else {
        validDate = false;
      }
      break;
    default:
      validDate = false;
      break;
  }

  return (
    <div className="border pb-3">
      <h3 className="text-xl font-bold my-1">
        {props.term === "Winter" && `Fall Semester ${props.year}`}
        {props.term === "Summer" && `Winter Semester ${props.year + 1}`}
        {props.term === "Fall" && `Summer Semester ${props.year + 1}`}
      </h3>
      <h2 className="text-l font-bold mt-2">
        SWF Due Date for {props.term} Semester {props.year + 1}:{" "}
        <span className="text-red-600">
          {dueDate?.swfDueDate} {getDayOfWeek(dueDate?.swfDueDate)}
        </span>
        {!validDate && (
          <p className="text-m font-bold mt-2 text-red-600">
            Please enter a valid date for {props.term} Semester start date
          </p>
        )}
      </h2>
      <label className="text-l font-bold">
        <span className="print:hidden">Enter</span> {props.term} Semester{" "}
        {props.year + 1} Start Date :{" "}
      </label>
      <input
        className="border-2 rounded border-gray-500 mt-2"
        name="dueDate"
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
          props.setYear &&
            new Date(e.target.value).getMonth() === 0 &&
            props.setYear(new Date(e.target.value).getFullYear() - 1);
        }}
      ></input>
    </div>
  );
};

export default SWFDueDate;
