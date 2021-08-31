import React from "react";

import "./styles.scss";

interface Props {
  children: React.ReactNode;
}

export const ModalContainer = ({ children }: Props) => {
  return (
    <div className="modal">
      <div className="content">{children}</div>
    </div>
  );
};

export default ModalContainer;
