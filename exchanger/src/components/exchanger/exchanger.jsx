import React from "react";
import "./exchanger.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { currencies } from "./currencies";
import { useState } from "react";
import { useEffect } from "react";
import * as APIservice from "../../services/APIservice";

function exchanger() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [conversionRate, setConversionRate] = useState(0);

  const handleFromAmountChange = (event) => {
    setFromAmount(event.target.value);
  }

  const handleToAmountChange = (event) => {
    setToAmount(event.target.value);
  }

  return (
    <div className="exchange-container">
      <Autocomplete
        id="From"
        disableClearable
        options={currencies}
        renderInput={(params) => (
          <TextField
            className="exchange-input"
            {...params}
            label="from"

            color="warning"
          />
        )}
      />

      <Autocomplete
        id="To"
        disableClearable
        options={currencies}
        renderInput={(params) => (
          <TextField
            {...params}
            label="To"

            color="warning"
          />
        )}
        inputprops={{
          className: "exchange-input",
        }}
      />
    </div>
  );
}

export default exchanger;
