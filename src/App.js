import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Rezepte } from "./Componenten/Rezepte";
import { Zutaten } from "./Componenten/Zutaten";
import { Bestellung } from "./Componenten/Bestellung";
import { Warenkorb } from "./Componenten/Warenkorb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faShoppingBasket, faShoppingCart} from "@fortawesome/free-solid-svg-icons";

function App() {
  const [showRezept, setShowRezept] = useState(false);
  const [showZutat, setShowZutat] = useState(true);
  const [showBestellung, setShowBestellung] = useState(false);
  const [showWaren, setShowWaren] = useState(false);

  const[waren, setWaren] = useState([]);
  
  const renderMain = () => {
    if (showRezept) {
      return <Rezepte setWaren={setWaren} waren={waren}/>;
    } else if (showZutat) {
      return <Zutaten setWaren={setWaren} waren={waren}/>;
    } else if (showBestellung) {
      return <Bestellung setWaren={setWaren} waren={waren}/>;
    } else {
      return <Warenkorb setWaren={setWaren} waren={waren}/>;
    }
  };

  const handleClick = (event) => {
    var eventName = event.target.name;
    if (eventName === "rezept") {
      setShowRezept(true);
      setShowZutat(false);
      setShowBestellung(false);
      setShowWaren(false);
    } else if (eventName === "zutat") {
      setShowRezept(false);
      setShowZutat(true);
      setShowBestellung(false);
      setShowWaren(false);
    } else if (eventName === "bestellung") {
      setShowRezept(false);
      setShowZutat(false);
      setShowBestellung(true);
      setShowWaren(false);
    } else {
      setShowRezept(false);
      setShowZutat(false);
      setShowBestellung(false);
      setShowWaren(true);
    }
  };

  return (
    <div>
      <header className="App-header">
        <img
          src={require("./Images/krautUndRueben.png")}
          alt="logo"
          style={{
            width: "200px",
            height: "150px",
            display: "flex",
            justifyContent: "start",
          }}
        ></img>
        Gesund und Lecker!
        <div className="nav-buttons">
          <button
            name="rezept"
            onClick={(e) => handleClick(e)}
            style={{
              background: showRezept ? "lightgrey" : "grey",
              width: "250px",
            }}
          >
            Rezept
          </button>
          <button
            name="zutat"
            onClick={(e) => handleClick(e)}
            style={{
              background: showZutat ? "lightgrey" : "grey",
              width: "250px",
            }}
          >
            Zutaten
          </button>
          <button
            name="bestellung"
            onClick={(e) => handleClick(e)}
            style={{
              background: showBestellung ? "lightgrey" : "grey",
              width: "250px",
            }}
          >
            Bestellung
          </button>
          <button
            name="waren"
            onClick={(e) => handleClick(e)}
            style={{
              background: showWaren ? "lightgrey" : "grey",
         
            }}
          >
            {<FontAwesomeIcon icon={faShoppingCart}/>} ({waren.length})
          </button>
        </div>
      </header>

      {renderMain()}
    </div>
  );
}

export default App;
