import React, { useState } from "react";
import calcuateSWFDueDate from "../swfDueDateUtil";
import { getDayOfWeek } from "../swfDueDateUtil";

const SummerVacationDate = (props) => {
  const [startDate, setStartDate] = useState("");
  let dueDate;
  let validDate;

  const inRange =
    Number(startDate.split("-")[0]) <= 2044 &&
    Number(startDate.split("-")[0]) >= 2020;

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

  return (
    <div className="border pb-3">
      <h3 className="text-xl font-bold my-1">
        {props.term === "Fall" && `Faculty Summer Vacation ${props.year + 1}`}
      </h3>
      <div>
        <h2 className="text-l font-bold mt-2">
          Start Date:{" "}
          <span className="text-red-600">
            {dueDate?.summerVacationStartDate &&
              dueDate.summerVacationStartDate}{" "}
            {dueDate?.summerVacationStartDate &&
              getDayOfWeek(dueDate.summerVacationStartDate)}
          </span>
        </h2>

        <h2 className="text-l font-bold mt-2">
          Return to work:{" "}
          <span className="text-red-600">
            {dueDate?.summerVacationEndDate && dueDate.summerVacationEndDate}{" "}
            {dueDate?.summerVacationEndDate &&
              getDayOfWeek(dueDate.summerVacationEndDate)}
          </span>
        </h2>
      </div>
      {!validDate && (
        <h2 className="text-l font-bold mt-2 text-red-600">
          Please enter a valid date for {props.term} semester start date
        </h2>
      )}
      <label htmlFor="dueDate" className="text-l font-bold">
        <span className="print:hidden">Enter</span> {props.term} Semester{" "}
        {props.year + 1} Start Date:{" "}
      </label>
      <input
        className="border-2 rounded border-gray-500 mt-3"
        name="dueDate"
        type="date"
        value={startDate}
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
      ></input>
    </div>
  );
};

export default SummerVacationDate;
