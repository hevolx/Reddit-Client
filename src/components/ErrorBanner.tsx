type ErrorProps = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorBanner({ message, onRetry }: ErrorProps) {
  return (
    <>
      <p role="alert">{message}</p>
      {onRetry && <button onClick={() => onRetry()}>Try again</button>}
    </>
  );
}
