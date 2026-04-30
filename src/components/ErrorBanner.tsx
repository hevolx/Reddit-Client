type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <>
      <p role="alert">{message}</p>
    </>
  );
}
