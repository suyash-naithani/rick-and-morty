/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import Modal from "react-modal";
import { Character } from "../redux/slices/characterSlice";
import { css } from "@emotion/react";

interface CharacterDetailProps {
  character: Character;
  onClose: () => void;
}

const modalStyles = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background: #fff;
  border-radius: 5px;
  outline: none;
`;

const imageStyles = css`
  max-width: 250px;
  height: auto;
  margin-left: 20px;
`;

const CharacterDetail: React.FC<CharacterDetailProps> = ({
  character,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <>
      <Modal
        isOpen={true}
        onRequestClose={() => setIsOpen(false)}
        style={{
          content: {
            padding: 0,
            border: "none",
            background: "none",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
      >
        <div css={modalStyles}>
          <div>
            <h2>{character.name}</h2>
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>
            <p>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p>
              <strong>Location:</strong> {character.location.name}
            </p>
            <p>
              <strong>Origin:</strong> {character.origin.name}
            </p>
            <button onClick={onClose}>Close</button>
          </div>
          <img css={imageStyles} src={character.image} alt={character.name} />{" "}
        </div>
      </Modal>
    </>
  );
};

export default CharacterDetail;
