import React, { useState } from "react";
import { SingleZutat } from "./SingleZutat";

export const SingleRezept = ({
  rezept,
  centerElement,
  id,
  setWaren,
  waren,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (e) => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    rezept.rezeptZutaten.map(rezZut => {
      for(let i = 0; i < rezZut.menge; i++)
        setWaren(waren => [...waren, rezZut.zutat]);
    })
  }

  return (
    <div
      style={{
        margin: "10px",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={require("../../Images/" + rezept.id + ".jpeg")}
        alt="to"
        style={{
          width: `${id === centerElement ? "400px" : "300px"}`,
          height: `${id === centerElement ? "400px" : "300px"}`,
          transition: "all",
          transitionDuration: "1s",
          borderRadius: "10px",
        }}
      />
      {isHovered && centerElement === id ? (
        <div
        className="single-rezept"
          style={{
            position: "absolute",
          }}
          
        >
          <div className="single-rezept-zutaten" >
            {rezept.rezeptZutaten.map((rezZut) => {
              return (
                <SingleZutat
                  key={rezZut.zutat.zutatennr}
                  name={rezZut.zutat.bezeicnung}
                  ernaehrungsform={rezZut.zutat.ernährungsformen}
                  anzahl={rezZut.menge}
                  isClickable={false}
                />
              );
            })}
          </div>
          <button onClick={handleClick}>In Warenkorb</button>
        </div>
      ) : null}
      <div>{rezept.name}</div>
    </div>
  );
};
