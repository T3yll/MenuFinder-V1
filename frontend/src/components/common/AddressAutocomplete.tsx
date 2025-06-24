import React, { useState } from 'react';

interface Props {
  postcode: string;
  address: string;
  name: string | undefined;
  setAddress: (v: string) => void;
}

const AddressAutocomplete: React.FC<Props> = ({ postcode, address, setAddress ,name}) => {
  const [suggestions, setSuggestions] = useState<{ label: string, value: string }[]>([]);
  const [show, setShow] = useState(false);

  const fetchSuggestions = async (value: string) => {
    if (!postcode) return;
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?postcode=${postcode}&q=${value}`);
    const data = await res.json();
    const sugg = data.features.map((item: any) => ({
      label: item.properties.name,
      value: item.properties.name
    }));
    setSuggestions(sugg);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        name={name}
        placeholder="Adresse"
        value={address}
        onChange={e => {
          setAddress(e.target.value);
          fetchSuggestions(e.target.value);
          setShow(true);
        }}
        onBlur={() => setTimeout(() => setShow(false), 100)}
        onFocus={() => address && setShow(true)}
      />
      {show && suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', position: 'absolute', background: '#fff', zIndex: 10, margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => {
                setAddress(s.value);
                setShow(false);
              }}
              style={{ cursor: 'pointer', padding: '2px 8px' }}
            >
              {s.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete; 