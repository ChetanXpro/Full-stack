type ErrorMessageProps = {
  message?: any;
};

const ErrorMessage = ({ message = "" }: ErrorMessageProps) => {
  return <p className="text-xs mt-1  text-[#c52828]">{message}</p>;
};
export default ErrorMessage;
