import React from 'react';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  onSubmit?: (searchQuery: string) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, onSubmit, onInput, className }) => {
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);

  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (onSubmit) {
      onSubmit(searchQuery);
    }
  };

  const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
    if (onInput) {
      onInput(event);
    }
  }

  return (
    <form className="form-inline" onSubmit={handleSubmit} method="POST">
      <input
        type="text"
        name="query"
        className={`${className} input input-bordered rounded border-primary/30 focus:border-accent focus:outline-none placeholder-gray-400`}
        placeholder="Rechercher..."
        value={searchQuery}
        data-toggle="tooltip"
        data-placement="bottom"
        title="Rechercher avec le nom."
        onChange={handleSearchChange}
        onInput={handleOnInput}
      />
    </form>
  );
};

export default SearchBar;