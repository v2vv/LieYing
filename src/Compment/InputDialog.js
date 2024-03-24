import React, { useState } from "react";

function InputDialog({ dataName }) {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    localStorage.setItem(dataName, inputValue);
    setInputValue("");
  };

  return (
    <div>
      <label>Enter {dataName} :</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default InputDialog;
