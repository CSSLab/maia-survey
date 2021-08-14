/* eslint-disable jsx-a11y/heading-has-content */
import React, { AnchorHTMLAttributes, ClassAttributes } from "react";

import ReactMarkdown from "react-markdown";

interface Props {
  children: string;
}

const Markdown: React.FC<Props> = ({ children: markdown }: Props) => (
  <ReactMarkdown
    components={{
      h1: ({ children }) => (
        <h1 id={children.toString().toLowerCase()}>{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 id={children.toString().toLowerCase()}>{children}</h2>
      ),
      a: ({
        children,
        href,
      }: ClassAttributes<HTMLAnchorElement> &
        AnchorHTMLAttributes<HTMLAnchorElement>) => (
        <a
          href={href}
          target={href?.startsWith("/") ? "_self" : "_blank"}
          rel="noreferrer"
        >
          {children}
        </a>
      ),
    }}
  >
    {markdown}
  </ReactMarkdown>
);

export default Markdown;
