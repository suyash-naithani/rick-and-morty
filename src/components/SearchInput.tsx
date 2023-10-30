/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

interface SearchInputProps {
  searchTerm: string;
  handleSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
  handleClearSearch: () => void;
}

const buttonStyle = css`
  margin: 0 10px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: #ddd;
  }
`;

const searchInputStyle = css`
  padding: 10px 15px; // Padding on top, bottom, left, and right
  margin: 20px 0; // Margin on top and bottom
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 70%; // Adjust this value based on how wide you want the input to be
  &:focus {
    outline: none;
    border-color: #aaa;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2); // Optional: Adds a shadow when input is in focus
  }
`;

const SearchInput: React.FC<SearchInputProps> = ({
  searchTerm,
  handleClearSearch,
  handleSearch,
  handleSearchInputChange,
}) => {
  return (
    <div>
      <input
        css={searchInputStyle}
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        placeholder="Search by character name..."
      />
      <button css={buttonStyle} onClick={handleSearch}>
        Search
      </button>
      <button css={buttonStyle} onClick={handleClearSearch}>
        Clear Search
      </button>
    </div>
  );
};

export default SearchInput;
