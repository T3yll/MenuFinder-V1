import React, { useState } from 'react';

interface Props {
  postcode: string;
  setPostcode: (v: string) => void;
  setCity: (v: string) => void;
  name: string | undefined;
}

const PostcodeAutocomplete: React.FC<Props> = ({ postcode, setPostcode, setCity, name }) => {
  const [suggestions, setSuggestions] = useState<{ label: string, city: string, value: string }[]>([]);
  const [show, setShow] = useState(false);

  const fetchSuggestions = async (value: string) => {
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?postcode=${value}&q=${value}`);
    const data = await res.json();
    const postcodes: string[] = [];
    const cities: string[] = [];
    const sugg = data.features
      .map((item: any) => {
        if (cities.indexOf(item.properties.city) === -1) {
          postcodes.push(item.properties.postcode);
          cities.push(item.properties.city);
          return {
            label: item.properties.postcode + ' - ' + item.properties.city,
            city: item.properties.city,
            value: item.properties.postcode
          };
        }
        return null;
      })
      .filter(Boolean) as { label: string, city: string, value: string }[];
    setSuggestions(sugg);
  };

  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Code postal"
        value={postcode}
        onChange={e => {
          setPostcode(e.target.value);
          fetchSuggestions(e.target.value);
          setShow(true);
        }}
        onBlur={() => setTimeout(() => setShow(false), 100)}
        onFocus={() => postcode && setShow(true)}
      />
      {show && suggestions.length > 0 && (
        <ul style={{ border: '1px solid #ccc', position: 'absolute', background: '#fff', zIndex: 10, margin: 0, padding: 0, listStyle: 'none', width: '100%' }}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              onMouseDown={() => {
                setPostcode(s.value);
                setCity(s.city);
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

export default PostcodeAutocomplete; 