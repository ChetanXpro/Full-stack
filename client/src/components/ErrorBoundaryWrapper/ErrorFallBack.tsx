import { useEffect, useState } from "react";
import { FallbackProps } from "react-error-boundary";
import Button from "../Button";

const ErrorFallback = ({
  error,
  resetErrorBoundary,
  className,
}: FallbackProps & { className?: string }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [networkChange, setNetworkChange] = useState<boolean>(false);

  const reloadPage = () => {
    window.location.reload();
  };

  useEffect(() => {
    const onlineHandler = () => {
      setIsOnline(true);
      setNetworkChange(true);
    };
    const offlineHandler = () => {
      setIsOnline(false);
      setNetworkChange(true);
    };

    window.addEventListener("online", onlineHandler);
    window.addEventListener("offline", offlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
      window.removeEventListener("offline", offlineHandler);
    };
  }, [isOnline]);

  useEffect(() => {
    if (networkChange && isOnline) {
      reloadPage();
    }
  }, [isOnline, networkChange]);

  return (
    <div role="alert" className={className || "w-full pr-4 pl-11 mt-20"}>
      <h1 className="mb-5 font-medium text-28 md:text-40 font-microsoft-docs text-gray-microsoft-docs">
        Something Went Wrong
      </h1>
      <div>
        <h3 className="mb-10 font-light text-21 whitespace-pre-wrap">
          {isOnline
            ? networkChange
              ? "Please wait, reloading..."
              : "Sorry, Something went wrong. Please try again."
            : "No internet connection available. \nPlease connect to internet first and then try again."}
        </h3>
        {!networkChange && isOnline && (
          <Button type="button" className="py-2 px-4  " onClick={reloadPage}>
            Try again
          </Button>
        )}
      </div>
      <div className="mt-12 border-t pt-6">
        <h5 className="mb-4 underline text-21">Error Hint:</h5>
        <pre>{error.message}</pre>
      </div>
    </div>
  );
};

export default ErrorFallback;
