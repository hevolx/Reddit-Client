/** Renders a row of toggle buttons for selecting a subreddit category filter. */
export function FilterChips({ categories, activeId, onSelect }: {
  categories: { id: string; label: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          aria-pressed={activeId === category.id}
          onClick={() => onSelect(category.id)}>{category.label}</button>
      ))}
    </>
  );
}
