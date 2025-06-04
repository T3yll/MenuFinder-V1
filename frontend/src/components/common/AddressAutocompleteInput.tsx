import React, { useState, useEffect } from "react";

type Props = {
  value: string;
  id?: string;
  type?: "Pays" | "Ville" | "CodePostal" | "Adresse";
  onChange: (value: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
};

const AddressAutocompleteInput: React.FC<Props> = ({ value,id,type, onChange, placeholder, name,required }) => {
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!value || value.length < 3) {
        setSuggestions([]);
        return;
      }
      let url;
      switch (type){
        case "Pays":
          url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&type=pays&limit=5`;
          break;
        case "Ville":
          url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&type=locality&limit=5`;
          break;
        case "CodePostal":
          url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&type=postcode&limit=5`;
          break;
        case "Adresse":
        default:
          url = `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(value)}&limit=5`;
      }
      const response = await fetch(`${url}`);
      const data = await response.json();
      console.log("Suggestions fetched:", data.features); // Debugging line
      setSuggestions(data.features || []);
    };

    const timeout = setTimeout(fetchSuggestions, 300); // debounce
    return () => clearTimeout(timeout);
  }, [value]);

  const onChangeIntern = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    setSuggestions([]); // Clear suggestions when input changes
  };

  const handleSelect = (suggestion: any) => {
    onChange(suggestion.properties.label);
    setSuggestions([]);
  };

  return (
    <div style={{ position: "relative" }}>
      <input
        type="Text"
        list="suggestions"
        required={required}
        id={id}
        value={value}
        name={name}
        onChange={(e) => onChangeIntern(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 100)} // délai pour cliquer une suggestion
        placeholder={placeholder || "Adresse"}
        style={{ width: "100%", padding: "8px" }}
      />
      {isFocused && suggestions.length > 0 && (
        <datalist id="suggestions" className="AutoSuggestAdress" style={{
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
            <option
              key={idx}
              onClick={() => handleSelect(s)}
              style={{ padding: "8px", cursor: "pointer" }}
              onMouseDown={(e) => e.preventDefault()} // évite perte de focus
            >
              {s.properties.label}
            </option>
          ))}
        </datalist>
      )}
    </div>
  );
};

export default AddressAutocompleteInput;
