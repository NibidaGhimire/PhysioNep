import React from "react";
import SummaryGenerator from "./Summary";
import VitalsData from "./VitalsData";

const CheckVitals = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-8 bg-[#1e1e1e] text-gray-300 min-h-screen">
      <VitalsData />
      <SummaryGenerator />
    </div>
  );
};

export default CheckVitals;
