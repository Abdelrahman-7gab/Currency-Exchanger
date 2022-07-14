import React from "react";
import "./exchanger.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { currencies } from "./currencies";
import { useState } from "react";
import { useEffect } from "react";
import apiService from "../../services/APIservice";
import SwitchAccessShortcutIcon from "@mui/icons-material/SwitchAccessShortcut";

function exchanger() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState(1);
  const [conversionRate, setConversionRate] = useState(0);

  useEffect(() => {
    const getConversionRate = async () => {
      if (fromCurrency !== "" && toCurrency != "") {
        const conversionRate = await apiService.getConversionRate(
          fromCurrency.substring(0, 3),
          toCurrency.substring(0, 3)
        );
        setConversionRate(conversionRate.data.info.rate);
      }
    };
    getConversionRate();
  }, [fromCurrency, toCurrency]);

  const changeAmount = (event) => {
    setFromAmount(event.target.value);
  };

  const switchFromAndTo = () => {
    const temp = fromCurrency;
    const tempTo = toCurrency;
    setFromCurrency("");
    setToCurrency(temp);
    setFromCurrency(tempTo);
  };

  return (
    <div className="exchange-container">
      <div className="inputs-container">
        <div className="from-container">
          <TextField
            className="exchange-input"
            label="amount"
            color="warning"
            value={fromAmount}
            type="number"
            InputProps={{
              inputProps: { min: 0 },
            }}
            onChange={(e) => setFromAmount(e.target.value)}
          />

          <Autocomplete
            id="From"
            disableClearable
            options={currencies}
            onChange={(event, value) => setFromCurrency(value)}
            value={fromCurrency}
            renderInput={(params) => (
              <TextField
                className="exchange-input"
                {...params}
                label="from"
                color="warning"
              />
            )}
          />
        </div>
        <div
          className="switch"
          onClick={switchFromAndTo}
          style={{ margin: "0 auto", cursor: "pointer" }}
        >
          <SwitchAccessShortcutIcon style={{ color: "black" }} />
        </div>
        <Autocomplete
          id="To"
          disableClearable
          options={currencies}
          onChange={(event, value) => setToCurrency(value)}
          value={toCurrency}
          renderInput={(params) => (
            <TextField {...params} label="To" color="warning" />
          )}
          inputprops={{
            className: "exchange-input",
          }}
        />
      </div>

      {fromAmount != "" &&
        fromAmount > 0 &&
        fromCurrency != "" &&
        toCurrency != "" && (
          <div className="status">
            {fromAmount} {fromCurrency.substring(5, fromCurrency.length - 1)} ={" "}
            <span className="conversionRate">
              {" "}
              {conversionRate * fromAmount}{" "}
            </span>{" "}
            {toCurrency.substring(5, toCurrency.length - 1)}
          </div>
        )}
    </div>
  );
}

export default exchanger;
