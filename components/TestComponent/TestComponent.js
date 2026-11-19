import { useEffect, useState } from "react";
const TestComponent = () => {
  return (
    <div>
      <form aria-label="form">
        <button>Submit</button>
        <button>Cancel</button>
      </form>
      <a href="www.ok.com">Link</a>
      <button aria-label="sign in">
        <svg />
      </button>
      <button aria-label="sign out">
        <svg />
      </button>
      <footer>Contentinfo</footer>
      <h1>Heading</h1>
      <header>Banner</header>
      <img alt="description" />
      <input type="checkbox" />
      <input type="number" />
      <input type="radio" />
      <input type="text" />
      <li>List item1</li>
      <li>List item2</li>
      <li>List item3</li>
      <li>List item4</li>
      <ul>List group</ul>
    </div>
  );
};
export default TestComponent;
