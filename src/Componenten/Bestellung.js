import React, { useState, useEffect } from "react";
import {SingleBestellung} from "./SingleComponents/SingleBestellung"

export const Bestellung = ({setWaren, waren}) => {
  useEffect(() => {
    fetch("http://localhost:8080/bestellung")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result from Bestellung fetch", result);
          setBestellung(result);
        },
        (error) => {
          console.log("Fetching Error!");
        }
      );
  }, []);

  const [bestellungen, setBestellung] = useState([]);

  return (
    <>
      <div
          className="header"
        >
          <h3>Deine Bestellungen</h3>
      </div>
      <div className="bestellung-container">
        {bestellungen.map((bestellung) => {
          let open = bestellung.id % 2 === 0;
          return (
            <SingleBestellung
              key={bestellung.id}
              nummer={bestellung.id}
              date={bestellung.date}
              betrag={bestellung.rechnungsbetrag}
              zutaten={bestellung.bestellungsZutaten}
              isOpen={open}
            />
          );
        })}
      </div>
    </>
  );
};
