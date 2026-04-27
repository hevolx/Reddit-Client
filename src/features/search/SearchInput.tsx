import { useRef } from 'react';

export function SearchInput(_props: { onChange: (value: string) => void, value: string }) {
  const timerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  return (
    <>
      <input placeholder="Search posts..." value={_props.value} onChange={(e) => {
        const val = e.target.value;
        clearTimeout(timerId.current);
        timerId.current = setTimeout(() => _props.onChange(val), 300);
      }}></input>
      {_props.value && <button aria-label="Clear search" data-testid="search-clear-button" onClick={() => _props.onChange('')} />}
    </>
  );
}
