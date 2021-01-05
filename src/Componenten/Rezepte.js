import React, { useEffect, useState } from "react";
import Left from "../Images/chevron-left-solid.svg";
import { Right } from "../Images/chevron-right-solid.svg";
import { SingleRezept } from "./SingleComponents/SingleRezept";

export const Rezepte = ({ setWaren, waren }) => {
  useEffect(() => {
    fetchRezepte();
  }, []);

  const initialRezept = [];
  const [rezepte, setRezepte] = useState(initialRezept);
  const [centerElement, setCenterElement] = useState(0);

  const [showAlle, setAlle] = useState(true);
  const [showVegan, setVegan] = useState(false);
  const [showVegetarisch, setVegetarisch] = useState(false);
  const [showTierisch, setTierisch] = useState(false);
  const [showPesce, setPesce] = useState(false);

  const handleLeftClick = () => {
    if (centerElement > 0) setCenterElement(centerElement - 1);
  };

  const handleRightClick = () => {
    if (centerElement < rezepte.length - 1) setCenterElement(centerElement + 1);
  };

  const fetchFilteredRezepte = (name) => {
    fetch("http://localhost:8080/rezepte/filter/" + name)
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result from Rezept fetch: " + name, result);
          setRezepte(result);
        },
        (error) => {
          console.log("Fetching Error!");
        }
      );
  };

  const fetchRezepte = () => {
    fetch("http://localhost:8080/rezepte")
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result from Rezept fetch", result);
          setRezepte(result);
        },
        (error) => {
          console.log("Fetching Error!");
        }
      );
  };

  const handleClick = (event) => {
    var eventName = event.target.name;
    if (eventName === "alle") {
      setAlle(true);
      setVegan(false);
      setVegetarisch(false);
      setTierisch(false);
      setPesce(false);

      setCenterElement(0);
      fetchRezepte();

    } else if (eventName === "vegan") {
      setAlle(false);
      setVegan(true);
      setVegetarisch(false);
      setTierisch(false);
      setPesce(false);

      setCenterElement(0);
      fetchFilteredRezepte("Vegan");

    } else if (eventName === "vegetarisch") {
      setAlle(false);
      setVegan(false);
      setVegetarisch(true);
      setTierisch(false);
      setPesce(false);

      setCenterElement(0);
      fetchFilteredRezepte("Vegetarisch");

    } else if (eventName === "tier") {
      setAlle(false);
      setVegan(false);
      setVegetarisch(false);
      setTierisch(true);
      setPesce(false);

      setCenterElement(0);
      fetchFilteredRezepte("Tierisch(Fleisch)");

    } else {
      setAlle(false);
      setVegan(false);
      setVegetarisch(false);
      setTierisch(false);
      setPesce(true);

      setCenterElement(0);
      fetchFilteredRezepte("Pescetarismus");
    }
  };

  return (
    <>
      <div className="header">
        <p>Diese Rezepte haben wir bereits für Sie vorbereitet!</p>
      </div>
      <div className="nav-buttons">
        <button
          name="alle"
          className={showAlle ? "" : "button-notPicked"}
          onClick={(e) => handleClick(e)}
        >
          Alle
        </button>
        <button
          name="vegan"
          className={showVegan ? "" : "button-notPicked"}
          onClick={(e) => handleClick(e)}
        >
          Vegan
        </button>
        <button
          name="vegetarisch"
          className={showVegetarisch ? "" : "button-notPicked"}
          onClick={(e) => handleClick(e)}
        >
          Vegetarisch
        </button>
        <button
          name="tier"
          className={showTierisch ? "" : "button-notPicked"}
          onClick={(e) => handleClick(e)}
        >
          Tierisch
        </button>
        <button
          name="pesce"
          className={showPesce ? "" : "button-notPicked"}
          onClick={(e) => handleClick(e)}
        >
          Pescetarisch
        </button>
      </div>
      <div style={{ justifyContent: "center", display: "flex" }}>
        <img
          src={require("../Images/chevron-left-solid.svg")}
          style={{ width: 30 }}
          onClick={handleLeftClick}
          alt="left"
        />

        <div style={{ width: "1020px", overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              marginLeft: `${(centerElement - 1) * -320}px`,
              transition: "all",
              transitionDuration: "1s",
            }}
          >
            {rezepte.map((rezept, idx) => (
              <SingleRezept
                id={idx}
                key={idx}
                rezept={rezept}
                centerElement={centerElement}
                setWaren={setWaren}
                waren={waren}
              />
            ))}
          </div>
        </div>
        <img
          src={require("../Images/chevron-right-solid.svg")}
          style={{ width: 30 }}
          onClick={handleRightClick}
          alt="right"
        />
      </div>
    </>
  );
};
