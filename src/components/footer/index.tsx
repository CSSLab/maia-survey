import React from "react";

import "./styles.scss";

const Footer = () => (
  <div className="footer">
    <p>
      You can get in touch with us by email at{" "}
      <a
        href="mailto:maiachess@cs.toronto.edu"
        target="_blank"
        rel="noreferrer"
      >
        maiachess@cs.toronto.edu
      </a>{" "}
      or on Twitter{" "}
      <a href="https://twitter.com/maiachess" target="_blank" rel="noreferrer">
        @maiachess
      </a>
      .
    </p>
  </div>
);

export default Footer;
