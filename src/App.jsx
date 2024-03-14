import SWFDueDate from "./components/SWFDueDate";
import SummerVacationDate from "./components/SummerVacationDate";
import Heading from "./assets/heading.png";
import Footer from "./assets/footer.png";
import Logo from "./assets/logo.jpeg";
import { useState } from "react";

function App() {
  const [year, setYear] = useState(new Date().getFullYear());

  return (
    <div className="mx-8 flex flex-col">
      <img src={Heading} className="mb-2 hidden print:block"></img>
      <div className="mt-3 mb-2 relative print:hidden md:relative">
        <img
          src={Logo}
          className="h-20 w-auto md:absolute md:top-0 md:right-0"
        ></img>
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-bold my-1">
          Academic Year {year}-{year + 1}
        </h1>
        <h2 className="text-2xl font-bold my-2">SWF Due Dates</h2>
        <SWFDueDate term={"Winter"} setYear={setYear} year={year} />
        <SWFDueDate term={"Summer"} year={year} />
        <SWFDueDate term={"Fall"} year={year} />
        <h2 className="text-2xl font-bold mt-4 mb-3">Faculty Vacation</h2>
        <SummerVacationDate term={"Fall"} year={year} />
      </div>
      <div className="text-center mt-2 flex m-auto">
        <div>
          <button
            onClick={() => window.print()}
            className="w-20 border-2 rounded border-gray-500 m-1 p-1 hover:bg-gray-300 print:hidden"
          >
            Print
          </button>
        </div>
        <div>
          <button
            onClick={() => window.location.reload()}
            className="w-20 border-2 rounded border-gray-500 m-1 p-1 hover:bg-gray-300 print:hidden"
          >
            Reset
          </button>
        </div>
      </div>
      <p className="text-center mt-2 print:hidden">
        Note: this page only applies to calculation for SWF due dates and
        faculty vacation from current year until year 2044.
      </p>
      <p className="text-center mb-5 print:mt-10">
        For more information about calculating SWF due dates and faculty
        vacation, please refer to{" "}
        <a
          className="text-blue-500 hover:underline"
          href="https://www.collegefaculty.org/wp-content/uploads/2021/06/2017-2021-CA.pdf"
        >
          Academic Employees Collective Agreement
        </a>
        .
      </p>
      <footer className="mt-5 hidden print:block">
        <img src={Footer}></img>
      </footer>
    </div>
  );
}

export default App;
