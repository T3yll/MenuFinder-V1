import React, { useState, useEffect } from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  name?: string;
};

const AddressAutocompleteInput: React.FC<Props> = ({ value, onChange, placeholder, name }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 3) {
        setSuggestions([]);
        return;
      }

      const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`);
      const data = await response.json();
      setSuggestions(data.features || []);
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [value]);

  const handleSelect = (suggestion: any) => {
    onChange(suggestion.properties.label);
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // délai pour cliquer une suggestion
        placeholder={placeholder || "Adresse"}
        style={{ width: "100%", padding: "8px" }}
      />
      {isFocused && suggestions.length > 0 && (
        <ul className="AutoSuggestAdress" style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          backgroundColor: "white",
          border: "1px solid #ccc",
          listStyle: "none",
          margin: 0,
          padding: 0,
          zIndex: 10,
          maxHeight: "200px",
          overflowY: "auto"
        }}>
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(s)}
              style={{ padding: "8px", cursor: "pointer" }}
              onMouseDown={(e) => e.preventDefault()} // évite perte de focus
            >
              {s.properties.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocompleteInput;
