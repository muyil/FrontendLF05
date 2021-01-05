import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSeedling,
  faCarrot,
  faDrumstickBite,
  faFish,
} from "@fortawesome/free-solid-svg-icons";

export const SingleZutat = ({
  name,
  preis,
  ernaehrungsform,
  allergen,
  einheit,
  setWaren,
  zutat,
  waren,
  anzahl,
  isClickable,
}) => {
  const findIcon = (form) => {
    if (form === "Vegan")
      return <FontAwesomeIcon icon={faSeedling} style={{ color: "green" }} />;
    else if (form === "Vegetarisch")
      return <FontAwesomeIcon icon={faCarrot} style={{ color: "orange" }} />;
    else if (form === "Tierisch(Fleisch)")
      return (
        <FontAwesomeIcon icon={faDrumstickBite} style={{ color: "brown" }} />
      );
    else return <FontAwesomeIcon icon={faFish} style={{ color: "blue" }} />;
  };

  const handleClick = () => {
    if (isClickable) setWaren((waren) => [...waren, zutat]);
  };

  const icon = ernaehrungsform.map((form) => {
    return findIcon(form.name);
  });

  return (
    <div className="single-zutat" onClick={handleClick}>
      <div>
      {anzahl ? anzahl + ' x '  : ''} 
        {name + ' '}
        {icon}
      </div>
      {allergen ? <div>Allergen: {allergen}</div> : <></>}
      {preis ? (
        <div>
          {preis},-/{einheit}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
