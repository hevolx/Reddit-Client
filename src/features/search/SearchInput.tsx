import { useEffect, useRef } from 'react';

export function SearchInput(_props: { onChange: (value: string) => void, value: string }) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    return () => clearTimeout(timerId.current);
  }, []);
  return (
    <>
      <input placeholder="Search posts..." value={_props.value} onChange={(e) => {
        const val = e.target.value;
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => _props.onChange(val), 300);
      }}></input>
      {_props.value && (
        <button
          type="button"
          aria-label="Clear search"
          data-testid="search-clear-button"
          onClick={() => {
            clearTimeout(timerId.current);
            _props.onChange('');
          }}
        />
      )}
    </>
  );
}
