import React, { useState } from "react";

function InputDialog() {
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    localStorage.setItem("jsAPIkey", inputValue);
    setInputValue("");
  };

  return (
    <div>
      <label>Enter data:</label>
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
