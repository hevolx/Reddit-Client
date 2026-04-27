import { useRef } from 'react';

export function SearchInput(_props: { onChange: (value: string) => void, value: string }) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return (
    <>
      <input placeholder="Search posts..." onChange={(e) => {
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => _props.onChange(e.target.value), 300);
      }}></input>
      {_props.value && <button data-testid="search-clear-button" onClick={() => _props.onChange('')} />}
    </>
  );
}
