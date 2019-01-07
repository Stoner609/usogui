import React from "react";
import "./Card.css";

const Card = props => {
  const { stepCount, playName, url } = props.profile;
  let imgStyle = {
    marginTop: "20px",
    height: "150px"
  };

  return (
    <div className="card">
      <img src={url} alt="" style={imgStyle} />
      <div>
        <span>
          {playName}殘餘步數: {stepCount}
        </span>
      </div>
    </div>
  );
};

export default Card;
