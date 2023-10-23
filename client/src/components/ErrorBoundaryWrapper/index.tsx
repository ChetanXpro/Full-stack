import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "./ErrorFallBack";
import Loader from "../Loader/Loader";
import { Outlet } from "react-router-dom";

const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => {
  const errorHandler = (error: Error, info: { componentStack: string }) => {
    // Do something with the error
    // E.g. log to an error logging client here

    // eslint-disable-next-line no-console
    console.error(error, info.componentStack);
  };
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={errorHandler}>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
};

export default ErrorBoundaryWrapper;
