import { PageNotFoundStyles } from "./styles/PageNotFoundStyles";
const NotFound = ({ message }) => {
  return (
    <PageNotFoundStyles
      style={{ height: "auto", background: "white" }}
      className="not-found"
    >
      <div>
        <h3>{message}</h3>
        <img
          width="100%"
          height="auto"
          src="/img/pageNotFound.webp"
          alt="not-found"
        />
      </div>
    </PageNotFoundStyles>
  );
};
export default NotFound;
