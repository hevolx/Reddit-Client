export function FilterChips(_props: {
  categories: { id: string; label: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {_props.categories.map((category) => (
        <button
          key={category.id}
          aria-pressed={_props.activeId === category.id ? true : false}
          onClick={() => _props.onSelect(category.id)}>{category.label}</button>
      ))}
    </>
  );
}
