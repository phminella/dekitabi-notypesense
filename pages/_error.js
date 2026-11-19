import ServerError from "../components/UI/ServerError";
const Error = ({ err }) => {
  return <ServerError err={err} />;
};

// `_error.js` only gets `err` in development or some SSR errors
Error.getInitialProps = ({ err, res, req }) => {
  return { err };
};
export default Error;
