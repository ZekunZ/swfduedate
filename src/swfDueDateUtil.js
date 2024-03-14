const calcuateSWFDueDate = (semesterStartDate) => {
  const semesterStart = new Date(semesterStartDate);
  console.log(semesterStart);
  const semesterStartMonth = semesterStart.getMonth() + 1;
  console.log(semesterStartMonth);
  const academicYear = semesterStart.getFullYear();
  const chiristmasDay = new Date(academicYear - 1 + "-12-25");
  const newYearDay = new Date(academicYear + "-01-01");

  let winterBreakStartDay;
  // check if Christmas Day is on Saturday or Sunday
  const chiristmasDayDayOfWeek = chiristmasDay.getUTCDay();
  if (chiristmasDayDayOfWeek === 0) {
    winterBreakStartDay = new Date(academicYear - 1 + "-12-23");
  } else if (chiristmasDayDayOfWeek === 6) {
    winterBreakStartDay = new Date(academicYear - 1 + "-12-24");
  } else {
    winterBreakStartDay = chiristmasDay;
  }

  let winterBreakEndDay;
  // check if New Year's Day is on Saturday or Sunday
  const newYearDayDayOfWeek = newYearDay.getUTCDay();
  if (newYearDayDayOfWeek === 0) {
    winterBreakEndDay = new Date(academicYear + "-01-02");
  } else if (newYearDayDayOfWeek === 6) {
    winterBreakEndDay = new Date(academicYear + "-01-03");
  } else {
    winterBreakEndDay = newYearDay;
  }

  if (semesterStartMonth === 1) {
    let swfDueDate;
    const winterBreakDays = calculateWinterBreakDays(
      winterBreakStartDay,
      winterBreakEndDay
    );
    swfDueDate = new Date(
      semesterStart.getTime() - (6 * 7 + winterBreakDays) * 24 * 60 * 60 * 1000
    ); // subtract 6 weeks, and Winter break days

    // check if this date is On Saturday or Sunday. If so, subtract 2 days (1 weekend)
    // then the due date is 1 day before this date
    const dayOfWeek = swfDueDate.getUTCDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      swfDueDate = new Date(
        swfDueDate.getTime() - (2 + 1) * 24 * 60 * 60 * 1000
      );
    } else if (dayOfWeek === 1) {
      // if this date is a Monday, the due date is 3 days before this date (Friday before this Monday)
      swfDueDate = new Date(swfDueDate.getTime() - 3 * 24 * 60 * 60 * 1000);
    } else {
      // else, the due date is 1 day before this date
      swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
    }

    return {
      semester: "Winter Semester " + academicYear,
      swfDueDate: swfDueDate.toISOString().split("T")[0],
    };
  } else if (semesterStartMonth === 5) {
    let swfDueDate = new Date(
      semesterStart.getTime() - 6 * 7 * 24 * 60 * 60 * 1000
    ); // subtract 6 weeks

    const goodFriday = new Date(getGoodFriday(academicYear));
    // check if this date is before Good Friday or on Good Friday. If so, subtract 1 day.
    // normally, this date is not on Good Friday because Good Friday is a Friday and this date is a typical Monday
    if (swfDueDate.getTime() <= goodFriday.getTime()) {
      swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      const dayOfWeek = swfDueDate.getUTCDay();

      // check if this date is On Saturday or Sunday. If so, subtract 2 days (1 weekend)
      // then the due date is 1 day before this date
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        swfDueDate = new Date(
          swfDueDate.getTime() - (2 + 1) * 24 * 60 * 60 * 1000
        );
      } else if (dayOfWeek === 1) {
        // if this date is a Monday, the due date is 3 days before this date (Friday before this Monday)
        swfDueDate = new Date(swfDueDate.getTime() - 3 * 24 * 60 * 60 * 1000);
      } else {
        // else, the due date is 1 day before this date
        swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      }
    } else {
      // if this date is after Good Friday but falls on a Monday, check if the Friday before is Good Friday
      const dayOfWeek = swfDueDate.getUTCDay();
      if (dayOfWeek === 1) {
        // if it is a Monday, the due date is 3 days before this date (Friday before this Monday)
        swfDueDate = new Date(swfDueDate.getTime() - 3 * 24 * 60 * 60 * 1000);

        // check if this new date is Good Friday. If so, subtract 1 day, then the due date is 1 day before this Good Friday
        if (swfDueDate.getTime() === goodFriday.getTime()) {
          swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
        }
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        swfDueDate = new Date(
          swfDueDate.getTime() - (2 + 1) * 24 * 60 * 60 * 1000
        );
      } else {
        swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      }
    }
    return {
      semester: "Summer Semester " + academicYear,
      swfDueDate: swfDueDate.toISOString().split("T")[0],
    };
  } else if (semesterStartMonth === 9) {
    let summerVacationEndDate = new Date(
      semesterStart.getTime() - (2 * 7 + 1) * 24 * 60 * 60 * 1000
    ); // subtract 2 weeks (10 weekdays) and 1 day for Labour day, Labour day is a Monday

    let summerVacationStartDate = new Date(
      summerVacationEndDate.getTime() - (43 + 9 * 2 + 2) * 24 * 60 * 60 * 1000
    ); // subtract 43 weekdays, 9 weekends, and 2 days for Civic Holiday and Canada Day (these two holidays are always included)

    const victoriaDay = new Date(getVictoriaDay(academicYear)); // Victoria Day is always on a Monday
    let swfDueDate = new Date(
      summerVacationStartDate.getTime() - 4 * 7 * 24 * 60 * 60 * 1000
    ); // subtract 4 weeks

    if (swfDueDate.getTime() < victoriaDay.getTime()) {
      swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      const dayOfWeek = swfDueDate.getUTCDay();
      console.log(dayOfWeek);
      // check if this date is On Saturday or Sunday. If so, subtract 2 days (1 weekend)
      // then the due date is 1 day before this date
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        swfDueDate = new Date(
          swfDueDate.getTime() - (2 + 1) * 24 * 60 * 60 * 1000
        );
      } else if (dayOfWeek === 1) {
        // if this date is a Monday, the due date is 3 days before this date (Friday before this Monday)
        swfDueDate = new Date(swfDueDate.getTime() - 3 * 24 * 60 * 60 * 1000);
      } else {
        // else, the due date is 1 day before this date
        swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      }
    } else if (swfDueDate.getTime() === victoriaDay.getTime()) {
      // if this date in on Victoria Day, and it is a Monday, subtract 3 days and the due date is 1 day before this date
      swfDueDate = new Date(
        swfDueDate.getTime() - (3 + 1) * 24 * 60 * 60 * 1000
      );
    } else {
      // if this date is after Victoria Day but falls on a Tuesday, Check if the Monday is Victoria Day
      const dayOfWeek = swfDueDate.getUTCDay();
      if (dayOfWeek === 2) {
        // if it is a Tuesday, and the date before is Victoria Day, subtract 1 day, then the due date the Friday before this Tuesday
        if (
          swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000 ===
          victoriaDay.getTime()
        ) {
          swfDueDate = new Date(swfDueDate.getTime() - 3 * 24 * 60 * 60 * 1000);
        }
      } else if (dayOfWeek === 0 || dayOfWeek === 6) {
        swfDueDate = new Date(
          swfDueDate.getTime() - (2 + 1) * 24 * 60 * 60 * 1000
        );
      } else {
        swfDueDate = new Date(swfDueDate.getTime() - 1 * 24 * 60 * 60 * 1000);
      }
    }

    return {
      semester: "Fall Semester " + academicYear,
      swfDueDate: swfDueDate.toISOString().split("T")[0],
      summerVacationStartDate: summerVacationStartDate
        .toISOString()
        .split("T")[0],
      summerVacationEndDate: summerVacationEndDate.toISOString().split("T")[0],
      academicYear: academicYear,
    };
  }
};

const calculateWinterBreakDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = end.getTime() - start.getTime();
  const days = diff / (1000 * 60 * 60 * 24) + 1; // add 1 to include the end date
  return days;
};

// Good Friday dates from 2020 to 2044
const goodFridayDates = [
  "2020-04-10",
  "2021-04-02",
  "2022-04-15",
  "2023-04-07",
  "2024-03-29",
  "2025-04-18",
  "2026-04-03",
  "2027-03-26",
  "2028-04-14",
  "2029-03-30",
  "2030-04-19",
  "2031-04-11",
  "2032-03-26",
  "2033-04-15",
  "2034-04-07",
  "2035-03-23",
  "2036-04-11",
  "2037-04-03",
  "2038-04-23",
  "2039-04-08",
  "2040-03-30",
  "2041-04-19",
  "2042-04-04",
  "2043-03-27",
  "2044-04-15",
];

// Victoria Day dates from 2020 to 2044
const victoriaDayDates = [
  "2020-05-18",
  "2021-05-24",
  "2022-05-23",
  "2023-05-22",
  "2024-05-20",
  "2025-05-19",
  "2026-05-18",
  "2027-05-24",
  "2028-05-22",
  "2029-05-21",
  "2030-05-20",
  "2031-05-19",
  "2032-05-24",
  "2033-05-23",
  "2034-05-22",
  "2035-05-21",
  "2036-05-19",
  "2037-05-18",
  "2038-05-24",
  "2039-05-23",
  "2040-05-21",
  "2041-05-20",
  "2042-05-19",
  "2043-05-18",
  "2044-05-23",
];

const getGoodFriday = (year) => {
  return goodFridayDates[year - 2020];
};

const getVictoriaDay = (year) => {
  return victoriaDayDates[year - 2020];
};

export const getDayOfWeek = (dateString) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getUTCDay();

  return daysOfWeek[dayIndex];
};

export default calcuateSWFDueDate;
