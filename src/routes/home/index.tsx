import React from "react";

import { Markdown } from "../../components";

import content from "../../content/home";

import "./styles.scss";

const Home = () => {
  return (
    <div className="container">
      <div className="home-content">
        <Markdown>{content}</Markdown>
      </div>
    </div>
  );
};

export default Home;
