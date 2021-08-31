import React, { useCallback, useState } from "react";
import { LichessSmall } from "../../content/icons";
import { instructions } from "../../content/turing";
import { UseAuthControllerHook, UseModalControllerHook } from "../../hooks";
import Markdown from "../markdown";
import Modal from "../modalContainer";

interface Props {
  authController: ReturnType<UseAuthControllerHook>;
  modalController: ReturnType<UseModalControllerHook>;
}

export const TuringInstructions: React.FC<Props> = ({
  authController,
  modalController,
}: Props) => {
  const [userName, [login, authenticateWithLichess]] = authController;
  const [[, setShowModal], [showModalPersistent, setShowModalPersistent]] =
    modalController;

  const [checked, setChecked] = useState<boolean>(!showModalPersistent);

  const handleContinue = useCallback(async () => {
    if (!userName) await login();
    setShowModalPersistent(!checked);
    setShowModal(false);
  }, [checked, login, setShowModal, setShowModalPersistent, userName]);

  const handleAuthenticate = useCallback(async () => {
    await authenticateWithLichess();
    setShowModalPersistent(!checked);
    setShowModal(false);
  }, [authenticateWithLichess, checked, setShowModal, setShowModalPersistent]);

  return (
    <Modal>
      <Markdown>{instructions}</Markdown>
      <div className="button-container">
        <div style={{ marginRight: "auto" }}>
          <input
            type="checkbox"
            checked={checked}
            onChange={(event) => {
              setChecked(event.currentTarget.checked);
            }}
          />
          Don&apos;t show this again
        </div>
        <button onClick={handleContinue}>
          {userName ? "CONTINUE AS GUEST" : "LOGIN AS GUEST"}
        </button>
        <button className="highlighted" onClick={handleAuthenticate}>
          {userName ? "AUTHENTICATE WITH LICHESS" : "LOGIN WITH LICHESS"}
          <LichessSmall />
        </button>
      </div>
    </Modal>
  );
};

export default TuringInstructions;
