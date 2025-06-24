import React, { useState } from 'react';

interface Props {
  city: string;
  setCity: (v: string) => void;
  setPostcode: (v: string) => void;
  name: string | undefined;
}

const CityAutocomplete: React.FC<Props> = ({ city, setCity, setPostcode, name }) => {
  const [suggestions, setSuggestions] = useState<{ label: string, postcode: string, value: string }[]>([]);
  const [show, setShow] = useState(false);

  const fetchSuggestions = async (value: string) => {
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?city=${value}&q=${value}`);
    const data = await res.json();
    const cities: string[] = [];
    const sugg = data.features
      .map((item: any) => {
        if (cities.indexOf(item.properties.postcode) === -1) {
          cities.push(item.properties.postcode);
          return {
            label: item.properties.postcode + ' - ' + item.properties.city,
            postcode: item.properties.postcode,
            value: item.properties.city
          };
        }
        return null;
      })
      .filter(Boolean) as { label: string, postcode: string, value: string }[];
    setSuggestions(sugg);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        name={name}
        placeholder="Ville"
        value={city}
        onChange={e => {
          setCity(e.target.value);
          fetchSuggestions(e.target.value);
          setShow(true);
        }}
        onBlur={() => setTimeout(() => setShow(false), 100)}
        onFocus={() => city && setShow(true)}
      />
      {show && suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', position: 'absolute', background: '#fff', zIndex: 10, margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => {
                setCity(s.value);
                setPostcode(s.postcode);
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

export default CityAutocomplete; 