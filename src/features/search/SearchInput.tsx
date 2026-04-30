import { useEffect, useRef, useState } from 'react';

/** Debounced text input for searching posts, with a clear button when a value is present. */
export function SearchInput({ onChange, value }: {
  onChange: (value: string) => void,
  value: string
}) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    clearTimeout(timerId.current);
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    return () => clearTimeout(timerId.current);
  }, []);

  return (
    <>
      <input placeholder="Search posts..." value={internalValue} onChange={(e) => {
        const val = e.target.value;
        setInternalValue(val);
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => onChange(val), 300);
      }}></input>
      {internalValue && (
        <button
          type="button"
          aria-label="Clear search"
          data-testid="search-clear-button"
          onClick={() => {
            clearTimeout(timerId.current);
            setInternalValue('');
            onChange('');
          }}
        >Clear</button>
      )}
    </>
  );
}
