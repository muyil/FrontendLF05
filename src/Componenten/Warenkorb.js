import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";

export const Warenkorb = ({ setWaren, waren }) => {

  const counter = (elem) => {
    var elemCount = 0;
    waren.forEach((ware) => {
      if (ware.zutatennr === elem.zutatennr) elemCount += 1;
    });
    
    return elemCount;
  };

  const calculateCost = () => {
    var preis = 0;
    waren.map((ware) => (preis += ware.nettoPreis));

    return preis;
  };

  const minimalList = () => {
    let result = new Set();
    let tempSet = new Set();

    waren.forEach((ware) => {
      if (!tempSet.has(ware.bezeicnung)) {
        tempSet.add(ware.bezeicnung);
        result.add(ware);
      }
    });

    return Array.from(result);
  };

  const removeItemOnce = (arr, value) => {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }

    return arr;
  };

  const format = (num, decimals) =>
    num.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleClick = (ware) => {
    setWaren(removeItemOnce([...waren], ware));
  };

  const handleSubmit = () => {
    fetch("http://localhost:8080/bestellung", {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        zutaten:waren
      })
    })
      .then((res) => res.json())
      .then(
        (response) => {
          console.log("response from Bestellung post", response);
          setWaren([]);
        },
        (error) => {
          console.log("Bestellung posting error!");
        }
      );
  }

  return waren.length ? (
    <>
      <div className="header">
        <h3>Warenkorb</h3>
      </div>
      <div className="warenkorb-container">
        <div>
          <h5>Dein Korb:</h5>
          {minimalList().map((ware) => {
            return (
              <>
                <div>
                  <div className="warenkorb-elements">
                    {counter(ware)} x {ware.bezeicnung}: {ware.nettoPreis},-
                    <button onClick={() => handleClick(ware)}>
                      <FontAwesomeIcon
                        style={{ marginTop: "3px" }}
                        icon={faTimes}
                      />
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
      <div>
        <h4>
          Gesamtpreis: {format(calculateCost())}€ <button className="button" onClick={handleSubmit}>Bestellen!</button>
        </h4>
      </div>
    </>
  ) : (
    <div className="header">Warenkorb ist leer <FontAwesomeIcon icon={faStarHalfAlt}/></div>
  );
};
