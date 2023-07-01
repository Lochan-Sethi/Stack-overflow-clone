import React from "react";

import "../../App.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import HomeMainBar from "../../components/HomeMainbar/HomeMainbar";

const Questions = () => {
  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <HomeMainBar />
        <RightSidebar />
      </div>
      s
    </div>
  );
};

export default Questions;
