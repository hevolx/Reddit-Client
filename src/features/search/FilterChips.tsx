export function FilterChips(_props: {
  categories: { id: string; label: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {_props.categories.map((category) => (
        <button key={category.id}>{category.label}</button>
      ))}
    </>
  );
}
