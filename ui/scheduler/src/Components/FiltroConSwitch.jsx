import { useState } from "react";
import "../assets/FiltroConSwitch.css";

export default function FiltroConSwitch({ options, onChange }) {
  if (!options) {
    options = [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
      { value: "option3", label: "Option 3" },
      { value: "option4", label: "Option 4" },
      { value: "option5", label: "Option 5" },
    ];
  }

  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [inputValue, setInputValue] = useState("");

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    onChange(value);
    return `Filtrar por ${value}: `;
  };

  const handleAccept = () => {
    onChange(inputValue);
  };

  return (
    <div className="putin-container">
      <div className="input-container">
        <h2 className="pr-1">{} </h2>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escriba su filtro"
        />
        <button className="button-10" onClick={handleAccept}>Filtrar</button>
      </div>
      <div className="filtro-con-switch">
        {options.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              name="select"
              id={`option-${index}`}
              value={option.value}
              checked={selectedOption === option.value}
              onChange={() => handleOptionChange(option.value)}
            />
            <label
              htmlFor={`option-${index}`}
              className={`option option-${index}`}
            >
              <div className="dot"></div>
              <span>{option.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
