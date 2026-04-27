export function SearchInput(_props: { onChange: (value: string) => void }) {
  return <input placeholder="Search posts..." onChange={(e) => _props.onChange(e.target.value)}></input>;
}
