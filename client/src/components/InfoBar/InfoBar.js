import React from "react";
import closeIcon from "./closeIcon.png";
import onLineIcon from "./onlineIcon.png";
import "./InfoBar.css";

const InfoBar = ({ room }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onLineIcon" src={onLineIcon} alt="Online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/">
        <img src={closeIcon} alt="Close icon" />
      </a>
    </div>
  </div>
);

export default InfoBar;
