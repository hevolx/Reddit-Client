type Props = {
  message: string;
  onRetry?: () => void;
};

export default function ErrorBanner({ message, onRetry }: Props) {
  return (
    <>
      <p>{message}</p>
    </>
  );
}
