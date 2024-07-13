import { useState, ChangeEvent, FC, useEffect } from 'react';
import styles from './SearchBar.module.scss'
interface SearchBarProps {
  placeholder?: string;
  onQueryChange: (query: string) => void;
  value: string
}

const SearchBar: FC<SearchBarProps> = ({ placeholder, onQueryChange, value }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onQueryChange(newQuery);
  };


  useEffect(() => {
      setQuery(value)
  }, [value]);




  return (
    <div className={styles.input}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
        style={{ padding: '8px', fontSize: '16px' }}
      />
    </div>
  );
};

export default SearchBar;
