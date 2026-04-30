export default function ErrorBoundary() {
  return (
    <div data-testid="error-fallback">
      <p data-testid="child">hello</p>
    </div>
  );
}