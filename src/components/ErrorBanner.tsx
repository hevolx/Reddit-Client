type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

/** Displays an error message with an optional retry button. */
export default function ErrorBanner({ message, onRetry }: ErrorProps) {
  return (
    <>
      <p role="alert">{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry}>
          Try again
        </button>
      )}
    </>
  );
}
