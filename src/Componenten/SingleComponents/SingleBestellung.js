import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faCheck } from "@fortawesome/free-solid-svg-icons";

export const SingleBestellung = ({ date, betrag, zutaten, nummer, isOpen }) => {
  return (
    <>
      <div className="single-bestellung">
        <div>
          Bestellnr: {nummer} 
        </div>
        <div>
        Datum: {date}
        </div>
        {isOpen ? <div>Status: shipping <FontAwesomeIcon icon={faTruck} style={{color:"darkorange"}}/></div>: <div>Status: delivered <FontAwesomeIcon icon={faCheck}  style={{color:"darkgreen"}}/></div>}
        <div>Betrag: {betrag}€</div>

      </div>
    </>
  );
};
