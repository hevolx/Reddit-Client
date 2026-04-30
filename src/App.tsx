import { FilterChips } from './features/search/FilterChips'
/** Root application component. Renders the top-level layout. */
function App() {
  return (
    <>
      <header role="banner">
        <h1>Reddit Client</h1>
        <input type="search" aria-label="Search posts" />
      </header>
      <div data-testid="filter-chips">
        <FilterChips
          categories={[]}
          activeId={null}
          onSelect={() => { }} />
      </div>
    </>
  );
}

export default App;
