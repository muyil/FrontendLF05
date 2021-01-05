import React, { useEffect, useState } from "react";
import { SingleZutat } from "./SingleComponents/SingleZutat";

export const Zutaten = ({setWaren, waren}) => {
  useEffect(() => {
    fetch("http://localhost:8080/zutaten")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result from zutaten:", result);
          setZutaten(result);
        },
        (error) => {
          console.log("problem with fetching zutaten");
        }
      );
  }, []);

  const initialZutaten = [];
  const [zutaten, setZutaten] = useState(initialZutaten);

  return (
    <>
        <div
          className="header"
        >
        <h3>Diese Zutaten bieten wir Ihnen an!</h3>
      </div>
      <div className="zutaten-container">
        {zutaten.map((zutat) => {
          var allergen = null;
          if (zutat.allergen != null) {
            allergen = zutat.allergen.name;
          }
          return (
            <SingleZutat
              key={zutat.zutatennr}
              name={zutat.bezeicnung}
              preis={zutat.nettoPreis}
              ernaehrungsform={zutat.ernährungsformen}
              allergen={allergen}
              einheit={zutat.einheit.name}
              setWaren={setWaren}
              zutat={zutat}
              waren={waren}
              isClickable={true}
            />
          );
        })}
      </div>
    </>
  );
};
