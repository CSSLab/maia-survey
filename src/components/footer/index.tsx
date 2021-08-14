import React from "react";

import Markdown from "../markdown";

import "./styles.scss";

interface Props {
  children: string;
}

const Footer: React.FC<Props> = ({ children }: Props) => (
  <div className="footer">
    <Markdown>{children}</Markdown>
  </div>
);

export default Footer;
